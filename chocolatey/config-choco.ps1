refreshenv

# configure chocolatey
choco upgrade chocolatey choco-cleaner choco-package-list-backup -y
choco feature enable -n allowGlobalConfirmation
choco config set cacheLocation $env:TEMP
choco feature enable -n logEnvironmentValues
choco feature enable -n virusCheck
choco feature enable -n useRememberedArgumentsForUpgrades
choco feature enable -n removePackageInformationOnUninstall