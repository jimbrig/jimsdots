# Python

- Install via `chocolatey`
- Install `pip` (package manger) / check installed with Python
- Check `PATH` environment variables
- Install packages

## Installation

```powershell
cinst python -y
```

- Will install under `C:\Python39`
- User data stored under `%appdata%\python`

## Install `pip`

Navigate to this directory and run `python get-pip.py` to install `pip`.

## Packages

As of April 10, 21:

```powershell
PS C:\Users\jimbrig\Dev\jimsdots\python> pip list
Package        Version
-------------- ---------
appdirs        1.4.4
argcomplete    1.12.2
certifi        2020.12.5
chardet        4.0.0
click          7.1.2
colorama       0.4.4
Deprecated     1.2.12
distlib        0.3.1
filelock       3.0.12
future         0.18.2
idna           2.10
Jinja2         2.11.3
joblib         1.0.1
keep           2.10.1
livereload     2.6.3
lunr           0.5.8
Markdown       3.3.4
MarkupSafe     1.1.1
mkdocs         1.1.2
nltk           3.6.1
packaging      20.9
pip            21.0.1
pipx           0.16.1.0
PyGithub       1.54.1
PyJWT          1.7.1
pyparsing      2.4.7
PyYAML         5.4.1
regex          2021.4.4
requests       2.25.1
setuptools     56.0.0
six            1.15.0
terminaltables 3.1.0
tornado        6.1
tqdm           4.60.0
urllib3        1.26.4
userpath       1.4.2
virtualenv     20.4.3
wheel          0.36.2
wrapt          1.12.1
```

