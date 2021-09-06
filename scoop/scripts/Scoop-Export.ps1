param(
    [switch] $global
)

. $PSScriptRoot\Lib.ps1

function ScoopExport {
    $buckets = Get-Buckets
    $noBucketApps = @{}

    if ($Script:global) {
        $apps = $(Get-GlobalScopeApps).Values + $(Get-UserScopeApps).Values
    } else {
        $apps = $(Get-UserScopeApps).Values
    }
    
    $apps | ForEach-Object {
        $app = $_
        if ($app.Bucket) {
            if ($buckets.ContainsKey($app.Bucket)) {
                # if user remove bucket, unable to backup
                $bucket = $buckets[$app.Bucket]
                if (!$bucket.ContainsKey("Apps")) {
                    $bucket["Apps"] = @{}
                }
                $entry = @{
                    Arch = $app.Arch
                }
                if ($app.Global) {
                    $entry.Global = $true
                }
                # local package should override global package:
                $bucket.Apps[$app.Name] = $entry
            }
        } elseif ($app.Url) {
            $entry = @{
                Url = $app.Url
                Arch = $app.Arch
            }
            if ($app.Global) {
                $entry.Global = $true
            }
            # local package should override global package:
            $noBucketApps[$app.Name] = $entry
        }
    }

    $rv = @{
        Version = 1
        Buckets = @{}
    }
    $buckets.Values | ForEach-Object {
        $bucket = $_
        $url = $bucket.RemoteUrl
        if (!$rv.Buckets.ContainsKey($url)) {
            $rv.Buckets[$url] = $bucket
        }
    }
    if ($noBucketApps.Count -gt 0) {
        $rv.NoBucketApps = $noBucketApps
    }

    return $rv | ConvertTo-Json -Depth 10
}

$ea = $ErrorActionPreference
$ErrorActionPreference = 'Stop'
try {
    ScoopExport
}
finally {
    $ErrorActionPreference = $ea
}
