import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Theater } from "../model/Theater"

interface Props {
  toggleTheaterSelection: () => void
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
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input"
              defaultChecked={this.props.theater.selected}
              onChange={this.props.toggleTheaterSelection}
            />
            {" " + this.props.theater.name}
          </label>
        </div>
      </div>
    )
  }
}