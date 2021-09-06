gpg --import $HOME\.dotfiles\gpg\backup\private-keys.asc
gpg --import $HOME\.dotfiles\gpg\backup\public-keys.asc
gpg --import $HOME\.dotfiles\gpg\backup\owner-trust.txt

# Test:
gpg -k
gpg -K
