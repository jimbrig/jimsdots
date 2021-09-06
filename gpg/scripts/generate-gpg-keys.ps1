# install gpg4win before running
# winget install gpg4win

gpg --full-generate-key

# RSA, 4096, 2 years, email address(s)

gpg --list-secret-keys --keyid-format LONG

# copy ID

gpg --armor --export <copied ID> | Write-Output | clip

# add 2 GH
start <https://github.com/settings/keys>