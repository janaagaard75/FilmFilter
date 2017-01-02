import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Showing } from "../model/Showing"

interface Props {
  showing: Showing
}

@observer
export class ShowingRow extends Component<Props, void> {
  public render() {
    return (
      <tr>
        <td>
          <a href={this.props.showing.movie.movieUrl}>
            {this.props.showing.movie.originalTitle}
          </a>
        </td>
        <td>
          <a href={this.props.showing.theater.theatherUrl}>
            {this.props.showing.theater.name}
          </a>
        </td>
        <td>
          <a href={this.props.showing.showingUrl}>
            {this.props.showing.start.format("dd D/M HH:mm")}
          </a>
        </td>
      </tr>
    )
  }
}