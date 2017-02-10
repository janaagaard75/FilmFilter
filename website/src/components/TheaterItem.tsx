import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Theater } from "../model/Theater"

interface Props {
  theater: Theater
}

@observer
export class TheaterItem extends Component<Props, void> {
  public render() {
    const cssClasses = classNames(
      "col-12 col-md-6 col-lg-4",
      {
        "selected-item": this.props.theater.selected
      }
    )

    return (
      <div className={cssClasses}>
        <span onClick={() => this.props.theater.toggleSelection()} className="clickable ellipsis">{this.props.theater.name}</span>
      </div>
    )
  }
}