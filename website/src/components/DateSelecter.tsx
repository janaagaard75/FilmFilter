import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { CollapsibleCard } from "./CollapsibleCard"
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

    const undefinedDates: Array<SelectableDate> = new Array(this.props.dates[0].date.weekday())
      .map(() => SelectableDate.UndefinedSelectableDate)
    const dates = undefinedDates.concat(this.props.dates)

    return (
      <CollapsibleCard header={header}>
        <div className="row">
          {dates.map(date =>
            <DateItem
              key={date.label}
              date={date}
              toggleDateSelection={() => this.props.toggleDateSelection(date)}
            />
          )}
        </div>
      </CollapsibleCard>
    )
  }
}