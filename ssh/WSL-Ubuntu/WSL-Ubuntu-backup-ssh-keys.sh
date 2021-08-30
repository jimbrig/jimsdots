# copy ~/.ssh files to /mnt/c/users/jimmy/.dotfiles/ssh/
cp -r ~/.ssh/* /mnt/c/users/jimmy/.dotfiles/ssh/WSL-Ubuntu/

# SymLink back to ~/.ssh
ln -s /mnt/c/Users/jimmy/.dotfiles/ssh/WSL-Ubuntu/config ~/.ssh/config
ln -s /mnt/c/Users/jimmy/.dotfiles/ssh/WSL-Ubuntu/known_hosts ~/.ssh/known_hosts
ln -s /mnt/c/Users/jimmy/.dotfiles/ssh/WSL-Ubuntu/WSL_Ubuntu_id_rsa ~/.ssh/id_rsa
ln -s /mnt/c/Users/jimmy/.dotfiles/ssh/WSL-Ubuntu/WSL_Ubuntu_id_rsa.pub ~/.ssh/id_rsa.pub
