import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { CollapsibleCard } from "./bootstrap/CollapsibleCard"
import { SelectableDate } from "../model/SelectableDate"
import { splitIntoChunks } from "../utilities"
import { Weeks } from "./Weeks"

interface Props {
  dates: Array<SelectableDate>
  selectedDates: Array<SelectableDate>
}

@observer
export class DateSelecter extends Component<Props, void> {
  public render() {
    const header = this.props.selectedDates.length === 0
      ? "Vælg dato"
      : "Dato: " + this.props.selectedDates.map(date => date.label).join(", ")

    const weeks = splitIntoChunks(this.props.dates, 7)
    const firstWeeks = weeks.slice(0, 100)

    return (
      <CollapsibleCard header={header}>
        <Weeks weeks={firstWeeks}/>
      </CollapsibleCard>
    )
  }
}