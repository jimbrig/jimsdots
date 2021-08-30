# copy ~/.ssh files to /mnt/c/users/jimmy/.dotfiles/ssh/
cp -r ~/.ssh/* /mnt/c/users/jimmy/.dotfiles/ssh/WSL-Ubuntu-CommPrev/

# SymLink back to ~/.ssh
ln -s /mnt/c/Users/jimmy/.dotfiles/ssh/WSL-Ubuntu-CommPrev/config ~/.ssh/config
ln -s /mnt/c/Users/jimmy/.dotfiles/ssh/WSL-Ubuntu-CommPrev/known_hosts ~/.ssh/known_hosts
ln -s /mnt/c/Users/jimmy/.dotfiles/ssh/WSL-Ubuntu-CommPrev/WSL_Ubuntu-CommPrev_id_rsa ~/.ssh/id_rsa
ln -s /mnt/c/Users/jimmy/.dotfiles/ssh/WSL-Ubuntu-CommPrev/WSL_Ubuntu-CommPrev_id_rsa.pub ~/.ssh/id_rsa.pub
