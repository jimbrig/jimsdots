# Python

- Install via `chocolatey`
- Install `pip` (package manger) / check installed with Python
- Check `PATH` environment variables
- Install packages

## Installation

- Chocolatey

```powershell
# simple method
cinst python -y

# better method
choco install python3 --install-arguments="'/quiet InstallAllUsers=1 PrependPath=1'"
```

- Will install under `C:\Python39`
- User data stored under `%appdata%\python`

## Setup, Configuration, and Installs

```powershell
# upgrade pip
python.exe -m pip install --upgrade pip

# essential installs
pip install wheel setuptools easy_install virtualenv lastversion radian mkdocs keep b2

# upgrades
pip install --upgrade lastversion radian mkdocs keep b2
```

## Appendix 

### Installing `pip`

If installing Python did not add the `pip.exe` to python's `scripts` path, install `pip` using [get-pip/get-pip.py · pypa/get-pip (github.com)](https://github.com/pypa/get-pip/blob/main/get-pip.py):

```powershell
pip --version
curl -sSL https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
```

Upon execution, `get-pip.py` will install `pip`, `setuptools` and `wheel` in the current Python environment.

It is possible to provide additional arguments to the underlying script. These are passed through to the underlying `pip install` command, and can thus be used to constraint the versions of the packages, or to pass other pip options such as `--no-index`.

```powershell
python get-pip.py "pip < 21.0" "setuptools < 50.0" "wheel < 1.0"
python get-pip.py --no-index --find-links=/local/copies
```

#### get-pip.py options

This script also has it's own options, which control which packages it will install.

- `--no-setuptools`: do not attempt to install `setuptools`.
- `--no-wheel`: do not attempt to install `wheel`.

### Outdated Content: 

#### Packages

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
keep           2.10.1 **
livereload     2.6.3 **
lunr           0.5.8
Markdown       3.3.4 **
MarkupSafe     1.1.1
mkdocs         1.1.2 **
nltk           3.6.1
packaging      20.9
pip            21.0.1
pipx           0.16.1.0 **
PyGithub       1.54.1 **
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
virtualenv     20.4.3 **
wheel          0.36.2
wrapt          1.12.1
```

*Note: packages marked with asterisks ** are my most used packages* 

## Package Installation

Run this script or pick what to install and run in terminal:

```powershell
pip install pip pipx virtualenv PyGithub mkdocs keep livereload Markdown
```

