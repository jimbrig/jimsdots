# Search CLI - `s`

[zquestz/s: Open a web search in your terminal. (github.com)](https://github.com/zquestz/s)

[s (jumps.io)](https://jumps.io/)

## Installation

Download ZIP Archive from GitHub Releases: [Release Release v0.5.16 · zquestz/s (github.com)](https://github.com/zquestz/s/releases/tag/v0.5.16)

Install directly from GitHub releases via (using the [lastversion](https://github.com/dvershinin/lastversion) pip package):

```powershell
# Download ZIP Archive:
lastversion zquestz/s --format assets --filter "windows_amd64" -d "Downloads/s-cli.zip"

# Unzip to C:\tools:
New-Item -ItemType Directory -Path "C:\tools\s-cli" -Force
Expand-Archive "$HOME\Downloads\s-cli.zip" -DestinationPath "C:\tools"

# Add s.exe to C:\bin
if (-not (test-path "C:\bin")) { New-Item -ItemType Directory "C:\bin" }
$subdir = Get-ChildItem "C:\tools"
$exepath = "C:\tools\s-cli\" + $subdir.Name + "\s.exe"
Copy-Item $exepath "c:\bin\"
```

For UNIX can install via Homebrew:

```bash
brew install s-search
```



## Configuration

- Place config file at: `~/.config/s/config`.
- `config` is `UCL`/`JSON` format without the `JSON` extension.
  -  For more information about UCL visit: https://github.com/vstakhov/libucl

The following keys are supported:

- blacklist (array of providers to exclude)
- binary (binary to launch search URI)
- cert (path to cert.pem for TLS)
- customProviders (array of custom providers)
- key (path to key.pem for TLS)
- output (output only mode)
- port (server port)
- provider (search provider)
- tag (search tag)
- verbose (verbose mode)
- whitelist (array of providers to include)

Set your default provider to google:

```
provider: google
```

To only search a few providers:

```
whitelist: [google, amazon, wikipedia]
```

To exclude providers you don't need:

```
blacklist: [dumpert]
```

To add a custom provider:

```
customProviders [
  {
    name: example
    url: "http://example.com?q=%s"
    tags: [example]
  }
]
```

Custom providers require a few things:

- An alphanumeric name. `^[a-zA-Z0-9_]*$`
- A `%s` token for the query string.
- A valid URL scheme.

***

- [config](.\config.json):

```json
{
  "provider": "google",
  "customProviders": [
    {
      "name": "gh",
      "url": "https://github.com/search?q=%s&ref=opensearch",
      "tags": [
        "dev",
        "github"
      ]
    },
    {
      "name": "ghr",
      "url": "https://github.com/search?q=%s+language:r",
      "tags": [
        "github",
        "r",
        "dev"
      ]
    },
    {
      "name": "ghpwsh",
      "url": "https://github.com/search?q=%s+language:powershell",
      "tags": [
        "github",
        "powershell",
        "dev",
        "windows"
      ]
    },
    {
      "name": "myrepos",
      "url": "https://github.com/search?q=%s+user:jimbrig",
      "tags": [
        "github",
        "dev",
        "mycontent"
      ]
    },
    {
      "name": "gistr",
      "url": "https://gist.github.com/search?q=%s+language:r&ref=searchresults",
      "tags": [
        "r",
        "github",
        "dev"
      ]
    },
    {
      "name": "rseek",
      "url": "http://rseek.org/?q=%s",
      "tags": [
        "r",
        "dev"
      ]
    },
    {
      "name": "choco",
      "url": "https://community.chocolatey.org/packages?q=%s",
      "tags": [
        "windows",
        "config",
        "packages",
        "software",
        "dev"
      ]
    },
    {
      "name": "metacran",
      "url": "https://r-pkg.org/search.html?q=%s",
      "tags": [
        "r",
        "dev",
        "docs"
      ]
    },
    {
      "name": "psgallery",
      "url": "https://www.powershellgallery.com/packages?q=%s",
      "tags": [
        "windows",
        "software",
        "packages",
        "config",
        "dev"
      ]
    },
    {
      "name": "obsidian",
      "url": "https://forum.obsidian.md/search?q=%s",
      "tags": [
        "dev",
        "docs",
        "obsidian",
        "forum"
      ]
    },
    {
      "name": "devto",
      "url": "https://dev.to/search?q=%s",
      "tags": [
        "dev",
        "forum"
      ]
    },
    {
      "name": "devdocs",
      "url": "https://devdocs.io/#q=%s",
      "tags": [
        "dev",
        "docs"
      ]
    },
    {
      "name": "hashnode",
      "url": "https://hashnode.com/search?q=%s",
      "tags": [
        "dev",
        "forum"
      ]
    },
    {
      "name": "gdrive",
      "url": "https://drive.google.com/drive/u/0/search?q=%s",
      "tags": [
        "mycontent",
        "cloud"
      ]
    },
    {
      "name": "rsite",
      "url": "http://finzi.psych.upenn.edu/cgi-bin/namazu.cgi?query=%s&max=100&result=normal&sort=score&idxname=functions&idxname=views",
      "tags": [
        "r",
        "dev"
      ]
    },
    {
      "name": "rproj",
      "url": "https://www.google.com/search?q=%s&domains=r-project.org&sitesearch=r-project.org&btnG=Google+Search",
      "tags": [
        "r",
        "dev"
      ]
    },
    {
      "name": "rdrr",
      "url": "https://rdrr.io/search?q=%s",
      "tags": [
        "r",
        "docs"
      ]
    },
    {
      "name": "edgesettings",
      "url": "edge://settings/?search=%s",
      "tags": [
        "microsoft",
        "edge",
        "settings",
        "config"
      ]
    },
    {
      "name": "gmail",
      "url": "https://inbox.google.com/search/%s",
      "tags": [
        "email",
        "google",
        "mycontent"
      ]
    },
    {
      "name": "edgehist",
      "url": "edge://history/all?q=%s",
      "tags": [
        "edge",
        "mycontent"
      ]
    },
    {
      "name": "fa",
      "url": "https://fontawesome.com/icons?d=gallery&q=%s",
      "tags": [
        "dev",
        "design"
      ]
    }
  ]
}

```

## Supported Providers

- 500px
- 8tracks
- aliexpress
- allocine
- amazon
- archpkg
- archwiki
- arstechnica
- arxiv
- atmospherejs
- aur
- baidu
- bandcamp
- bgr
- bigbasket
- bing
- brave
- buzzfeed
- cnn
- codepen
- coursera
- cplusplus
- cppreference
- crates
- crunchyroll
- debianpkg
- dict
- digg
- diigo
- dockerhub
- dribbble
- duckduckgo
- dumpert
- engadget
- explainshell
- facebook
- flickr
- flipkart
- foursquare
- giphy
- gist
- github
- gmail
- go
- godoc
- goodreads
- google
- googledocs
- googleplus
- hackernews
- ietf
- ifttt
- imdb
- imgur
- inbox
- instagram
- kickasstorrents
- libgen
- linkedin
- lmgtfy
- macports
- magnetdl
- mdn
- medium
- metacpan
- msdn
- naver
- netflix
- nhaccuatui
- npm
- npmsearch
- npr
- nvd
- overstock
- packagist
- phandroid
- php
- pinterest
- postgresql
- python
- quora
- qwant
- reddit
- regex
- rottentomatoes
- rubygems
- shodan
- soundcloud
- spotify
- stackoverflow
- steam
- taobao
- thepiratebay
- theregister
- torrentz
- twitchtv
- twitter
- unity3d
- upcloud
- vimeo
- wikipedia
- wolframalpha
- yahoo
- yandex
- youtube
- zhihu