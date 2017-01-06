import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { SelectableDate } from "../model/SelectableDate"

interface Props {
  date: SelectableDate
  toggleDateSelection: () => void
}

@observer
export class DateItem extends Component<Props, void> {
  public render() {
    const cssClasses = classNames(
      // TODO: Clean up.
      // TODO: Make this work on small screens.
      // TODO: Have Monday in the left most column.
      // "col-xs-6 col-sm-4 col-md-3 col-lg-2 clickable",
      "col-xs-1-of-7 clickable",
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