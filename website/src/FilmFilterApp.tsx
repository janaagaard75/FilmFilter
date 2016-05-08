import * as React from "react"
import * as ReactDOM from "react-dom"

export interface AppProps {
}

export interface AppState {
}

export interface Showing {
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

export default class FilmFilterApp extends React.Component<AppProps, AppState> {
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
