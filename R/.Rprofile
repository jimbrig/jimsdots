
# Set GH PAT
# local({
#   require("credentials")
#   credentials::set_github_pat()
# })

# set locale
# invisible(Sys.setlocale("LC_ALL", "English_United States.1252"))

options(
  repos = c(CRAN = "https://cran.rstudio.com"),
  useFancyQuotes = FALSE,
  browserNLdisabled = TRUE,
  max.print = 200,
  languageserver.snippet_support = FALSE,
  languageserver.server_capabilities = list(
    documentHighlightProvider = FALSE
  )
)

options("tychobra_dir" = fs::path("~/Dev/tychobra"))

# shortcuts
options(shrtcts.path = "~/.R/.shrtcts.yml")

if (interactive() && requireNamespace("shrtcts", quietly = TRUE)) {
  shrtcts::add_rstudio_shortcuts(
    path = getOption("shrtcts.path"),
    set_keyboard_shortcuts = TRUE
  )
}

# shrtcts::list_shortcuts()

# if (!requireNamespace("BiocManager", quietly = TRUE)) install.packages("BiocManager") BiocManager::install(version = "3.12")

options(
  gargle_oauth_email = "jimmy.briggs@tychobra.com",
  gargle_oauth_cache = "~/.R/gargle/gargle-oauth"
)

# Set Global CRAN Mirror
# options(repos = c(CRAN = 'https://cloud.r-project.org')) # https://cran.rstudio.com

# install packages in parallel via 'Ncpus' argument
# detect via `Sys.getenv("NUMBER_OF_PROCESSORS")` or parallel::detectCores()
options(Ncpus = 4L)

# parallel::detectCores()
# benchmarkme::get_ram()
# benchmarkme::get_cpu()

# Remove Scientific Notation
options(scipen = 999)

# Set max print
# options(max.print = 100)

# set default browser (see ?browseURL)
# options(browser = "C:/Program Files/Firefox Nightly/firefox.exe")
options("shiny.launch.browser" = TRUE)

# set default editor to notepad
options(editor = "notepad")

# set default pager to internal
options(pager = "internal")

# default to launching shiny apps in external browser
# if (requireNamespace("rstudioapi", quietly = TRUE) && rstudioapi::hasFun("viewer")) {
#   options(shiny.launch.browser = .rs.invokeShinyWindowExternal)
# }

# rcli
if (nzchar(Sys.getenv("R_CMD")) && require("rcli", quietly = TRUE)) rcli::r_cmd_call()

# Update R Prompt
setHook("rstudio.sessionInit", function(newSession) {
  if (newSession)
    message("RStudio Version: ", rstudioapi::getVersion())
}, action = "append")

if (interactive() && curl::has_internet()) invisible(installr::check.for.updates.R(GUI = FALSE))

# error tracing
if ('rlang' %in% loadedNamespaces()) options(error = rlang::entrace)

# turn on completion of installed package names
utils::rc.settings(ipck = TRUE)

# Secret Environment Variables/Tokens
local({
  if (!file.exists("~/.R/secrets.Renviron")) {
    secrets <- yaml::read_yaml("~/.R/config.yml")
    if (!require(gistr)) {
      suppressMessages(
        utils::download.file(secrets$url, secrets$local_path, quiet = TRUE)
      )
    } # else {
      # gistr::gist_save(secrets$local_path, secrets$ _gist_path)
    # }
  }
})

readRenviron("~/.R/secrets.Renviron")

# ORCID
options("orcid" = "0000-0002-7489-8787")

# Projects Directory
options("projects.dir" = tools::file_path_as_absolute("~/Dev"))

# usethis / devtools
options(
  usethis.full_name = "Jimmy Briggs",
  usethis.protocol = "ssh",
  usethis.description = list(
    `Authors@R` = 'person(
      "Jimmy", "Briggs",
      email = "jimbrig2011@outlook.com",
      role = c("aut", "cre"),
      comment = c(ORCID = "0000-0002-7489-8787"
    ))',
    License = "MIT + file LICENSE",
    Language =  "en-US"
  )
)

# blogdown - https://bookdown.org/yihui/blogdown/global-options.html
options(
  blogdown.author = "Jimmy Briggs",
  blogdown.ext = ".Rmd",
  blogdown.insertimage.usebaseurl = TRUE
)

# addinit
options(
  "addinit" = list(
    author = "Jimmy Briggs",
    project = list(
      folders = list(
        default = c("R", "inst", "man", "data-raw", "data", "tests", "vignettes", "cache", "admin", "config", "docs", "src", "inst/app", "inst/docs", "inst/scripts"),
        selected = c("R", "inst", "man", "data-raw", "data", "tests", "vignettes")
      ),
      packages = list(
        default = rownames(utils::installed.packages()),
        selected = c( "devtools", "usethis", "knitr", "roxygen2", "testthat", "dplyr", "magrittr", "tidyr", "purrr", "lubridate", "shiny", "shinydashboard")
      ),
      config = TRUE,
      source_funs = FALSE
    ),
    shiny_app = list(
      folders = list(
        default = c("R", "man", "data-raw", "data", "inst/app/www", "tests", "vignettes", "cache", "admin", "config", "docs", "src", "inst/docs", "inst/scripts"),
        selected = c("R", "inst/app/www", "man", "data-raw", "data", "tests", "vignettes")
      ),
      packages = list(
        default = rownames(utils::installed.packages()),
        selected = c( "devtools", "usethis", "knitr", "roxygen2", "testthat", "dplyr", "magrittr", "tidyr", "purrr", "lubridate", "shiny", "shinydashboard")
      ),
      config = TRUE,
      source_funs = TRUE
    )
  )
)

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

# clear env
rm(list = ls())

# load pipe from magrittr
# local({
#   `%>%` <- magrittr::`%>%`
# })

# attach extra helper functions
.env <- new.env()
sys.source("~/.R/rprofile_extras.R", .env)
attach(.env)

# end message

# cleanup
# detach all attached
detach_all_attached()

autoload("%>%", "magrittr")
