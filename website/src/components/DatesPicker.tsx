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
      <table className="table table-sm table-text-center">
        <thead>
          <tr>
            <th>Ma</th>
            <th>Ti</th>
            <th>On</th>
            <th>To</th>
            <th>Fr</th>
            <th>Lø</th>
            <th>Sø</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weeks.map(week =>
            <Week key={"week-" + week[0].key} dates={week}/>
          )}
        </tbody>
      </table>
    )
  }
}