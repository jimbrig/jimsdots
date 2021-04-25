library(pak)
library(pkgdepends)
library(purrr)
library(dplyr)

libs <- .libPaths()
user_lib <- libs[1]

user_pkgs <- fs::dir_ls(user_lib, type = "directory") %>% basename() %>% setdiff("_cache")

pkgs <- pkgdepends::lib_status("C:/Users/jimbrig/.R/lib/4.0", packages = user_pkgs)
pkgs_cran <- pkgs %>% filter(repository == "CRAN", !is.na(package)) %>% pull(package)
pkgs_gh <- pkgs %>% filter(remotetype == "github", !is.na(remotepkgref)) %>% pull(remotepkgref)

purrr::walk(pkgs_cran, pak::pak, ask = FALSE, upgrade = TRUE)
purrr::walk(pkgs_gh, pak::pak, ask = FALSE, upgrade = TRUE)

# pkg_config_file <- fs::path(dirname(user_lib), "pkgs.yml")
# pkgs_yml <- yaml::read_yaml(pkg_config_file)

# miniCRAN::makeRepo(pkgs_cran, path = "~/.R/lib/jimbrig")
# purrr::walk(pkgs_gh, ~ miniCRAN::addPackageListingGithub(repo = .x))

# library(drat)
# options(dratBranch = "docs")   # to default to using docs/ as we set up
# "~/.R/lib/drat"
# options(dratRepo = "~/Dev/jimbrig/drat")
# drat::addRepo("jimbrig")
# insertPackage(file=c("quacking/quacking_1.2.3.tar.gz",
#                      "quacking/quacking_1.2.3.zip"),
#               repodir="drat/")

# drat::updateRepo()
# drat::addRepo("eddelbuettel")

