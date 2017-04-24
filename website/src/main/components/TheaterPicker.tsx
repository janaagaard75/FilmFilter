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
      "ellipsis no-wrap selectable-outer"
    )

    const starCssClasses = classNames(
      "clickable mr-2",
      "fa",
      {
        "fa-star": this.props.theater.favorited,
        "fa-star-o": !this.props.theater.favorited
      }
    )

    const innerCssClasses = classNames(
      "selectable-inner",
      {
        "selected": this.props.theater.selected
      }
    )

    return (
      <div className={divCssClasses}>
        <span
          className={starCssClasses}
          onClick={() => this.props.theater.toggleFavorited()}
        /> <span
          className="clickable"
          onClick={() => this.props.theater.toggleSelection()}
        >
          <span className={innerCssClasses}>
            {this.props.theater.name}
          </span>
        </span>
      </div>
    )
  }
}