import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Showing } from "../model/Showing"
import { ShowingRow } from "./ShowingRow"

interface Props {
  showings: Array<Showing>
  showMovieColumn: boolean
  showTheaterColumn: boolean
}

@observer
export class ShowingsTable extends Component<Props, void> {
  public render() {
    return (
      <table className="table table-sm">
        <thead>
          <tr>
            {this.props.showMovieColumn
              ? <th>Film</th>
              : undefined
            }
            {this.props.showTheaterColumn
              ? <th>Biograf</th>
              : undefined
            }
            <th>Tidspunkt</th>
          </tr>
        </thead>
        <tbody>
          {this.props.showings.map(showing =>
            <ShowingRow
              key={showing.showingUrl}
              showing={showing}
              showMovieColumn={this.props.showMovieColumn}
              showTheaterColumn={this.props.showTheaterColumn}
            />
          )}
        </tbody>
      </table>
    )
  }
}