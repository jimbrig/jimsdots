library(rsconnect) # pak::pak("rsconnect")
library(config)

# js <- jsonlite::read_json("R/jimbrig2011_shiny_client_secret.json")
conf <- config::get("shinyappsio", file = "~/.config/R/config.yml")

purrr::walk(names(conf), function(account) {
  config <- conf[[account]]
  command <- config$`setup-command`
  eval(parse(text = command))
})

# check results in Tools > Global Settings > Publishing to see list of accounts.
