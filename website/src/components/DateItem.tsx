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
    const cssClasses = classNames(
      "clickable",
      {
        "selected-item": this.props.date.selected
      }
    )

    return (
      <td className={cssClasses} onClick={this.props.date.toggleSelection}>
        {this.props.date.label}
      </td>
    )
  }
}