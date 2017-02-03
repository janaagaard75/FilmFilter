import * as React from "react"
import { Component } from "react"

import { DateItem } from "./DateItem"
import { SelectableDate } from "../model/SelectableDate"

interface Props {
  week: Array<SelectableDate>
  toggleDateSelection: () => void
}

export class Week extends Component<Props, void> {
  public render() {
    return (
      <tr>
        {this.props.week.map(date =>
          <DateItem date={date} toggleDateSelection={this.props.toggleDateSelection} />
        )}
      </tr>
    )
  }
}