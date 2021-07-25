# Jim’s `.dotfiles`

![terminal-screenshot](./windows-terminal/screenshot.png)

## Setup Guides

- [nodejs/npm](./nodejs/), [yarn](yarn/)
- [gcloud](./gcloud/)
- [gpg](./gpg/)
- [ssh](./ssh/)
- [excel](./excel/)
- [git](./git/)
- [python](./python/)
- [typora](./typora/)
- [chocolatey](./chocolatey)
- [scoop](./scoop/)
- [powershell](./powershell/)
- [WSL](./wsl/)
- [winget](./winget/)
- [R](./R/)
- [RStudio](./rstudio/)
- [python](./python/)
- [topgrade](./topgrade/)

## All Directories

```R
R> fs::dir_tree(recurse = 0)
> fs::dir_tree(recurse = 0)
+-- android
+-- aws
+-- azure
+-- azure-cli
+-- bash
+-- batch_files
+-- bin
+-- boto
+-- chocolatey
+-- cloudinary-cli
+-- code-insiders
+-- codestream
+-- configstore
+-- dbdocs
+-- dependencies
+-- devdocs
+-- devspace
+-- docker
+-- docs
+-- edge
+-- excel
+-- executables
+-- expo
+-- feedly
+-- freefilesync
+-- gcloud
+-- gdrive
+-- git
+-- github
+-- github-cli
+-- gitkraken
+-- gnupg
+-- gpg
+-- keep
+-- kube
+-- lepton
+-- nodejs
+-- obsidian
+-- office
+-- PATH
+-- powershell
+-- powertoys
+-- python
+-- qttabbar
+-- R
+-- README.md
+-- registry
+-- RStudio
+-- scoop
+-- secrets
+-- setup
+-- ssh
+-- topgrade
+-- typora
+-- valentina
+-- vault
+-- vim
+-- wifi
+-- winaero-tweaker
+-- windows-terminal
+-- winget
+-- wsl
+-- yarn
+-- youtube-dl
+-- z-location
+-- zapier
```

## Encrypted Secrets

Encrypted via [Git-Crypt](https://github.com/AGWA/git-crypt).

List of all encrypted files via `git-crypt status -e`.

```bash
jimbr@JimmysMSI MINGW64 ~/Dev/jimbrig/jimsdots (main)
$ git-crypt status -e
    encrypted: R/.rtweet_token.rds
    encrypted: R/config.yml
    encrypted: R/cyphr_secret.rds
    encrypted: R/gargle/gargle-oauth/14813ec27d5310adfa87a7ac40ac7e92_jimmy.briggs@tychobra.com
    encrypted: R/gargle/gargle-oauth/36576a5a5040ff9dc18b72735339a5c7_jimmy.briggs@tychobra.com
    encrypted: R/gargle/gargle-oauth/403989c6238327f1ac25c387a000c783_jimmy.briggs@tychobra.com
    encrypted: R/gargle/gargle-oauth/5af45f878011790c540d0dcf4c749969_jimbrig2011@gmail.com
    encrypted: R/gargle/gargle-oauth/eb5399b0b6106093ae22004c83fe46ad_jimbrig2011@gmail.com
    encrypted: R/gargle/gargle-oauth/eb5399b0b6106093ae22004c83fe46ad_jimmy.briggs@tychobra.com
    encrypted: R/gargle/gargle-oauth/powwater-3bdc20a4ac11.json
    encrypted: R/jimbrig2011_shiny_client_secret.json
    encrypted: R/secrets.Renviron
    encrypted: RStudio/localappdata/ctx/ctx-40565/environment_vars
    encrypted: android/adbkey
    encrypted: android/adbkey.pub
    encrypted: aws/credentials
    encrypted: azure-cli/acr_pat
    encrypted: azure/AzureRmContext.json
    encrypted: azure/accessTokens.json
    encrypted: azure/azureProfile.json
    encrypted: azure/clouds.config
    encrypted: azure/dockerAccessToken.json
    encrypted: boto/.boto
    encrypted: code-insiders/dev.to_api_token
    encrypted: dbdocs/dbdocstoken
    encrypted: docker/acr_pat
    encrypted: docker/github_cr_pat
    encrypted: docker/github_pat
    encrypted: feedly/feedly_api_tokens.yml
    encrypted: gcloud/credentials/application_default_credentials.json
    encrypted: gcloud/credentials/client_secret_833216447103-nh9h6iev1jf6qqrjdt5tlcobsss5dgm3.apps.googleusercontent.com.json
    encrypted: gcloud/credentials/client_secret_shiny-cloudrun.json
    encrypted: gcloud/credentials/credentials.json
    encrypted: gcloud/credentials/docker_credentials.json
    encrypted: gcloud/credentials/shiny-cloudrun-f77585f41245.json
    encrypted: gcloud/credentials/shiny-cloudrun-terraform-6fdc75fa6ca4.json
    encrypted: gcloud/legacy_credentials/jimbrig2011@gmail.com/.boto
    encrypted: gcloud/legacy_credentials/jimbrig2011@gmail.com/adc.json
    encrypted: gcloud/legacy_credentials/jimmy.briggs@tychobra.com/.boto
    encrypted: gcloud/legacy_credentials/jimmy.briggs@tychobra.com/adc.json
    encrypted: gdrive/jimbrig2011-credentials.json
    encrypted: gdrive/tychobra-credentials.json
    encrypted: github-cli/config.yml
    encrypted: github-cli/hosts.yml
    encrypted: github/recovery-codes.txt
    encrypted: gnupg/pubring.kbx
    encrypted: gnupg/trustdb.gpg
    encrypted: gnupg/tychobra-public-gpg.txt
    encrypted: gpg/backup/gpg-secret-key-backup.asc
    encrypted: gpg/backup/trustdb-backup.txt
    encrypted: gpg/private_keys/027FA410529E1975D4767600FA571E65ECCC2156.key
    encrypted: gpg/private_keys/5E3252078834F5F53BFFB09125FC6EEA1400B98E.key
    encrypted: gpg/private_keys/730A8DC9EF21651B74372D914AD5370882FDC672.key
    encrypted: gpg/private_keys/87791A2D82D7CB6593137F25599290E4A9F89A7E.key
    encrypted: gpg/private_keys/A2AACD2D52FC00B8C9ECD222113CC56413DDE1D0.key
    encrypted: gpg/private_keys/BC8E2D904A655E5F97ABF5A2E75BA9C267556893.key
    encrypted: gpg/public_keys/jimbrig_jimbrig2011@gmail.txt
    encrypted: gpg/public_keys/jimbrig_jimbrig2011@outlook.txt
    encrypted: gpg/public_keys/powwater_jimmy.briggs@tychobra.txt
    encrypted: gpg/public_keys/tychobra_jimmy.briggs@tychobra.txt
    encrypted: keep/.credentials
    encrypted: kube/config
    encrypted: obsidian/todoist-token
    encrypted: scoop/virustotalapikey
    encrypted: secrets/Auslogics-BitReplica-License-Key.txt
    encrypted: secrets/Auslogics-BoostSpeed-License-Key.txt
    encrypted: secrets/Auslogics-Driver-Updater-License-Key.txt
    encrypted: secrets/EASEUS-KEYS.txt
    encrypted: secrets/EaseUS-Cleverbridge-License-Keys.txt
    encrypted: secrets/Restoro-license-key.txt
    encrypted: secrets/Restoro.txt
    encrypted: secrets/Stardock-License-Key-Email.msg
    encrypted: secrets/Stardock-License-Key.txt
    encrypted: secrets/Windows10.txt
    encrypted: secrets/WiseCare365-License-Key.txt
    encrypted: secrets/acr_pat
    encrypted: secrets/alt_tab_terminator
    encrypted: secrets/alttabterminator_license_key
    encrypted: secrets/avg_license_keys
    encrypted: secrets/avgs
    encrypted: secrets/b2-app-key-4-cyberduck-credentials
    encrypted: secrets/dbdocs_token
    encrypted: secrets/driver_tool_kit
    encrypted: secrets/easeus
    encrypted: secrets/easeus_license_keys
    encrypted: secrets/gSyncIt-License-Key.txt
    encrypted: secrets/ghcr_pat
    encrypted: secrets/github-recovery-codes.txt
    encrypted: secrets/github_cr_pat
    encrypted: secrets/github_pat
    encrypted: secrets/iobit-license-keys.txt
    encrypted: secrets/mailbird
    encrypted: secrets/mailbird_license_key
    encrypted: secrets/pastebin-api-key.txt
    encrypted: secrets/raindrop_api_key
    encrypted: secrets/readwise_api_token
    encrypted: secrets/shinyappsio_secret
    encrypted: secrets/systweak-license-keys.txt
    encrypted: secrets/todoist_api_key
    encrypted: secrets/uninstall_tool_license_key
    encrypted: secrets/uninstalltool
    encrypted: secrets/win10
    encrypted: secrets/windows_10_activation_key
    encrypted: ssh/gitkraken/gitkraken_jimbrig_rsa
    encrypted: ssh/gitkraken/gitkraken_jimbrig_rsa.pub
    encrypted: ssh/gitkraken/gitkraken_outlook_github_rsa
    encrypted: ssh/gitkraken/gitkraken_outlook_github_rsa.pub
    encrypted: ssh/gitkraken/gitkraken_powwater_github_rsa
    encrypted: ssh/gitkraken/gitkraken_powwater_github_rsa.pub
    encrypted: ssh/gitkraken/gitkraken_tychobra_github_rsa
    encrypted: ssh/gitkraken/gitkraken_tychobra_github_rsa.pub
    encrypted: ssh/keys/gitkraken_rsa
    encrypted: ssh/keys/gitkraken_rsa.pub
    encrypted: ssh/keys/id_rsa
    encrypted: ssh/keys/id_rsa.pub
    encrypted: ssh/keys/known_hosts
    encrypted: vault/.vault-token
    encrypted: zapier/.zapierrc
```

### Git-Attributes

[Git-Crypt](https://github.com/AGWA/git-crypt) encrypted file declarations as well as [Git-LFS](https://git-lfs.github.com/) specifications are declared in the [.gitattributes](./.gitattributes) file:

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./.gitattributes)> -->
<!-- The below code snippet is automatically added from ./.gitattributes -->

```shell
# Git--LFS
*.pst filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text

# Git-Crypt
android/* filter=git-crypt diff=git-crypt
aws/credentials filter=git-crypt diff=git-crypt
azure/accessTokens.json filter=git-crypt diff=git-crypt
azure/azureProfile.json filter=git-crypt diff=git-crypt
azure/AzureRmContext.json filter=git-crypt diff=git-crypt
azure/clouds.config filter=git-crypt diff=git-crypt
azure/dockerAccessToken.json filter=git-crypt diff=git-crypt
azure/AzureRmContext.json filter=git-crypt diff=git-crypt
azure-cli/accessTokens.json filter=git-crypt diff=git-crypt
azure-cli/azureProfile.json filter=git-crypt diff=git-crypt
azure-cli/AzureRmContext.json filter=git-crypt diff=git-crypt
azure-cli/clouds.config filter=git-crypt diff=git-crypt
azure-cli/dockerAccessToken.json filter=git-crypt diff=git-crypt
azure-cli/AzureRmContext.json filter=git-crypt diff=git-crypt
azure-cli/acr_pat filter=git-crypt diff=git-crypt
github-cli/config.yml filter=git-crypt diff=git-crypt
github-cli/hosts.yml filter=git-crypt diff=git-crypt
github/recovery-codes.txt filter=git-crypt diff=git-crypt
kube/config filter=git-crypt diff=git-crypt
docker/github_pat filter=git-crypt diff=git-crypt
docker/github_cr_pat filter=git-crypt diff=git-crypt
docker/acr_pat filter=git-crypt diff=git-crypt
feedly/feedly_api_tokens.yml filter=git-crypt diff=git-crypt
gcloud/credentials/** filter=git-crypt diff=git-crypt
gcloud/legacy_credentials/** filter=git-crypt diff=git-crypt
gcloud/miscellaneous/** filter=git-crypt diff=git-crypt
boto/.boto filter=git-crypt diff=git-crypt
gdrive/* filter=git-crypt diff=git-crypt
vault/.vault-token filter=git-crypt diff=git-crypt
obsidian/todoist-token filter=git-crypt diff=git-crypt
gnupg/** filter=git-crypt diff=git-crypt
keep/.credentials filter=git-crypt diff=git-crypt
R/secrets.Renviron filter=git-crypt diff=git-crypt
R/cyphr_secret.rds filter=git-crypt diff=git-crypt
R/.rtweet_token.rds filter=git-crypt diff=git-crypt
R/gargle/gargle-oauth/** filter=git-crypt diff=git-crypt
R/jimbrig2011_shiny_client_secret.json filter=git-crypt diff=git-crypt
R/config.yml filter=git-crypt diff=git-crypt
RStudio/localappdata/ctx/ctx-40565/environment_vars filter=git-crypt diff=git-crypt
RStudio/localappdata/monitored/connection_history.json filter=git-crypt diff=git-crypt
gpg/public_keys/* filter=git-crypt diff=git-crypt
gpg/private_keys/* filter=git-crypt diff=git-crypt
gpg/private_keys/** filter=git-crypt diff=git-crypt
gpg/public_keys/** filter=git-crypt diff=git-crypt
gpg/backup/** filter=git-crypt diff=git-crypt
ssh/gitkraken/* filter=git-crypt diff=git-crypt
ssh/keys/** filter=git-crypt diff=git-crypt
zapier/.zapierrc filter=git-crypt diff=git-crypt
scoop/virustotalapikey filter=git-crypt diff=git-crypt
dbdocs/dbdocstoken filter=git-crypt diff=git-crypt
secrets/** filter=git-crypt diff=git-crypt
code-insiders/dev.to_api_token filter=git-crypt diff=git-crypt
powershell/psgallery-api-key
```
<!-- MARKDOWN-AUTO-DOCS:END -->

