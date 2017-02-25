import * as React from "react"
import { Component } from "react"

import { DatePicker } from "./DatePicker"
import { SelectableDate } from "../model/SelectableDate"

interface Props {
  dates: Array<SelectableDate>
}

export class Week extends Component<Props, void> {
  public render() {
    return (
      <tr>
        {this.props.dates.map(date =>
          <DatePicker key={"date-" + date.key} date={date}/>
        )}
      </tr>
    )
  }
}