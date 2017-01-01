import * as React from "react"
import { Component } from "react"

import { Showing } from "../model/Showing"
import { ShowingRow } from "./ShowingRow"

interface Props {
  showings: Array<Showing>
}

export class ShowingsTable extends Component<Props, void> {
  public render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Navn</th>
            <th>Biograf</th>
            <th>Tidspunkt</th>
          </tr>
        </thead>
        <tbody>
          {this.props.showings.map(showing =>
            <ShowingRow key={showing.showingUrl} showing={showing}/>
          )}
        </tbody>
      </table>
    )
  }
}