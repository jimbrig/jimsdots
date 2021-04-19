# Google Cloud SDK: `gcloud`

## Installation - Windows

- Download from executable using the [Cloud SDK installer (google.com)](https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe).
- Download via `powershell` with the following:

```powershell
(New-Object Net.WebClient).DownloadFile("https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe", "$env:Temp\GoogleCloudSDKInstaller.exe")

& $env:Temp\GoogleCloudSDKInstaller.exe      
```

## Installation Linux

- Ensure have a recent version of Python installed
- Download `tar.gz` directly or using `curl`: [link](https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-336.0.0-linux-x86_64.tar.gz)
- Untar and run install shell script
- Run `gcloud init`

```bash
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-336.0.0-linux-x86_64.tar.gz

tar -xvzf google-cloud-sdk-332.0.0-linux-x86_64.tar.gz

./google-cloud-sdk/install.sh

./google-cloud-sdk/bin/gcloud init
```

## Installation Linux - Alternative Method

First, make sure your system repository is updated. Then run the following command to add the CA and GNU Privacy Guard to your system. The command requires root privileges; make sure you’re the root user.

```
sudo apt update
sudo apt install apt-transport-https ca-certificates gnupg
```
After adding the CA-certificate to your Ubuntu system, you can now run the curl command given below to add the GPG key from the system’s Google Cloud repository.

```
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
```
Now, add a personal package repository inside the system. You may run the following echo command on your terminal shell to add the repository.

```
echo "deb https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
```
Finally, you can now run the following aptitude command given below to install the SDK on your Ubuntu Linux system. The command will install a few PHP modules, MySQL library, java, and google cloud SDK files on your filesystem.

```
sudo apt update
sudo apt install google-cloud-sdk
```

### Requirements

Cloud SDK requires Python; supported versions are Python 3 (preferred, 3.5 to 3.8) and Python 2 (2.7.9 or higher).

The installer will install all necessary dependencies, including the needed Python version. While Cloud SDK currently uses Python 3 by default, you can use an existing Python installation if necessary by **unchecking** the option to Install Bundled Python.

### Screen Reader Mode

If you'd like to enable screen reader mode, select the **Turn on screen reader mode** option for a more streamlined screen reader experience. To read more about the Cloud SDK screen reader experience, refer to the [Accessibility features guide](https://cloud.google.com/sdk/docs/enabling-accessibility-features).

## Initial Setup:

- Initialize: `gcloud init`

- Authenticate: `gcloud auth login`

- Setup `docker` configuration: `gcloud auth configure-docker`

- Update Components: `gcloud components update`

- Configure Configurations: `gcloud config configuration <command>`


```powershell
### initialize and authenticate account###
gcloud init
gcloud auth login

### update components ###
gcloud components update

### configurations ###
gcloud config configurations list <configuration_name>

# create new
gcloud config configurations create <configuration_name>

# activate/switch
gcloud config configurations activate <configuration_name>

# describe
gcloud config configurations describe <configuration_name>

# delete
gcloud config configurations delete <configuration_name>

# set various configs within a configuration
gcloud config set project <project_id>
gcloud config set compute/zone <compute_zone_id>
gcloud config set disable_prompts true # for scripting
```

## Configurations:

`gcloud` properties can be stored in named configurations, which are collections of key-value pairs that influence the behavior of `gcloud`.

Named configurations are intended to be an advanced feature, and you can probably ignore them entirely if you only work with one project.

Properties that are commonly stored in configurations include:
  - Google Compute Engine zone: `compute/zone <zone>`
  - verbosity level: `gcloud config set verbosity <true/false>`
  - Project ID: `gcloud config set project <project_id>`
  - Active User or Service Account: `gcloud config set account <authorized account>` 

***

- Configurations allow you to define and enable these and other settings together as a group.

- Configuration data is typically stored in `$HOME/.config/gcloud`
  - You can override this location by setting the environment variable `CLOUDSDK_CONFIG`.
  - This can be useful if `$HOME` points to a read only filesystem or you are running commands inside docker.
- Configurations are especially useful if you:
  - Work with multiple projects. You can create a separate configuration for each project.
  - Use multiple accounts, for example, a user account and a service account, etc.
  - Perform generally orthogonal tasks like:
    - Work on an `appengine app` in project `foo`
    - Administer a Google Compute Engine cluster in zone `user-central-1a`
    - Manage the network configurations for region `asia-east-1`
    - etc.
- Property information stored in named configurations are readable by all `gcloud` commands and may be modified by:
  - `gcloud config set` 
  - `gcloud config unset`

For a listing of all possible configs you can setup run `gcloud topic configurations` or `gcloud config set --help`.

***

### Creating Configurations

Named configurations may be defined by users or built into gcloud.

  - User defined configurations have lowercase names.
  - Additionally there is a builtin configuration named NONE that has no properties set.

The easiest way to create a brand new configuration is by running: `gcloud init`

This will guide you through setting up your first named configuration, creating a new named configuration, or reinitializing an existing named configuration. 

*Note: reinitializing an existing configuration will remove all its existing properties!*

You can create a new empty configuration with: `gcloud config configurations create <config_name>`

To display the path of the active configuration, run: `gcloud info --format="get(config.paths.active_config_path)"`

Note that changes to your OS login, Google Cloud Platform account or project could change the path.

You can view and change the properties of your active configuration using the following commands:
  - `gcloud config list`
  - `gcloud config set`

Additionally, commands under gcloud config configurations allow you to to `list`, `activate`, `describe`, and `delete configurations` that may or may not be active.

You can activate a configuration for a single gcloud invocation using flag, `--configuration my-config`, or environment variable: `CLOUDSDK_ACTIVE_CONFIG_NAME=<my-config>`.

```powershell
PS C:\Users\jimbrig> gcloud config configurations list
NAME: default
IS_ACTIVE: False
ACCOUNT: jimbrig2011@gmail.com
PROJECT:
COMPUTE_DEFAULT_ZONE:
COMPUTE_DEFAULT_REGION:

NAME: powwater
IS_ACTIVE: True
ACCOUNT: jimmy.briggs@tychobra.com
PROJECT: powwater
COMPUTE_DEFAULT_ZONE: asia-east1-b
COMPUTE_DEFAULT_REGION: asia-east1

NAME: tychobra
IS_ACTIVE: False
ACCOUNT: jimmy.briggs@tychobra.com
PROJECT: postgres-db-189513
COMPUTE_DEFAULT_ZONE: us-east1-b
COMPUTE_DEFAULT_REGION: us-east1
PS C:\Users\jimbrig> gcloud config configurations
```

- Set a default project:

```powershell
gcloud config set project shiny-cloudrun
```

- Set default zone:

```powershell
gcloud config set compute/zone us-east1-b
```

- Set Default Region:

```powershell
gcloud config set compute/region us-east1
```

### Projects

```powershell
# list projects
gcloud projects list
PROJECT_ID: defaultproject-jimmybriggs
NAME: defaultproject-jimmybriggs
PROJECT_NUMBER: 1087294385421

PROJECT_ID: powwater-test
NAME: powwater-test
PROJECT_NUMBER: 71186973052

PROJECT_ID: quickstart-1609203323943
NAME: Quickstart
PROJECT_NUMBER: 951339186550

PROJECT_ID: shiny-cloudrun
NAME: shiny-cloudrun
PROJECT_NUMBER: 833216447103

PROJECT_ID: shiny-terraform
NAME: shiny-terraform
PROJECT_NUMBER: 434778347086
```

### Set Configuration's Project:

To set the `project` property in the core section, run:

```powershell
gcloud config set project myProject
```

### Accounts

To list authenticated accounts:

```powershell
gcloud auth list
Credentialed Accounts

ACTIVE: *
ACCOUNT: jimbrig2011@gmail.com

ACTIVE:
ACCOUNT: jimmy.briggs@tychobra.com

To set the active account, run:
    $ gcloud config set account `ACCOUNT`
```

### Set Configuration's Compute Zone:

To set the `zone` property in the `compute` section, run:

```powershell
gcloud config set compute/zone asia-east1-b
```

### Setup for scripting:

To disable prompting for scripting, run:

```powershell
gcloud config set disable_prompts true
```

### Set Configuration's Proxy

To set a proxy with the appropriate type, and specify the address and port on which to reach it, run:

```powershell
gcloud config set proxy/type http
gcloud config set proxy/address 1.234.56.78
gcloud config set proxy/port 8080
```

For a full list of accepted values, see the Cloud SDK properties page: https://cloud.google.com/sdk/docs/properties.

### Cloud Run Configs

- **cluster**: ID of the cluster or fully qualified identifier for the cluster
- **cluster_location**: Zone or region in which the cluster is located.
- **platform**: Target platform for running commands.
- **region**: Default region to use when working with Cloud Run resources.

  - When a `--region` flag is required but not provided, the command will fall back to this value, if set.

To display the path of the active configuration, run:

        $ gcloud info --format="get(config.paths.active_config_path)"

***

Reference:

- [Installing Google Cloud SDK  | Cloud SDK Documentation](https://cloud.google.com/sdk/docs/install)
- [How To Install and Configure Google Cloud SDK on Linux Desktop (ubuntupit.com)](https://www.ubuntupit.com/how-to-install-and-configure-google-cloud-sdk-on-linux-desktop/)

