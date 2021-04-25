# Node.js and NPM

## Reference

* [Set up NodeJS on native Windows | Microsoft Docs](https://docs.microsoft.com/en-us/windows/nodejs/setup-on-windows)
* [Set up Node.js on WSL 2 | Microsoft Docs](https://docs.microsoft.com/en-us/windows/nodejs/setup-on-wsl2)
* [nodejs-guidelines/windows-environment.md](https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules)
* [coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows#:~:text=Node%20Version%20Manager%20%28nvm%29%20for%20Windows%201%20Installation,Using%20Yarn.%20...%207%20Build%20from%20source.%20)
* [nvm-sh/nvm](https://github.com/nvm-sh/nvm)
* [Using a Node Version Manager](http://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html)
* [How to install Node Version Manager (NVM) for Windows 10](https://dev.to/skaytech/how-to-install-node-version-manager-nvm-for-windows-10-4nbi)
* [n - npm](https://www.npmjs.com/package/n)
* [Installing Node.js via package manager | Node.js](https://nodejs.org/en/download/package-manager/)

# Starred Packages

```powershell
playball
bower
@google-cloud/secret-manager
googlemaps
@google/markerwithlabel
@googlemaps/markermanager
@googlemaps/markerclustererplus
@googlemaps/js-api-loader
@googlemaps/js-samples
gitmoji-cli
save-local
git-copy-repos-labels-cli
copy-github-labels-cli
firebase-tools
cross-env
pm2
git-labels-cli
git-labels
gist-backup
github-gists-cli
github-gists
nativefier
npm-check-updates
envinfo
fixpack
yarn
webpack
expo-cli
static-marks
@release-it/keep-a-changelog
gulp
release-it
eslint
prettier
jshint
create-react-app
devspace
dbdocs
@dbml/cli
```

## `.npmrc`

```shell
//registry.npmjs.org/:_authToken=<REDEACTED>
bin-links = true
color = "always"
editor = code-insiders
browser = "start"
git = "C:\Program Files\Git\bin\git.exe"
init-author-email = "jimmy.briggs@tychobra.com"
init-author-name = "Jimmy Briggs"
init-author-url = "https://github.com/jimbrig"
init-license = MIT
sign-git-commit = true
sign-git-tag = true
```

## Installation

- Install directly via [Chocolatey](https://chocolatey.org/), [Scoop](https://scoop.sh/), or [winget](https://github.com/microsoft/winget-cli):

```powershell
# chocolatey:
cinst nodejs.install

# scoop
scoop install nodejs

# winget
winget install OpenJS.NodeJS
```

- Install with a version manager such as nvm (recommended):

```powershell
# install nvm via chocolatey
cinst nvm -y
refreshenv

# verify installation
nvm --version
nvm ls

# install latest version of nodejs/npm
nvm install latest

# list available versions
nvm list available

# declare which version to use
nvm use <version>

# check selected version with node and npm directly
node --version
npm --version
```

### Version Managers

#### Install nvm-windows, node.js, and npm

There are multiple ways to install Node.js. I recommend using a version manager as versions change very quickly. You will likely need to switch between multiple versions based on the needs of different projects you're working on. 

Node Version Manager, more commonly called *nvm*, is the most popular way to install multiple versions of Node.js, but is only available for Mac/Linux and not supported on Windows.

Instead, I will walk through the steps to install *nvm-windows* and then use it to install Node.js and Node Package Manager (npm). 

There are [alternative version managers](https://docs.microsoft.com/en-us/windows/nodejs/setup-on-windows#alternative-version-managers) to consider as well.

##### Note about previous installations

It is always recommended to remove any existing installations of Node.js or npm from your operating system before installing a version manager as the different types of installation can lead to strange and confusing conflicts. 

This includes deleting any existing nodejs installation directories (e.g., "C:\Program Files\nodejs") that might remain. 

NVM's generated symlink will not overwrite an existing (even empty) installation directory. For help with removing previous installations, see [How to completely remove node.js from Windows](https://stackoverflow.com/questions/20711240/how-to-completely-remove-node-js-from-windows).

##### Other Version Managers

While windows-nvm is currently the most popular version manager for node, there are alternatives to consider:

- [nvs](https://github.com/jasongin/nvs) (Node Version Switcher) is a cross-platform `nvm` alternative with the ability to [integrate with VS Code](https://github.com/jasongin/nvs/blob/master/doc/VSCODE.md).

- [nodist](https://github.com/nullivex/nodist) - node.js and npm version manager for the windows folks out there. Inspired by [n](https://github.com/visionmedia/n) and [nodenv](https://github.com/OiNutter/nodenv).

- [nodenv](https://github.com/nodenv/nodenv) - Use nodenv to pick a Node version for your application and guarantee that your development environment matches production. Put nodenv to work with [npm](https://www.npmjs.com/) for painless Node upgrades and bulletproof deployments.

- [n](https://github.com/tj/n) - Node.js version management: no subshells, no profile setup, no convoluted API, just **simple**.

- [n-install](https://github.com/mklement0/n-install) - Installs n, the Node.js version manager, without needing to install Node.js first.

- [Volta](https://github.com/volta-cli/volta#installing-volta) is a new version manager from the LinkedIn team that claims improved speed and cross-platform support.

To install Volta as your version manager (rather than windows-nvm), go to the **Windows Installation** section of their [Getting Started guide](https://docs.volta.sh/guide/getting-started), then download and run their Windows installer, following the setup instructions.

You must ensure that [Developer Mode](https://docs.microsoft.com/en-us/windows/uwp/get-started/enable-your-device-for-development#accessing-settings-for-developers) is enabled on your Windows machine before installing Volta.

To learn more about using Volta to install multiple versions of Node.js on Windows, see the [Volta Docs](https://docs.volta.sh/guide/understanding#managing-your-toolchain).

## Tips

- Give Node.js more RAM: `NODE_OPTIONS="--max-old-space-size=8096" node`
- Use [different npm module versions](https://mariosfakiolas.com/blog/install-multiple-major-versions-of-a-node-module-with-npm/) at the same time.

## Packages (nvm)

Stored under the `nvm root` directory. Defaults to `C:/Program Data/nvm`. I also have this mirrored under `~.nvm/`.

## Packages (npm)

- Local install (default): puts stuff in `./node_modules` of the current package root.
- Global install (with `-g`): puts stuff in `%AppData\npm` or wherever node is installed (see prefix configuration below).
- Install it **locally** if you're going to `require()` it.
- Install it **globally** if you're going to run it on the command line.
- If you need both, then install it in both places, or use `npm link`.

### prefix Configuration

The `prefix` config defaults to the location where node is installed. On most systems, this is `/usr/local`. On Windows, it's `%AppData%\npm`. On Unix systems, it's one level up, since node is typically installed at `{prefix}/bin/node` rather than `{prefix}/node.exe`.

When the `global` flag is set, npm installs things into this prefix. When it is not set, it uses the root of the current package, or the current working directory if not in a package already.

### Node Modules

Packages are dropped into the `node_modules` folder under the `prefix`. When installing locally, this means that you can `require("packagename")` to load its main module, or `require("packagename/lib/path/to/sub/module")` to load other modules.

Global installs on Unix systems go to `{prefix}/lib/node_modules`. Global installs on Windows go to `{prefix}/node_modules` (that is, no `lib` folder.)

Scoped packages are installed the same way, except they are grouped together in a sub-folder of the relevant `node_modules` folder with the name of that scope prefix by the @ symbol, e.g. `npm install @myorg/package` would place the package in `{prefix}/node_modules/@myorg/package`. See [`scope`](https://docs.npmjs.com/cli/v6/using-npm/scope) for more details.

If you wish to `require()` a package, then install it locally.

### Global Installation

If the `global` configuration is set to true, then npm will install packages "globally".

For global installation, packages are installed roughly the same way, but using the folders described above.

## My npm packages

### Global:

Stored under `%AppData%/npm`:

- [cleave.js](https://www.npmjs.com/package/cleave.js) - custom bootstrap input masking (credit card, phone numbers, etc.)

- [dbdocs](https://www.npmjs.com/package/dbdocs) - define and document database structures - CLI for [DBML](https://www.dbml.org/home/) (database markup language).
  
  - Also install the CLI via `npm install -g @dbml/cli`
  - [holistics/dbml](https://github.com/holistics/dbml)
  - [CLI | DBML](https://www.dbml.org/cli/)
  - [dbdiagram.io - Database Relationship Diagrams Design Tool](https://dbdiagram.io/home)

- [devspace](https://devspace.sh/cli/docs/getting-started/installation) - open-source developer tool for Kubernetes

- [expo-cli](https://docs.expo.io/workflow/expo-cli/) - interface between a developer and Expo tools

- [webpack](https://webpack.js.org/) - module bundler for Javascript

- [yarn](https://yarnpkg.com/) - alternative package manager for NodeJS

- [jshint](https://jshint.com/) - Javascript code quality tool (also used by VSCode extension)

- [create-react-app](https://github.com/facebook/create-react-app) - React boilerplate

- [envinfo](https://github.com/tabrindle/envinfo) - Development environment report

- [gulp](https://gruntjs.com/) - Streaming build system

- [fixpack](https://www.npmjs.com/package/fixpack) - Sort package.json

- [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) - Upgrade package.json dependencies

- [prettier](https://prettier.io/) - Code formatter

- [release-it](https://www.npmjs.com/package/release-it) - Automate versioning and package publishing tasks.
  
  - [@release-it/keep-a-changelog](https://github.com/release-it/keep-a-changelog) - Keep a Changelog plugin

- [static-marks](https://darekkay.com/static-marks/) - Convert your plain bookmark files into a static web app.

- [nativefier]()

- [eslint]()

- [github-gists](), [github-gists-cli](), and [gist-backup]()

- [git-labels]() and [github-labels-cli]()


```powershell
npm install -g dbdocs @dbml/cli expo-cli googlemaps devspace jshint webpack-cli yarn create-react-app envinfo gulp cleave.js prettier release-it @release-it/keep-a-changelog fixpack npm-check-updates static-marks

npm audit fix
```

## npm

```bash
npm outdated                 # Show outdated packages
npm ls --depth=0             # List package versions
npm publish --access public  # Publish @scoped package
```

## node-gyp

- Installation on [Windows](https://github.com/nodejs/node-gyp#on-windows)

## npm settings (`~/.npmrc`)

- See [npm config docs](https://docs.npmjs.com/cli/v6/commands/npm-config)

```
//registry.npmjs.org/:_authToken=<auth_token>

editor = code-insiders
browser = "start"

all = true
global = true

init.author.name = "Jimmy Briggs"
init.author.email = "jimbrig2011@outlook.com"
init.author.url = "https://github.com/jimbrig"
init-license=MIT

sign-git-commit = true
```

## yarn settings

```
<empty for now>
```

## Semantic Versioning

- Major.Minor.Patch
- Caret (`^`): `3.^.^`
- Tilde (`~`): `3.9.~`

## n - version manager

- [n](https://github.com/tj/n)
- [n-install](https://github.com/mklement0/n-install)

Install:

```
curl -L https://git.io/n-install | bash
```

Commands:

```bash
n                    # Output versions installed
n <version>          # Install or activate node <version>
n rm <version ...>   # Remove the given version(s)
n prune              # Remove all versions except the current version
```

## pm2

```bash
pm2 start apps.yml                  # load all apps defined in apps.yml
pm2 save                            # save process list
pm2 reload apps.yml [--update-env]  # reload all apps

pm2 list              # list all processes
pm2 monit             # monitor all processes
pm2 describe 0        # display all information about a specific process

pm2 logs [app]        # display logs
pm2 reset [process]   # reset meta data (restarted time...)

pm2 install typescript   # Add Typescript support
```

- [Update pm2](http://pm2.keymetrics.io/docs/usage/update-pm2/)

```bash
pm2 save
npm install -g pm2
pm2 update
```

- Enable [logrotate](https://github.com/keymetrics/pm2-logrotate)

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 1M
pm2 set pm2-logrotate:retain 50
pm2 set pm2-logrotate:rotateInterval "0 1 1 1 *"
pm2 set pm2-logrotate:workerInterval 3600
```

## create-react-app

- [Advanced Configuration](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#advanced-configuration)
- `.env` file:

```
PORT=12345
GENERATE_SOURCEMAP=false
PUBLIC_URL=.               # Build as a local project/file
```
