import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { SelectableDate } from "../model/SelectableDate"

interface Props {
  date: SelectableDate
}

@observer
export class DateItem extends Component<Props, void> {
  public render() {
    const hasAtLeastOneShowing = this.props.date.showings.size > 0
    const cssClasses = classNames(
      {
        "clickable": hasAtLeastOneShowing,
        "disabled-date": !hasAtLeastOneShowing,
        "selected-item": this.props.date.selected
      }
    )

    return (
      <td className={cssClasses} onClick={() => hasAtLeastOneShowing && this.props.date.toggleSelection()}>
        {this.props.date.label}
      </td>
    )
  }
}