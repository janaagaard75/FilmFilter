import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Showing } from "../model/Showing"

interface Props {
  showing: Showing
  showMovieColumns: boolean
  showTheaterColumn: boolean
}

@observer
export class ShowingRow extends Component<Props, void> {
  public render() {
    const startLabel = this.props.showing.start.format("dd D/M HH:mm")

    return (
      <tr>
        {this.props.showMovieColumns &&
          <td>
            <img src={this.props.showing.movie.posterUrl} className="movie-thumbnail"/>
          </td>
        }
        {this.props.showMovieColumns &&
          <td>{this.props.showing.movie.originalTitle}</td>
        }
        {this.props.showTheaterColumn &&
          <td>{this.props.showing.theater.name}</td>
        }
        <td>
          <a href={this.props.showing.showingUrl}>
            <span className="fa fa-ticket"/> {startLabel}
          </a>
        </td>
      </tr>
    )
  }
}