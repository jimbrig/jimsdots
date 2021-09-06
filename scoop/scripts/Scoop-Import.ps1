using namespace System
using namespace System.Collections.Generic

param(
    [string] $file,
    [parameter(ValueFromPipeline=$true)][string] $plainText,
    [switch] $global
)

. $PSScriptRoot\Lib.ps1

$Script:HighPriorityApps = [HashSet[string]]::new([string[]] @(
    'git'
    '7zip'
    'sudo'
    'innounp'
    'dark'
    'lessmsi'
), [System.StringComparer]::OrdinalIgnoreCase)

function ImportBuckets {
    param (
        [hashtable] $bucketsToImport # map url to name
    )

    $existsBuckets = Get-Buckets
    $bucketsMapUrl2Name = @{}
    $existsBuckets.Values | ForEach-Object {
        $bucketsMapUrl2Name[$_.RemoteUrl] = $_.BucketName
    }

    $bucketsToImport.Keys | ForEach-Object {
        $url = $_
        $name = $bucketsToImport[$_]

        if (!$bucketsMapUrl2Name.ContainsKey($url)) {
            if ($existsBuckets.ContainsKey($name)) {
                throw [System.NotImplementedException]::new("bucket name conflict: $name")
            }
            scoop bucket add $name $url
            $bucketsMapUrl2Name[$url] = $name
        }
    }

    return $bucketsMapUrl2Name
}

function ScoopInstall {
    Write-Verbose "Installing $args"
    scoop install @args
    Write-Host ""
}

function ScoopImportV1([hashtable] $data) {
    $bucketsToImport = @{}
    $data.Buckets.Values | ForEach-Object {
        $bucketsToImport[$_.RemoteUrl] = $_.BucketName
    }

    $bucketsMapUrl2Name = ImportBuckets $bucketsToImport
    $existsApps = Get-UserScopeApps

    function FilterPackageByScope([string]$name, $app) {
        if ($Script:global -eq ([bool] $app.Global)) {
            return $true
        } else {
            Write-Debug "Ignore package by scope not match: $name"
            return $false
        }
    }

    # install high priority apps:
    $mainUrl = 'https://github.com/ScoopInstaller/Main'
    if ($data.Buckets.ContainsKey($mainUrl)) {
        $mainBucket = $data.Buckets[$mainUrl]
        $bucketName = $bucketsMapUrl2Name[$mainUrl]
        if ($mainBucket.Apps) {
            $apps = $mainBucket.Apps
            $apps.Keys |
                Where-Object { $Script:HighPriorityApps.Contains($_) } |
                Where-Object { FilterPackageByScope $_ $apps[$_] } |
                Where-Object { !$existsApps.ContainsKey($_) } |
                ForEach-Object {
                    $appName = $_
                    if ($apps[$_].Global) {
                        ScoopInstall "$bucketName/$appName" --arch $apps[$_].Arch --global
                    } else {
                        ScoopInstall "$bucketName/$appName" --arch $apps[$_].Arch
                    }
                    $existsApps[$appName] = @{}
                }
        }
    }

    $data.Buckets.Values | ForEach-Object {
        $bucketName = $bucketsMapUrl2Name[$_.RemoteUrl]

        if ($_.Apps) {
            $apps = $_.Apps
            $apps.Keys |
                Where-Object { FilterPackageByScope $_ $apps[$_] } |
                Where-Object { !$existsApps.ContainsKey($_) } |
                ForEach-Object {
                    $appName = $_
                    if ($apps[$_].Global) {
                        ScoopInstall "$bucketName/$appName" --arch $apps[$_].Arch --global
                    } else {
                        ScoopInstall "$bucketName/$appName" --arch $apps[$_].Arch
                    }
                    $existsApps[$appName] = @{}
                }
        }
    }

    if ($data.NoBucketApps) {
        $data.NoBucketApps.Keys |
            Where-Object { FilterPackageByScope $_ $data.NoBucketApps[$_] } |
            Where-Object { !$existsApps.ContainsKey($_) } |
            ForEach-Object {
                $appName = $_
                $app = $data.NoBucketApps[$_]
                if ($app.Url) {
                    if ($apps[$_].Global) {
                        ScoopInstall $app.Url --arch $apps[$_].Arch --global
                    } else {
                        ScoopInstall $app.Url --arch $apps[$_].Arch
                    }
                }
            }
    }
}

function ScoopImport {
    if ($Script:file) {
        $plainText = Get-Content -Path $Script:file -Raw
    } elseif ($Script:plainText) {
        $plainText = $Script:plainText
    } else {
        throw "Nothing to import."
    }

    $data = $plainText | ConvertFrom-Json -AsHashtable
    if ($data.Version -eq 1) {
        ScoopImportV1 $data
    } else {
        throw "Unknown version."
    }
}

$ea = $ErrorActionPreference
$ErrorActionPreference = 'Stop'
try {
    ScoopImport $plainText
}
finally {
    $ErrorActionPreference = $ea
}
