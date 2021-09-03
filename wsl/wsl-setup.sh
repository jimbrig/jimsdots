# initial update, upgrade, and installs
sudo apt -y update && sudo apt -y upgrade && sudo apt -y autoremove
sudo apt -y install git-core build-essential dos2unix curl ubuntu-wsl gnupg file

# import gpg keys (if exist)
# if [[ -d /mnt/c/users/jimmy/.gnupg ]]
# then
#    echo "Found ~/.gnupg on windows filesystem. Exporting GPG keys from windows to Linux."
#    /mnt/c/
gpg --import /mnt/c/windows/program\ files/git/bin/ -command gpg --export users/jimmy/.gnupg/privatekeys.asc

# link ssh keys
mkdir .ssh
cd .ssh
ln -s /mnt/c/users/jimmy/.ssh/* .
sudo chmod 644 id_rsa.pub
sudo chmod 600 id_rsa
sudo chmod 644 known_hosts
cd ../
sudo chmod 700 .ssh/

# .gitconfig
git config --global user.name "Jimmy Briggs"
git config --global user.email "jimmy.briggs@jimbrig.com"
git congig --global user.signingKey "3970755CB8844CDACB681B4C0917266E974D7790"
git config --global default.protocol "ssh"
git config --global color.ui "auto"
git config --global core.editor "vim"
git config --global github.user "jimbrig"
git config --global core.excludesfile "~/.gitignore_global"
git config --global core.attributesfile "~/.gitattributes_global"
git config --global init.defaultBranch "main"

# install ZSH
sudo apt -y install zsh

# Install oh-my-zsh
git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh

# Install some external plugins:
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-completions ~/.oh-my-zsh/custom/plugins/zsh-completions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting

# Set Zsh as your default shell:
chsh -s /bin/zsh

# install homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# add PATH
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/jimbrig/.profile
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
source ~/.profile

# test
test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
test -r ~/.bash_profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.bash_profile
echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.profile

# install gcc
brew install gcc

# check
brew doctor

# install github-cli
VERSION=`curl  "https://api.github.com/repos/cli/cli/releases/latest" | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/' | cut -c2-`
echo $VERSION
mkdir ~/downloads
curl -sSL https://github.com/cli/cli/releases/download/v${VERSION}/gh_${VERSION}_linux_amd64.tar.gz -o ~/downloads/gh_${VERSION}_linux_amd64.tar.gz
cd ~/downloads
tar xvf gh_${VERSION}_linux_amd64.tar.gz
sudo cp gh_${VERSION}_linux_amd64/bin/gh /usr/local/bin/
gh version
sudo cp -r ~/downloads/gh_${VERSION}_linux_amd64/share/man/man1/* /usr/share/man/man1/
# man gh
gh auth login

# install nvm, node, and npm
sudo apt-get -y update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm --version
nvm install node
node --version
npm install -g npm@latest
npm --version
nvm set-colors cgYmW
nvm use node
npm login
mkdir ~/node_modules
mkdir ~/node_modules/.bin
npm doctor

# dotfiles
mkdir ~/.dotfiles
cd .dotfiles
mkdir home/jimbrig
mkdir etc/

# install git-crypt
brew install git-crypt

# install cargo
sudo apt-get update -y
sudo apt-get install -y cargo

echo '\n# Add .cargo to $PATH\nexport PATH="~/.cargo/bin:$PATH"\n' >> ~/.zshrc

cargo install cargo-update
cargo install exa
cargo install topgrade


# install gcloudsdk

# install postgresql

# cheat.sh
sudo apt-get install rlwrap xsel -y
curl https://cht.sh/:cht.sh | sudo tee /usr/local/bin/cht.sh
sudo chmod +x /usr/local/bin/cht.sh




