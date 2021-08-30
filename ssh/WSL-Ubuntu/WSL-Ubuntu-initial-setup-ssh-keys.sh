# generate key-pair
ssh-keygen -t rsa -b 4096 -C "jimmy.briggs@jimbrig.com"
# save to file /home/jimbrig/.ssh/WSL_Ubuntu_id_rsa
# no password

# create and edit config
echo "Host *\n    HostName github.com\n    User git\n    IdentityFile ~/.ssh/WSL_Ubuntu-CommPrev_id_rsa\n    IdentitiesOnly yes\n" > ~/.ssh/config
cat ~/.ssh/config
# or via VIM:
vim ~/.ssh/config

# copy to clipboard (NOTE: need alias for clip.exe here)
cat ~/.ssh/WSL_Ubuntu_id_rsa.pub | clip.exe

# launch github ssh new page in browser:
cmd.exe /c start   https://github.com/settings/ssh/new

# Test
ssh -T git@github.com
cd ~/dev
git clone git@github.com:jimbrig/wsl-dotfiles.git
