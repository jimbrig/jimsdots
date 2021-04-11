# Jim’s `.dotfiles`

## Directories

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
- keep
- kube
- nodejs
- obsidian
- R
- RStudio
- scoop
- vault
- vim
- wifi
- yarn
- youtube-dl
- z-location

## Encrypted Secrets

Encrypted via `git-crypt`.

Specification is configured in `.gitattributes`:

```
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

gcloud/** filter=git-crypt diff=git-crypt

boto/.boto filter=git-crypt diff=git-crypt

gdrive/* filter=git-crypt diff=git-crypt

vault/.vault-token filter=git-crypt diff=git-crypt

obsidian/todoist-token filter=git-crypt diff=git-crypt

gnupg/** filter=git-crypt diff=git-crypt

keep/.credentials filter=git-crypt diff=git-crypt

R/secrets.Renviron filter=git-crypt diff=git-crypt
R/cyphr_secret.rds filter=git-crypt diff=git-crypt
R/.rtweet_token.rds filter=git-crypt diff=git-crypt

RStudio/localappdata/ctx/ctx-40565/environment_vars filter=git-crypt diff=git-crypt
RStudio/localappdata/monitored/connection_history.json filter=git-crypt diff=git-crypt

gpg/keys/* filter=git-crypt diff=git-crypt

ssh/gitkraken/* filter=git-crypt diff=git-crypt
ssh/keys/* filter=git-crypt diff=git-crypt
```
