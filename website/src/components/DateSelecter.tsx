import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { CollapsibleCard } from "./bootstrap/CollapsibleCard"
import { DateItem } from "./DateItem"
import { SelectableDate } from "../model/SelectableDate"

interface Props {
  dates: Array<SelectableDate>
  selectedDates: Array<SelectableDate>
  toggleDateSelection: (date: SelectableDate) => void
}

@observer
export class DateSelecter extends Component<Props, void> {
  public render() {
    const header = this.props.selectedDates.length === 0
      ? "Vælg dato"
      : "Dato: " + this.props.selectedDates.map(date => date.label).join(", ")

    const firstSelectableDate = this.props.dates[0].date
    const lastSelectableDate = this.props.dates[this.props.dates.length - 1].date


    const emptyDates: number = this.props.dates.length >= 1
      ? this.props.dates[0].date.weekday()
      : 0

    return (
    <CollapsibleCard header={header}>
        <table className="table">
          <tr>
            <td>Ma</td>
            <td>Ti</td>
            <td>On</td>
            <td>To</td>
            <td>Fr</td>
            <td>Lø</td>
            <td>Sø</td>
          </tr>

        </table>
        <div className="row">
          {
            // tslint:disable-next-line no-unused-variable
            [...Array(emptyDates)].map((x, index) =>
            <div className="col-1-of-7" key={index}/>
          )}
          {this.props.dates.map(date =>
            <DateItem
              key={date.key}
              date={date}
              toggleDateSelection={() => this.props.toggleDateSelection(date)}
            />
          )}
        </div>
      </CollapsibleCard>
    )
  }
}