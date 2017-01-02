import * as React from "react"
import { Component } from "react"

import { CollapsibleCard } from "./CollapsibleCard"
import { DateItem } from "./DateItem"
import { SelectableDate } from "../model/SelectableDate"

interface Props {
  dates: Array<SelectableDate>
  selectedDates: Array<SelectableDate>
  toggleDateSelection: (date: SelectableDate) => void
}

export class DateSelecter extends Component<Props, void> {
  public render() {
    const header = this.props.selectedDates.length === 0
      ? "Vælg dato"
      : "Dato: " + this.props.selectedDates.map(date => date.label).join(", ")

    return (
      <CollapsibleCard header={header}>
        {this.props.dates.map(date =>
          <DateItem
            key={date.label}
            date={date}
            toggleDateSelection={() => this.props.toggleDateSelection(date)}
          />
        )}
      </CollapsibleCard>
    )
  }
}