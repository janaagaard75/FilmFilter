// TODO: Try using react-global instead. See https://github.com/palantir/tslint/issues/589.
/* tslint:disable:no-unused-variable */
import * as React from "react"
/* tslint:enable:no-unused-variable */
import * as ReactDOM from "react-dom"
import FilmFilterApp from "./FilmFilterApp"

export interface ShowingData {
  "start": string
  "showingUrl": string
  "version": string
  "theaterUrl": string
  "movieUrl": string
}

// TODO: Load the data using an AJAX call instead of embedding it the bundle.
const showings: Array<ShowingData> = require("../../scraper/output/showings-20160508212716.json")

ReactDOM.render(
  <FilmFilterApp showings={showings}/>,
  document.getElementById("filmFilterApp")
)
