import * as React from "react"
import ShowingRow from "./ShowingRow"
import { ShowingData } from "./Main"

export interface FilmFilterAppProps {
  showings: Array<ShowingData>
}

export interface FilmFilterAppState {
}

export default class FilmFilterApp extends React.Component<FilmFilterAppProps, FilmFilterAppState> {
  constructor(props: FilmFilterAppProps) {
    super(props)
  }

  public render() {
    return (
      <div className="container">
        <h1>Film Filter</h1>
        <ul>
          {this.props.showings
            .filter(showing => showing.movieUrl !== "NO_MOVIE_URL")
            .map(showing => {
              return <ShowingRow
                key={showing.showingUrl}
                movieUrl={showing.movieUrl}
                start={showing.start}/>
            })}
        </ul>
      </div>)
  }
}
