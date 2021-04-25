
#  ------------------------------------------------------------------------
#
# Title : Bootstrap/Install R-Libraries
#    By : Jimmy Briggs
#  Date : 2021-01-03
#
#  ------------------------------------------------------------------------

pak::pak_setup()
pak::pak_setup("copy")
pak::pak_update()
pak::pak_sitrep()

# libraries ---------------------------------------------------------------
library(fs)
library(magrittr)
library(purrr)
library(pak)


# functions ---------------------------------------------------------------

#' @keywords internal
#' @noRd
get_package_details <- function(pkg_name) {
  pkg_d <- packageDescription(pkg_name)
  is.cran <- !is.null(pkg_d$Repository) && pkg_d$Repository ==
    "CRAN"
  is.github <- !is.null(pkg_d$GithubRepo)
  is.base <- !is.null(pkg_d$Priority) && pkg_d$Priority ==
    "base"
  if (!is.cran & !is.github & !is.base)
    stop("CRAN or GitHub info for ", pkg_name, " not found. Other packages repos are not supported.",
         call. = FALSE)
  if (is.cran)
    return(pkg_d[c("Package", "Repository", "Version")])
  if (is.github)
    return(pkg_d[c("Package", "GithubUsername",
                   "GithubRepo", "GithubRef", "GithubSHA1")])
}

#' @keywords internal
#' @noRd
get_package_details <- function(pkg_name) {
  pkg_d <- packageDescription(pkg_name)
  is.cran <- !is.null(pkg_d$Repository) && pkg_d$Repository ==
    "CRAN"
  is.github <- !is.null(pkg_d$GithubRepo)
  is.base <- !is.null(pkg_d$Priority) && pkg_d$Priority ==
    "base"
  if (!is.cran & !is.github & !is.base)
    stop("CRAN or GitHub info for ", pkg_name, " not found. Other packages repos are not supported.",
         call. = FALSE)
  if (is.cran)
    return(pkg_d[c("Package", "Repository", "Version")])
  if (is.github)
    return(pkg_d[c("Package", "GithubUsername",
                   "GithubRepo", "GithubRef", "GithubSHA1")])
}

get_packages <- function(path = .libPaths()[1],
                         ignores = c("_cache"),
                         known_gh_pkgs = NULL,
                         known_bio_pkgs = NULL,
                         personal_pkgs = NULL) {

  lib <- path
  user_pkgs <- fs::dir_ls(lib, type = "directory") %>%
    basename() %>%
    setdiff(ignores)

  pkgmeta <- purrr::possibly(get_package_details, otherwise = NULL, quiet = TRUE)

  user_pkgs_meta <- purrr::map(user_pkgs, pkgmeta) %>%
    purrr::set_names(user_pkgs) %>%
    purrr::compact()

  df <- dplyr::bind_rows(user_pkgs_meta) %>%
    dplyr::mutate(
      Repository = ifelse(is.na(Repository), "Github", Repository),
      install_cmd = ifelse(
        Repository == "CRAN",
        paste0("remotes::install_version(", shQuote(Package), ", version = ", shQuote(Version), ")"),
        paste0("remotes::install_github(", shQuote(paste0(GithubUsername, "/", Package)), ", ref = ", shQuote(GithubSHA1), ")")
      ),
      pkg_ref = ifelse(
        Repository == "CRAN", shQuote(Package), shQuote(paste0(GithubUsername, "/", Package))
      ),
      pak_install_cmd = paste0("pak::pak(", pkg_ref, ")")
    )

  installs <- df$pak_install_cmd
  pkgs <- df$pkg_ref

  purrr::walk2(installs, pkgs, function(x, y) {
    cli::cli_alert_info(text = paste0(paste0("Installing ", y, "...")))
    eval(parse(text = x))
  })
}

# specify libdirs ---------------------------------------------------------
libs <- .libPaths()
user_lib <- libs[1]

user_pkgs <- fs::dir_ls(user_lib, type = "directory") %>% basename() %>% setdiff("_cache")

pkgmeta <- purrr::possibly(packageDescription, otherwise = NULL, quiet = TRUE)

user_pkgs_meta <- purrr::map(user_pkgs, pkgmeta) %>%
  purrr::set_names(user_pkgs) %>%
  purrr::compact()

