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

    return (
      <Card header={header}>
        {atLeastOneMatchingShowing
          ? <ShowingsTable
            showings={this.props.matchingShowings.slice(0, 25)}
          />
          : <div className="card-block">
              Ingen matchende forestillinger.
            </div>
        }
      </Card>
    )
  }
}