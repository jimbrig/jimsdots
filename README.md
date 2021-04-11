# Jim’s `.dotfiles`

## Setup Guides:

- [nodejs](./nodejs/)
- [gcloud](./gcloud/)
- [gpg](./gpg/)
- [ssh](./ssh/)
- [excel](./excel/)
- [git](./git/)
- [python](./python/)
- [typora](./typora/)

## All Directories

- android
- aws
- azure
- bash
- boto
- cloudinary-cli
- code-insiders
- codestream
- configstore
- devdocs
- devspace
- docker
- docs
- edge
- excel
- expo
- feedly
- gcloud
- gdrive
- git
- github
- github-cli
- gitkraken
- gnupg
- gpg
- keep
- kube
- nodejs
- obsidian
- powershell
- python
- R
- registry
- RStudio
- scoop
- ssh
- typora
- vault
- vim
- wifi
- windows-terminal
- wsl
- yarn
- youtube-dl
- z-location

## Encrypted Secrets

Encrypted via `git-crypt`.

List of all encrypted files via `git-crypt status -e`:

```powershell
PS C:\Users\jimbrig\Dev\jimsdots> git-crypt status -e
    encrypted: R/.rtweet_token.rds
    encrypted: R/cyphr_secret.rds
    encrypted: R/gargle/gargle-oauth/14813ec27d5310adfa87a7ac40ac7e92_jimmy.briggs@tychobra.com
    encrypted: R/gargle/gargle-oauth/36576a5a5040ff9dc18b72735339a5c7_jimmy.briggs@tychobra.com
    encrypted: R/gargle/gargle-oauth/403989c6238327f1ac25c387a000c783_jimmy.briggs@tychobra.com
    encrypted: R/gargle/gargle-oauth/5af45f878011790c540d0dcf4c749969_jimbrig2011@gmail.com
    encrypted: R/gargle/gargle-oauth/eb5399b0b6106093ae22004c83fe46ad_jimbrig2011@gmail.com
    encrypted: R/gargle/gargle-oauth/eb5399b0b6106093ae22004c83fe46ad_jimmy.briggs@tychobra.com
    encrypted: R/gargle/gargle-oauth/powwater-3bdc20a4ac11.json
    encrypted: R/secrets.Renviron
    encrypted: RStudio/localappdata/ctx/ctx-40565/environment_vars
    encrypted: android/adbkey
    encrypted: android/adbkey.pub
    encrypted: aws/credentials
    encrypted: azure/AzureRmContext.json
    encrypted: azure/accessTokens.json
    encrypted: azure/azureProfile.json
    encrypted: azure/clouds.config
    encrypted: azure/dockerAccessToken.json
    encrypted: boto/.boto
    encrypted: docker/github_PAT.txt
    encrypted: feedly/feedly_api_tokens.yml
    encrypted: gcloud/credentials/access_tokens.db
    encrypted: gcloud/credentials/application_default_credentials.json
    encrypted: gcloud/credentials/client_secret_833216447103-nh9h6iev1jf6qqrjdt5tlcobsss5dgm3.apps.googleusercontent.com.json
    encrypted: gcloud/credentials/client_secret_shiny-cloudrun.json
    encrypted: gcloud/credentials/credentials.db
    encrypted: gcloud/credentials/credentials.json
    encrypted: gcloud/credentials/docker_credentials.json
    encrypted: gcloud/credentials/shiny-cloudrun-f77585f41245.json
    encrypted: gcloud/credentials/shiny-cloudrun-terraform-6fdc75fa6ca4.json
    encrypted: gcloud/legacy_credentials/jimbrig2011@gmail.com/.boto
    encrypted: gcloud/legacy_credentials/jimbrig2011@gmail.com/adc.json
    encrypted: gcloud/legacy_credentials/jimmy.briggs@tychobra.com/.boto
    encrypted: gcloud/legacy_credentials/jimmy.briggs@tychobra.com/adc.json
    encrypted: gcloud/miscellaneous/.last_opt_in_prompt.yaml
    encrypted: gcloud/miscellaneous/.last_survey_prompt.yaml
    encrypted: gcloud/miscellaneous/.last_update_check.json
    encrypted: gcloud/miscellaneous/.metricsUUID
    encrypted: gdrive/jimbrig2011-credentials.json
    encrypted: gdrive/tychobra-credentials.json
    encrypted: github-cli/config.yml
    encrypted: github-cli/hosts.yml
    encrypted: github/recovery-codes.txt
    encrypted: gnupg/pubring.kbx
    encrypted: gnupg/trustdb.gpg
    encrypted: gnupg/tychobra-public-gpg.txt
    encrypted: gpg/keys/jimbrig2011@gmail.txt
    encrypted: gpg/keys/jimbrig2011@outlook.txt
    encrypted: gpg/keys/jimmy.briggs@tychobra.txt
    encrypted: keep/.credentials
    encrypted: kube/config
    encrypted: obsidian/todoist-token
    encrypted: ssh/gitkraken/gitkraken_jimbrig_rsa
    encrypted: ssh/gitkraken/gitkraken_jimbrig_rsa.pub
    encrypted: ssh/gitkraken/gitkraken_outlook_github_rsa
    encrypted: ssh/gitkraken/gitkraken_outlook_github_rsa.pub
    encrypted: ssh/gitkraken/gitkraken_powwater_github_rsa
    encrypted: ssh/gitkraken/gitkraken_powwater_github_rsa.pub
    encrypted: ssh/gitkraken/gitkraken_tychobra_github_rsa
    encrypted: ssh/gitkraken/gitkraken_tychobra_github_rsa.pub
    encrypted: ssh/keys/config
    encrypted: ssh/keys/id_ed25519
    encrypted: ssh/keys/id_ed25519.pub
    encrypted: ssh/keys/id_rsa
    encrypted: ssh/keys/id_rsa.pub
    encrypted: vault/.vault-token
    
```

### Git-Attributes

Specification is configured in `.gitattributes`:

```shell
android/* filter=git-crypt diff=git-crypt
aws/credentials filter=git-crypt diff=git-crypt
azure/accessTokens.json filter=git-crypt diff=git-crypt
azure/azureProfile.json filter=git-crypt diff=git-crypt
azure/AzureRmContext.json filter=git-crypt diff=git-crypt
azure/clouds.config filter=git-crypt diff=git-crypt
azure/dockerAccessToken.json filter=git-crypt diff=git-crypt
azure/AzureRmContext.json filter=git-crypt diff=git-crypt
github-cli/config.yml filter=git-crypt diff=git-crypt
github-cli/hosts.yml filter=git-crypt diff=git-crypt
github/recovery-codes.txt filter=git-crypt diff=git-crypt
kube/config filter=git-crypt diff=git-crypt
docker/github_PAT.txt filter=git-crypt diff=git-crypt
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
RStudio/localappdata/ctx/ctx-40565/environment_vars filter=git-crypt diff=git-crypt
RStudio/localappdata/monitored/connection_history.json filter=git-crypt diff=git-crypt
gpg/keys/* filter=git-crypt diff=git-crypt
ssh/gitkraken/* filter=git-crypt diff=git-crypt
ssh/keys/* filter=git-crypt diff=git-crypt

```

