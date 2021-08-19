# GPG Keys

GPG keys are used to sign tags and commits with git which in turn marks GitHub the commits as *verified* on GitHub so others can be confident that the changes come from a trusted source.

I use three GPG keys, one for each email address:

1. jimmy.briggs@jimbrig.com

2. jimbrig2011@outlook.com

3. jimbrig2011@gmail.com

*All three public keys have been copied into my [Github GPG Key Settings](https://github.com/settings/keys)*

## Installation

Download and install [the GPG command line tools](https://www.gnupg.org/download/) for your operating system.

On Windows, you can use the built in `gpg.exe` that comes with Git, or download `gpg4win` or  [GnuPG](https://www.gnupg.org/). The `gpg.exe` is located under `usr/bin` within your Git installation folder (i.e. `Program Files\Git`).

- Install *Gpg4win* via `winget`, `chocolatey`, `scoop`

OR

- Use the `gpg` that came natively with `git-for-windows`: `%programfiles%\Git\usr\bin\gpg.exe`

```powershell
# install gpg4win - pick a method below:
winget install gpg4win
cinst gpg4win -y
scoop install gpg4win
```

## Generating Keys

To generate a new GPG key run:

```powershell
gpg --full-generate-key
# RSA, 4096 bits, No Expiration, etc.
```

I use GitKraken and my associated Git Profiles to generate the keys, but to generate them using `gpg` directly run:

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

## List Keys

Next, list the keys via: `gpg --list-secret-keys --keyid-format LONG` and copy the ID of the key you want to use. the run `gpg --armor --export <keyid> | Write-Output | clip` to output the key's text to your clipboard. Navigate to <https://github.com/settings/keys> and add the key to your GitHub account.

```powershell
gpg --full-generate-key
# RSA, 4096, 2 years, email address(s)

gpg --list-secret-keys --keyid-format LONG
# copy ID

gpg --armor --export <copied ID> | Write-Output | clip
# add 2 GH

start https://github.com/settings/keys
```

To list your keys run:

```powershell
gpg --list-secret-keys --keyid-format=long
```

This will output the following information:

- The path to your public key ring `.kbx` file
- The type and length (in bytes) for each key following by the key's ID (after `rsa4096/`)
- The date of creation and expiration
- Name, Comment, and email(s) associated with the keys.

## Upload Keys to GitHub

```powershell
# copy a key's ID then run
gpg --armor --export <ID>
# Prints the GPG key ID, in ASCII armor format
# to copy to clipboard and upload to github run:
gpg --armor --export <ID> | clip
start https://github.com/settings/keys
```

## Configure Git

Adjust your git configuration to include your new GPG key signatures on commits:

```powershell
git config --global user.signingKey "<long ID>"
git config --global gpg.program "C:\\Program Files\\Git\\usr\\bin\\gpg.exe"
git config --global commit.gpgSign true
git config --global tag.forceSignAnnotated true
```

Resulting `.gitconfig`:

```powershell
[user]
	name = Jimmy Briggs
	email = jimmy.briggs@jimbrig.com
	signingKey = <REDACTED>
[core]
	longpaths = true
[gpg]
	program = C:\\Program Files\\Git\\usr\\bin\\gpg.exe
[commit]
	gpgSign = true
[tag]
	forceSignAnnotated = true
```

```bash
# for separate windows installation:
$ git config --global gpg.program "/c/Program Files (x86)/GnuPG/bin/gpg.exe

# for git's included gpg executable:
$ git config --global gpg.program "/c/Program Files/Git/usr/bin/gpg.exe"
```

*Note that git now also comes with [gpg2.exe]() which can make things easier - see [this stackoverflow post](https://stackoverflow.com/a/46884134/4126843) for details.*


## Migrating Keys

### Using Zip Compressed Backups

Here I will compress an `.zip` archive of the entire `~/.gnupg` folder for restoration: 

```powershell
compress-archive $HOME\.gnupg $HOME\OneDrive\Backups\Keys\gnupg_backup_yyyymmdd.zip
```

Then on new computer,

```powershell
Expand-Archive $HOME\OneDrive\Backups\Keys\gnupg_backup_yyyymmdd.zip $HOME
```

Now all you need to do is ensure you have Git and GPG installed and your `.gitconfig` is in sync with the keys restored from OneDrive.

### Exporting

Another way to move your php keys from one machine to another is to export the keys on the source machine, and then import the keys on the target computer. 

To export all public keys to a base64-encoded text file run:

```powershell
gpg -a --export > publickeys.asc
```

To export all encrypted private keys (which will also include corresponding public keys) to a text file, run:

```powershell
gpg -a --export-secret-keys > privatekeys.asc
```

Optionally, to export the GPG *trustdb* to a text file, run:

```powershell
gpg --export-ownertrust > otrust.txt
```

Then transfer those files to a place the new machine can access such as the cloud.

### Importing

Simply execute `gpg --import` against the two `.asc` created exports from above and check via `gpg -k` and `gpg -K`:

```powershell
gpg --import privatekeys.asc
gpg --import publickeys.asc
gpg -k
gpg -K
```

Optionally import the trustdb file as well:

```
gpg --import-ownertrust otrust.txt
```

As the new user, test encryption and decryption with `gpg -er <USERID>` and `gpg -d` commands.

Keep in mind that decryption and signing will likely fail unless the user running `gpg` owns the terminal it is running on (Translation: don't `su` over to the new user; login directly via `ssh` or console).

## Reference

#### Download GnuPG

- [GnuPG - Download](https://www.gnupg.org/download/)

### GitHub Docs

- [About commit signature verification - GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/about-commit-signature-verification)
- [Displaying verification statuses for all of your commits - GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/displaying-verification-statuses-for-all-of-your-commits)
- [Checking for existing GPG keys - GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/checking-for-existing-gpg-keys)
- [Generating a new GPG key - GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/generating-a-new-gpg-key)
- [Adding a new GPG key to your GitHub account - GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/adding-a-new-gpg-key-to-your-github-account)
- [Telling Git about your signing key - GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/telling-git-about-your-signing-key)
- [Associating an email with your GPG key - GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/associating-an-email-with-your-gpg-key)
- [Signing commits - GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/signing-commits)
- [Signing tags - GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/managing-commit-signature-verification/signing-tags)

### Other

- [How to migrate or export all GnuPG (gpg) public and private keys from one user to another - Red Hat Customer Portal](https://access.redhat.com/solutions/2115511)
- [Migrating GnuPG Keys from One Computer to Another (koozie.org)](http://www.koozie.org/blog/2014/07/migrating-gnupg-keys-from-one-computer-to-another)
- [How to Backup and Restore Your GPG Key | Risan Bagja Pradana](https://risanb.com/code/backup-restore-gpg-key/)
- [key management - How many OpenPGP keys should I make? - Information Security Stack Exchange](https://security.stackexchange.com/questions/29851/how-many-openpgp-keys-should-i-make?newreg=d00e3c42cd16456495e215d56f177da6)
- [SysAdminDocs/gpg-docs: GPG Documentation (github.com)](https://github.com/SysAdminDocs/gpg-docs)
- [Configure GPG to sign Git commits (in Windows) (neurotechnics.com)](https://neurotechnics.com/blog/configure-gpg-to-sign-git-commits-in-windows/)
- [WINDOWS - How to enable auto-signing Git commits with GnuPG for programs that don't support it natively (github.com)](https://gist.github.com/BoGnY/f9b1be6393234537c3e247f33e74094a)
