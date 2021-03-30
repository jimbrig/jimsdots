open_repo <- jimstools::open_gh_repo

editrprof <- function() {
  file.edit("~/.R/.Rprofile")
}

editrenv <- function() {
  file.edit("~/.R/.Renviron")
}

editextras <- function() {
  file.edit("~/.R/rprofile_extras.R")
}

editsecrets <- function() {
  file.edit("~/.R/secrets.Renviron")
}

editshortcuts <- function() {
  file.edit(getOption("shrtcts.path"))
}

reload_rstudio <- function() {
  if (rstudioapi::isAvailable(version_needed = "1.2.1261")) {
    invisible(rstudioapi::executeCommand("reloadUi", quiet = TRUE))
  }
}

reload_r <- function() {
  if (rstudioapi::isAvailable(version_needed = "1.2.1261")) {
    invisible(rstudioapi::executeCommand("restartR",
                                         quiet = TRUE))
  }
}

detach_all_attached <- function() {
  all_attached <-
    paste("package:", names(utils::sessionInfo()$otherPkgs),
          sep = "")

  try({
    suppressWarnings(invisible(
      lapply(
        all_attached,
        detach,
        character.only = TRUE,
        unload = TRUE
      )
    ))
  }, silent = TRUE)

}

explorer <- function(path = getwd()) {
  y <- gsub("/", "\\\\", path)
  suppressWarnings({
    invisible(shell(paste0("explorer ", y), intern = TRUE))
  })
}

view_path <- function() {
  writeLines(strsplit(Sys.getenv("PATH"), ";")[[1]])
}

search_gh <- function(s,
                      type = "all",
                      language = NULL,
                      topic = NULL,
                      user = NULL,
                      org = NULL) {
  types <- c(
    "all",
    "repo",
    "code",
    "commit",
    "issue",
    "discussion",
    "package",
    "marketplace",
    "topic",
    "wiki",
    "user"
  )

  match.arg(type, types)
  type_query <-
    ifelse(type == "all", "&ref=opensearch", paste0("&type=", type))
  base_url <- "https://github.com/search?q="
  lang_query <-
    ifelse(is.null(language), "", paste0("+language%3A", language))
  topic_query <-
    ifelse(is.null(topic), "", paste0("+topic%3A", topic))
  user_query <- ifelse(is.null(user), "", paste0("+user%3A", user))
  org_query <- ifelse(is.null(org), "", paste0("org%3A", org))
  query <-
    paste0(s,
           " ",
           lang_query,
           topic_query,
           user_query,
           org_query,
           type_query)

  url <- paste0(base_url, query)

  utils::browseURL(url)

  invisible(return(url))

}

search_ghr <- function(s, ...) {
  search_gh(s, language = "R")
}

search_tychobra <- function(s, ...) {
  search_gh(s, org = "tychobra")
}

search_cran <- function(s, ...) {
  browseURL(paste0("https://github.com/cran/", s))
}

sandbox <- function(rstudio = TRUE) {
  path <- fs::path_home("Dev/sandbox")
  if (rstudio) rstudioapi::filesPaneNavigate("~/Dev/sandbox") else explorer(path)
}
