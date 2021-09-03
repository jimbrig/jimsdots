@echo off
cd C:\Users\jimmy\.dotfiles
git add chocolatey/**
git commit -m "Update Chocolatey Package List Backup"
git push
gh repo view -w
