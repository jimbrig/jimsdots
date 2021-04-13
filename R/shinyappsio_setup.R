library(rsconnect) # pak::pak("rsconnect")
library(config)

# js <- jsonlite::read_json("R/jimbrig2011_shiny_client_secret.json")
conf <- config::get("shinyappsio", file = "R/config.yml")

rsconnect::setAccountInfo(name = 'jimsdeployments',
                          token = conf$token,
                          secret = conf$secret)
