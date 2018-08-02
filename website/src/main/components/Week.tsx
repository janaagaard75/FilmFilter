import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { DatePicker } from "./DatePicker"
import { SelectableDate } from "../model/SelectableDate"

interface Props {
  dates: Array<SelectableDate>
}

@observer
export class Week extends Component<Props> {
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