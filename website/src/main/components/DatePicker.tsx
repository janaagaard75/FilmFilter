import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { SelectableDate } from "../model/SelectableDate"

interface Props {
  date: SelectableDate
}

@observer
export class DatePicker extends Component<Props, void> {
  public render() {
    const hasAtLeastOneShowing = this.props.date.showings.size > 0
    const outerCssClasses = classNames(
      "selectable-outer",
      {
        "clickable": hasAtLeastOneShowing,
        "disabled-date": !hasAtLeastOneShowing
      }
    )
    const innerCssClasses = classNames(
      "selectable-inner",
      "selectable-inner-date",
      {
        "selected": this.props.date.selected
      }
    )

    return (
      <td
        className={outerCssClasses}
        onClick={() => hasAtLeastOneShowing && this.props.date.toggleSelection()}
      >
        <span className={innerCssClasses}>
          {this.props.date.date.format("D")}
        </span>
      </td>
    )
  }
}