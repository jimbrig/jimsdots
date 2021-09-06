# backup private keys to asc file
gpg --export-secret-keys --armor "Jimmy Briggs" > gpg-secret-key-backup.asc

# backup trustdb
gpg --export-ownertrust > trustdb-backup.txt

