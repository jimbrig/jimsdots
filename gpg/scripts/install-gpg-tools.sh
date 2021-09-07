sudo apt update
sudo apt -y upgrade
sudo apt install socat gpg
echo pinentry-program /mnt/c/Program\ Files\ \(x86\)/Gpg4win/bin/pinentry.exe > ~/.gnupg/gpg-agent.conf
gpg-connect-agent reloadagent /bye
