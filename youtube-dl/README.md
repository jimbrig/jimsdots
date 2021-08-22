# YouTube Download CLI

`youtube-dl` is an awesome CLI utility to download video and other files media files from online hosts (specifically youtube but works with other as well) to local machine.

simply run:

```powershell
youtube-dl <url to video>
```

## Installation

- Chocolatey Provider:

```powershell
sudo cinst youtube-dl -y
```

- Python via pip:

```powershell
pip install -U youtube-dl
```

Other Options:
- `brew`
- `apt-get` (see details at youtube-dl repo)
- `manual GitHub exe archive`

## Custom Output

Output on `youtube-dl` is handled with the `--output` or `-o` switch; pass it as an option, followed by the destination you want to save your downloads to:

`youtube-dl -o '%USERPROFILE%\Desktop\%(title)s-%(id)s.%(ext)s' www.youtube.com/link/to/video`

Note that `-o` has a dual function in that it also sets a template for how your output files will be named, using variables. In this example, it will output the title of the original downloaded video followed by the file extension, which is my personal preference. For all of the variables that can be used in a filename, have a look at [the youtube-dl documentation here](https://github.com/rg3/youtube-dl#filesystem-options).

## Configuration

`youtube-dl` also allows use of a _configuration file_ - a file that can be used to configure the switches you most frequently use so the program can pull them from there instead, saving you from having to explicitly call them each time you run it. _This is what you'll need for the default download location that you're looking for._ The configuration file can be used to set a default output destination so that you never have to explicitly set an output again.

To set up a configuration file for youtube-dl, assuming you have Windows:

1.  In `%APPDATA%\Roaming`, create a `youtube-dl` folder if one doesn't already exist.
    
2.  Inside that folder, create a plain text file named `config.txt`.
    
3.  Place `youtube-dl` options in the file as you'd normally use them on the command line with `youtube-dl`, placing each one on a new line. For example, for the output switch, you'd use: `-o %USERPROFILE%\Desktop`. For more on the Configuration file, read [the documentation on it here](https://github.com/rg3/youtube-dl#configuration).
    

## Overriding the Configuration file

Even when an option is configured in a configuration file, it can be overridden by calling it explicitly from the command line. So, if you have `-o` set in a configuration file to be the default location for downloads, but want to save downloads to somewhere else for a current job, simply calling `-o` on the command line will override the configuration file for the current run of the program only.

## Setup Script

```powershell
sudo cinst youtube-dl
$ytdlconfigfile = "$env:appdata\youtube-dl\config.txt" 
new-item $ytdlconfigfile -ItemType File -Force
Write-Host "✔️ Successfully created youtube-dl config file at: $ytdlconfigfile" -ForegroundColor Green
echo "-o %USERPROFILE%\OneDrive\Videos\YouTube" >> $ytdlconfigfile
Write-Host "✔️ Successfully added output location to configuration:`n`" -ForegroundColor Green
Write-Host "Config File Contents:" -ForegrounColor -Cyan
cat $ytdlconfigfile
$answer = Read-Host "❔ Sync configuration with dotfiles (y/n)?"
if (-not($answer -eq "y")) { throw "Done." }
if ($answer -eq "y") {
	New-Item "$HOME\.dotfiles\youtube-dl" -ItemType Directory -Force
	move-item $ytdlconfigfile -destination "$HOME\.dotfiles\youtube-dl\" -Force
	New-Item -Path $env:APPDATA\youtube-dl\config.txt -ItemType SymbolicLink -Value "$HOME\.dotfiles\youtube-dl\config.yml"
}
```

***

Sources:
- [how to set up default download location in youtube-dl - Stack Overflow](https://stackoverflow.com/questions/32482230/how-to-set-up-default-download-location-in-youtube-dl)
- [ytdl-org/youtube-dl: Command-line program to download videos from YouTube.com and other video sites (github.com)](https://github.com/ytdl-org/youtube-dl)
- [ytdl-org/youtube-dl: Configuration (github.com)](https://github.com/ytdl-org/youtube-dl#configuration)
