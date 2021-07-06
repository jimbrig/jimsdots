# restore private keys from asc file
gpg —-import gpg-secret-key-backup.asc

# delete existing trust database
rm ~/.gnupg/trustdb.gpg

# restore the trustdb
gpg --import-ownertrust < trustdb-backup.txt

