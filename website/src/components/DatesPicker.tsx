import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { SelectableDate } from "../model/SelectableDate"
import { Week } from "./Week"

interface Props {
  weeks: Array<Array<SelectableDate>>
}

@observer
export class DatesPicker extends Component<Props, void> {
  public render() {
    return (
      <table className="table">
        <tbody>
          <tr>
            <td>Ma</td>
            <td>Ti</td>
            <td>On</td>
            <td>To</td>
            <td>Fr</td>
            <td>Lø</td>
            <td>Sø</td>
          </tr>
          {this.props.weeks.map(week =>
            <Week key={"week-" + week[0].key} dates={week}/>
          )}
        </tbody>
      </table>
    )
  }
}