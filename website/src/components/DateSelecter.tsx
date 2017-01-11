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

interface State {
  expanded: boolean
}

@observer
export class DateSelecter extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      expanded: false
    }
  }

  private handleToggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  public render() {
    const header = this.props.selectedDates.length === 0
      ? "Vælg dato"
      : "Dato: " + this.props.selectedDates.map(date => date.label).join(", ")

    // TODO: It's not sure that there will be a showing on a given date. DateItem should receive a date, and then render something, possibly depending on there being a show on that date or not.
    const emptyDates = this.props.dates[0].date.weekday()

    return (
    <CollapsibleCard header={header} expanded={this.state.expanded} onToggleExpanded={() => this.handleToggleExpanded()}>
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