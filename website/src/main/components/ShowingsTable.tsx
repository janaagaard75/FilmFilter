import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Showing } from "../model/Showing"
import { ShowingRow } from "./ShowingRow"

interface Props {
  showings: Array<Showing>
}

@observer
export class ShowingsTable extends Component<Props> {
  public render() {
    return (
      <table className="table table-sm table-showings">
        <thead>
          <tr>
            <th colSpan={2}>Film</th>
            <th>Biograf</th>
            <th>Tidspunkt</th>
          </tr>
        </thead>
        <tbody>
          {this.props.showings.map(showing =>
            <ShowingRow
              key={showing.showingUrl}
              showing={showing}
            />
          )}
        </tbody>
      </table>
    )
  }
}