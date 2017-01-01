import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { SelectableDate } from "../model/SelectableDate"

interface Props {
  date: SelectableDate
  toggleDateSelection: () => void
}

export class DateItem extends Component<Props, void> {
  public render() {
    const cssClasses = classNames(
      "col-xs-6 col-sm-4 col-md-3 col-lg-2 clickable",
      {
        "selected-item": this.props.date.selected
      }
    )

    return (
      <div className={cssClasses}>
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input"
              defaultChecked={this.props.date.selected}
              onChange={this.props.toggleDateSelection}
            />
            {" " + this.props.date.label}
          </label>
        </div>
      </div>
    )
  }
}