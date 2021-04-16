
#  ------------------------------------------------------------------------
#
# Title : .Rprofile - Jimmy Briggs
#    By : Jimmy Briggs
#  Date : 2021-04-13
#
#  ------------------------------------------------------------------------

# rstudioapi::askForSecret("psql")

# default options:
options(
  repos = c(CRAN = "https://cran.rstudio.com"),
  editor = "notepad",
  pager = "internal",
  useFancyQuotes = FALSE,
  tab.width = 2,
  browserNLdisabled = TRUE,
  max.print = 200,
  shiny.launch.browser = TRUE,
  Ncpus = 4L, # parallel package installations (Sys.getenv("NUMBER_OF_PROCESSORS")` or parallel::detectCores())
  scipen = 999, # Remove Scientific Notation
  languageserver.snippet_support = FALSE, # vscode language server
  languageserver.server_capabilities = list(documentHighlightProvider = FALSE),
  remotes.install.args = "--no-multiarch", # avoid i386 arch installations/compilations:
  devtools.install.args = "--no-multiarch",
  usethis.full_name = "Jimmy Briggs", # usethis
  usethis.protocol = "ssh",
  usethis.description = list(
    `Authors@R` = 'person("Jimmy", "Briggs",
                         email = "jimmy.briggs@tychobra.com",
                         role = c("aut", "cre"),
                         comment = c(ORCID = "0000-0002-7489-8787"))',
    License = "MIT + file LICENSE",
    Language =  "en-US"
  ),
  orcid = "0000-0002-7489-8787",
  blogdown.author = "Jimmy Briggs", # blogdown - https://bookdown.org/yihui/blogdown/global-options.html
  blogdown.ext = ".Rmd",
  blogdown.insertimage.usebaseurl = TRUE
)

# turn on completion of installed package names
utils::rc.settings(ipck = TRUE)

# various significant PATHs:
options(
  tychobra_dir = path.expand("~/Dev/tychobra"),
  shrtcts.path = path.expand("~/.R/.shrtcts.yml"),
  projects.dir = path.expand("~/Dev"),
  gargle_oauth_email = "jimmy.briggs@tychobra.com",
  gargle_oauth_cache = path.expand("~/.R/gargle/gargle-oauth")
)

# addinit options
source(path.expand("~/.R/addinit_options.R"))

# history
histpath <- path.expand("~/.R/.Rhistory")
Sys.setenv("R_HISTFILE" = histpath)
.Last <- function() if (interactive()) try(savehistory(histpath))

# error tracing
if ('rlang' %in% loadedNamespaces()) options(error = rlang::entrace)

# package installation error callback from 'pak'
if (interactive() && getRversion() >= "4.0.0") {
  globalCallingHandlers(
    packageNotFoundError = function(err) {
      try(pak::handle_package_not_found(err))
    }
  )
}

# prompt
setHook("rstudio.sessionInit", function(newSession) {
  if (newSession)
    message("RStudio Version: ", rstudioapi::getVersion())
}, action = "append")

if (interactive() && curl::has_internet()) invisible(installr::check.for.updates.R(GUI = FALSE))

# r-cli
if (nzchar(Sys.getenv("R_CMD")) && require("rcli", quietly = TRUE)) rcli::r_cmd_call()

# shortcuts
if (interactive() && requireNamespace("shrtcts", quietly = TRUE)) {
  shrtcts::add_rstudio_shortcuts(
    path = getOption("shrtcts.path"),
    set_keyboard_shortcuts = TRUE
  )
}

# load secret environment variables/tokens
local({
  if (!file.exists(path.expand("~/.R/secrets.Renviron"))) {
    secrets <- yaml::read_yaml(path.expand("~/.R/config.yml"))
    if (!require(gistr)) {
      suppressMessages(
        utils::download.file(secrets$url, secrets$local_path, quiet = TRUE)
      )
    }
  }
})

readRenviron(path.expand("~/.R/secrets.Renviron"))

# attach extra helper functions
.rprofile <- new.env()
sys.source(path.expand("~/.R/rprofile_extras.R"), .rprofile)
attach(.rprofile)

# detach
detach_all_attached()

# clear env
rm(list = ls())

# autoload magrittr PIPE
autoload("%>%", "magrittr")



# deprecated --------------------------------------------------------------

# if (requireNamespace("jetpack", quietly = TRUE)) {
#   jetpack::load()
# } else {
#   message("Install Jetpack to use a virtual environment for this project")
# }

# Set GH PAT
# local({
#   require("credentials")
#   credentials::set_github_pat()
# })

# set locale
# invisible(Sys.setlocale("LC_ALL", "English_United States.1252"))

# parallel::detectCores()
# benchmarkme::get_ram()
# benchmarkme::get_cpu()

# default to launching shiny apps in external browser
# if (requireNamespace("rstudioapi", quietly = TRUE) && rstudioapi::hasFun("viewer")) {
#   options(shiny.launch.browser = .rs.invokeShinyWindowExternal)
# }

# shrtcts::list_shortcuts()
# if (!requireNamespace("BiocManager", quietly = TRUE)) install.packages("BiocManager") BiocManager::install(version = "3.12")

# else {
# gistr::gist_save(secrets$local_path, secrets$ _gist_path)
# }

# prompt::set_prompt(function(...){
#   paste0(
#     "[", prompt::git_branch(), prompt::git_dirty(), prompt::git_arrows(), "] ",
#     prompt::prompt_memuse()
#   )
# })

# options(
#   kickstarteR.setup = list(
#     packages = c('dplyr', 'purrr', 'lubridate', 'stringr', 'rstudioapi', 'pak', 'pacman', 'devtools'),
#     sets = list(
#       shiny = c('shiny', 'shinydashboard', 'shinyWidgets', 'DT', 'highcharter', 'shinyjs'),
#       tidy = c('dplyr', 'reshape2'),
#       excel = c('readxl', 'writexl')
#     )
#   )
# )
