gpg -a --export > $HOME\.dotfiles\gpg\backup\public-keys.asc
gpg -a --export-secret-keys > $HOME\.dotfiles\gpg\backup\private-keys.asc
gpg --export-ownertrust > $HOME\.dotfiles\gpg\backup\owner-trust.txt
