import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Theater } from "../model/Theater"

interface Props {
  theater: Theater
}

@observer
export class TheaterPicker extends Component<Props, void> {
  public render() {
    const divCssClasses = classNames(
      "col-12 col-md-6 col-lg-4",
      "ellipsis no-wrap",
      {
        "selected-item": this.props.theater.selected
      }
    )

    const starCssClasses = classNames(
      "clickable",
      "fa",
      {
        "fa-star": this.props.theater.favorited,
        "fa-star-o": !this.props.theater.favorited
      }
    )

    return (
      <div className={divCssClasses}>
        <span className={starCssClasses} onClick={() => this.props.theater.toggleFavorited()}/> <span className="clickable" onClick={() => this.props.theater.toggleSelection()}>{this.props.theater.name}</span>
      </div>
    )
  }
}