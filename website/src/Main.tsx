// TODO: Try using react-global instead. See https://github.com/palantir/tslint/issues/589.
/* tslint:disable:no-unused-variable */
import * as React from "react"
/* tslint:enable:no-unused-variable */
import * as ReactDOM from "react-dom"
import FilmFilterApp from "./FilmFilterApp"

export interface ShowingData {
  "start": string
  "showingUrl": string
  "version": Array<string>
  "theaterUrl": string
  "movieUrl": string
}

// TODO: Load the data using an AJAX call instead of embedding it the bundle. React Refetch might be the rigth tool: https://engineering.heroku.com/blogs/2015-12-16-react-refetch/
const showings: Array<ShowingData> = require("../../scraper/output/showings.json")

ReactDOM.render(
  <FilmFilterApp showings={showings}/>,
  document.getElementById("filmFilterApp")
)
