# addinit
options(
  addinit = list(
    author = "Jimmy Briggs",
    project = list(
      folders = list(
        default = c(
          "R",
          "inst",
          "man",
          "data-raw",
          "data",
          "tests",
          "vignettes",
          "cache",
          "admin",
          "config",
          "docs",
          "src",
          "inst/app",
          "inst/docs",
          "inst/scripts"
        ),
        selected = c("R", "inst", "man", "data-raw", "data", "tests", "vignettes")
      ),
      packages = list(
        default = rownames(utils::installed.packages()),
        selected = c(
          "devtools",
          "usethis",
          "knitr",
          "roxygen2",
          "testthat",
          "dplyr",
          "magrittr",
          "tidyr",
          "purrr",
          "lubridate",
          "shiny",
          "shinydashboard"
        )
      ),
      config = TRUE,
      source_funs = FALSE
    ),

    shiny_app = list(
      folders = list(
        default = c(
          "R",
          "man",
          "data-raw",
          "data",
          "inst/app/www",
          "tests",
          "vignettes",
          "cache",
          "admin",
          "config",
          "docs",
          "src",
          "inst/docs",
          "inst/scripts"
        ),
        selected = c(
          "R",
          "inst/app/www",
          "man",
          "data-raw",
          "data",
          "tests",
          "vignettes"
        )
      ),
      packages = list(
        default = rownames(utils::installed.packages()),
        selected = c(
          "devtools",
          "usethis",
          "knitr",
          "roxygen2",
          "testthat",
          "dplyr",
          "magrittr",
          "tidyr",
          "purrr",
          "lubridate",
          "shiny",
          "shinydashboard"
        )
      ),
      config = TRUE,
      source_funs = TRUE
    )
  )
)
