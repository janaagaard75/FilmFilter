import * as React from "react"
import { Component } from "react"

import { Collapse } from "./bootstrap/Collapse"
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

export class DateSelecter extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      expanded: false
    }
  }

  private toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  public render() {
    // TODO: Figure out how to avoid the <br> tag
    return (
      <div className="card">
        <div className="card-header clickable" onClick={() => this.toggleExpanded()}>
          <h5 className="mb-0">
            {this.props.selectedDates.length === 0
              ? "Vælg dato"
              : "Dato: " + this.props.selectedDates.map(date => date.label).join(", ")}
          </h5>
        </div>
        <Collapse expanded={this.state.expanded}>
          <div className="row">
            {this.props.dates.map(date =>
              <DateItem
                key={date.label}
                date={date}
                toggleDateSelection={() => this.props.toggleDateSelection(date)}
              />
            )}
          </div>
        </Collapse>
      </div>
    )
  }
}