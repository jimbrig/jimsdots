function Get-Buckets {
    $buckets = @{}

    Get-ChildItem "$(Get-UserScoopDir)\buckets\" | ForEach-Object {
        $job = Start-Job -WorkingDirectory $_.FullName -ScriptBlock {
            git remote get-url origin
        }
        $remote = Receive-Job $job -Wait -AutoRemoveJob
        $buckets[$_.BaseName] = @{
            BucketName = $_.BaseName
            RemoteUrl = [string]::new($remote) # remove ps properties.
        }
    }
    return $buckets
}

function Get-Apps([string] $appsDir) {
    $apps = @{}
    Get-ChildItem $appsDir | ForEach-Object {
        $current = "$_\current"
        $installPath = "$current\install.json"
        if (Test-Path $installPath) {
            $install = Get-Content -Raw $installPath | ConvertFrom-Json -AsHashTable
            $apps[$_.name] = @{
                Name = $_.name
                Bucket = $install.bucket
                Arch = $install.architecture
                Url = $install.url
            }
        }
    }
    return $apps
}

function Get-UserScoopDir {
    $baseDir = '~\scoop'

    if ($env:SCOOP -and (Test-Path $env:SCOOP)) {
        $baseDir = "$env:SCOOP"
    }

    return $baseDir
}
function Get-UserScopeApps {
    return Get-Apps "$(Get-UserScoopDir)\apps\"
}

function Get-GlobalScopeApps {
    if ($env:SCOOP_GLOBAL -and (Test-Path $env:SCOOP_GLOBAL)) {
        $appsDir = "$env:SCOOP_GLOBAL\apps"
    } else {
        $appsDir = "$env:ProgramData\scoop\apps\"
    }

    $d = Get-Apps $appsDir
    $d.Values | ForEach-Object {
        $_['Global'] = $true
    }
    return $d
}
