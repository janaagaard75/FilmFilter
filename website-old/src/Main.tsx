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
//const showings: Array<ShowingData> = require("../../scraper/output/showings.json")

const showings: Array<ShowingData> = [
  {
    "start": "2016-06-15T16:15:00",
    "showingUrl": "http://www.kino.dk/ticketflow/1805283",
    "version": ["2D"],
    "theaterUrl": "http://www.kino.dk/biografer/valby-kino",
    "movieUrl": "http://www.kino.dk/film/w/wa/warcraft"
  },
  {
    "start": "2016-05-11T10:00:00",
    "showingUrl": "http://www.kino.dk/ticketflow/1800159",
    "version": ["2D", "eng. tale"],
    "theaterUrl": "http://www.kino.dk/biografer/nordisk-film-biografer-palads",
    "movieUrl": "http://www.kino.dk/film/z/zo/zootropolis"
  }
]

// function removeFileName(pathname: string): string {
//   const path = pathname.split("/").slice(0, -1).join("/")
//   return path
// }

// const showingsUrl = window.location.protocol + "//" + window.location.host + removeFileName(window.location.pathname) + "showings.jsonl"

// const request = new XMLHttpRequest();
// request.onreadystatechange = () => {
//   if (request.readyState === XMLHttpRequest.DONE) {
//     console.log(request.responseText.substr(0, 100))
//   }
// }
// request.open("GET", showingsUrl, true)
// request.send()

ReactDOM.render(
  <FilmFilterApp showings={showings}/>,
  document.getElementById("filmFilterApp")
)
