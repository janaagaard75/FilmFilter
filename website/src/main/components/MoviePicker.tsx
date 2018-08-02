import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Movie } from "../model/Movie"

interface Props {
  movie: Movie
}

@observer
export class MoviePicker extends Component<Props> {
  public render() {
    const cssClasses = classNames(
      "selectable-inner",
      {
        "selected": this.props.movie.selected
      }
    )

    return (
      <div
        className="col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3 ellipsis text-center mb-3 selectable-outer clickable"
        onClick={() => this.props.movie.toggleSelection()}
      >
        <div className={cssClasses}>
          <img
            alt={this.props.movie.originalTitle}
            className="img-fluid"
            src={this.props.movie.posterUrl}
          />
          {this.props.movie.originalTitle}
        </div>
      </div>
    )
  }
}