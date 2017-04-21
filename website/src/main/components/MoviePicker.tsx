import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Movie } from "../model/Movie"

interface Props {
  movie: Movie
}

@observer
export class MoviePicker extends Component<Props, void> {
  public render() {
    const cssClasses = classNames(
      "col-6 col-sm-4 col-md-3 col-lg-4 col-xl-3",
      "clickable ellipsis text-center mb-3",
      {
        "selected-item": this.props.movie.selected
      }
    )

    return (
      <div className={cssClasses} onClick={() => this.props.movie.toggleSelection()}>
        <img src={this.props.movie.posterUrl} alt={this.props.movie.originalTitle} className="img-fluid"/>
        {this.props.movie.originalTitle}
      </div>
    )
  }
}