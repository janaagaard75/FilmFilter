import * as React from "react"
import * as ReactDOM from "react-dom"

const showings: Array<IShowing> = require("./showings-demo-data.json")

export interface IAppProps {
}

export interface IAppState {
}

export interface IShowing {
  "danish_title": string
  "movie_url": string
  "name": string
  "original_title": string
  "poster_url": string
  "showing_url": string
  "start": string
  "theater_url": string
  "version": string
}

export default class FilmFilterApp extends React.Component<IAppProps, IAppState> {
  public render() {
    return (
      <div className="container">
        <h1>Film Filter</h1>
      </div>)
  }
}

ReactDOM.render(
  <FilmFilterApp/>,
  document.getElementById("filmFilterApp")
)
