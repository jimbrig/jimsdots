# GPG Keys

I use three GPG keys, one for each email address:

1. jimbrig2011@outlook.com
2. jimbrig2011@gmail.com
3. jimmy.briggs@tychobra.com

***

All three public keys have been copied into my [Github GPG Key Settings](https://github.com/settings/keys).

## Installation

- Install *Gpg4win* via `winget`, `chocolatey`, `scoop`

OR

- Use the `gpg` that came natively with `git-for-windows`: `%programfiles%\Git\usr\bin\gpg.exe`

```powershell
# install gpg4win - pick a method below:
winget install gpg4win
cinst gpg4win -y
scoop install gpg4win
```

## Generating the Keys

1. Next, I use GitKraken and my associated Git Profiles to generate the keys, but to generate them using `gpg` directly run:

```powerhsell
gpg --full-generate-key
# or
gpg --default-new-key-algo rsa4096 --gen-key
```

 which will prompt you for further details, select the following:

- select `RSA` as type of key
- use 4096 bits for key size
- use 2 years for expiration time
- lastly, enter User ID information

> **Note:** When asked to enter your email address, ensure that you enter the verified email address for your GitHub account. To keep your email address private, use your GitHub-provided `no-reply` email address. For more information, see "[Verifying your email address](https://docs.github.com/en/free-pro-team@latest/articles/verifying-your-email-address)" and "[Setting your commit email address](https://docs.github.com/en/free-pro-team@latest/articles/setting-your-commit-email-address)."

Next, list the keys via: `gpg --list-secret-keys --keyid-format LONG` and copy the ID of the key you want to use. the run `gpg --armor --export <keyid> | Write-Output | clip` to output the key's text to your clipboard. Navigate to <https://github.com/settings/keys> and add the key to your GitHub account.

```powershell
gpg --full-generate-key
# RSA, 4096, 2 years, email address(s)

gpg --list-secret-keys --keyid-format LONG
# copy ID

gpg --armor --export <copied ID> | Write-Output | clip
# add 2 GH

start <https://github.com/settings/keys>
```

## Encrypt the Keys for Storage in Git
