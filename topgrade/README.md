# Topgrade

- [Link to Github Repo](https://github.com/r-darwish/topgrade)

![image](https://user-images.githubusercontent.com/32652297/116499420-1cf18980-a87a-11eb-818c-97676e745e41.png)

Keeping your system up to date mostly involves invoking more than a single package manager. This
usually results in big shell one-liners saved in your shell history. Topgrade tries to solve this
problem by detecting which tools you use and run their appropriate package managers.

## Installation

Can either use `cargo install` or use the compiled binaries from the release
page on Github. The compiled binaries contain a self-upgrading feature.

Install via `scoop` on windows:

```powershell
scoop install topgrade
```

## Usage

Just run `topgrade`. See [the wiki](https://github.com/r-darwish/topgrade/wiki/Step-list) for the list of things Topgrade supports

## Customization

- See my configuration file [topgrade.toml](./topgrade.toml)

or

- See [config.example.toml](./config.example.toml) for an example configuration file.

### Configuration path

The configuration should be placed in the following paths depending by the operating system:

- **macOS** - `~/.config/topgrade.toml`
- **Windows** - `%APPDATA%/topgrade.toml`
- **Other Unix systems** - `~/.config/topgrade.toml`

## Remote execution

You can specify a key called `remote_topgrades` in the configuration file. This key should contain a
list of hostnames that have topgrade installed on them. Topgrade will execute Topgrades on these
remote hosts. To limit the execution only to specific hosts use the `--remote-host-limit` parameter.
