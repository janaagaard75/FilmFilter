import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Showing } from "../model/Showing"
import { ShowingRow } from "./ShowingRow"

interface Props {
  showings: Array<Showing>
  showMovieColumns: boolean
  showTheaterColumn: boolean
}

@observer
export class ShowingsTable extends Component<Props, void> {
  public render() {
    return (
      <table className="table table-sm table-showings">
        <thead>
          <tr>
            {this.props.showMovieColumns &&
              <th colSpan={2}>Film</th>
            }
            {this.props.showTheaterColumn &&
              <th>Biograf</th>
            }
            <th>Tidspunkt</th>
          </tr>
        </thead>
        <tbody>
          {this.props.showings.map(showing =>
            <ShowingRow
              key={showing.showingUrl}
              showing={showing}
              showMovieColumns={this.props.showMovieColumns}
              showTheaterColumn={this.props.showTheaterColumn}
            />
          )}
        </tbody>
      </table>
    )
  }
}