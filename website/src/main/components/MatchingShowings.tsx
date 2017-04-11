import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Card } from "./bootstrap/Card"
import { Movie } from "../model/Movie"
import { Showing } from "../model/Showing"
import { ShowingsTable } from "./ShowingsTable"
import { Theater } from "../model/Theater"

interface Props {
  matchingShowings: Array<Showing>
  selectedMovies: Array<Movie>
  selectedTheaters: Array<Theater>
}

@observer
export class MatchingShowings extends Component<Props, void> {
  public render() {
    const atLeastOneMatchingShowing = this.props.matchingShowings.length >= 1
    const header = "Forestillinger: " + this.props.matchingShowings.length

    const showMovieColumn = (this.props.selectedMovies.length !== 1)
    const showTheaterColumn = (this.props.selectedTheaters.length !== 1)

    return (
      <Card header={header}>
        {atLeastOneMatchingShowing
          ? <ShowingsTable
            showings={this.props.matchingShowings.slice(0, 25)}
            showMovieColumns={showMovieColumn}
            showTheaterColumn={showTheaterColumn}
          />
          : <div className="card-block">
              Ingen matchende forestillinger.
            </div>
        }
      </Card>
    )
  }
}