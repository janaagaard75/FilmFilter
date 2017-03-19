import * as React from "react"
import { Component } from "react"
import { ChangeEvent } from "react"
import { observer } from "mobx-react"

import { SelectableDate } from "../model/SelectableDate"
import { Time } from "../model/Time"
import { TimeInterval } from "../model/TimeInterval"
import { Week } from "./Week"

interface Props {
  startInterval: TimeInterval
  weeks: Array<Array<SelectableDate>>
}

@observer
export class DatesPicker extends Component<Props, void> {
  // TODO: Extract the time interval picker to a separate component.
  private handleChangeFrom(formEvent: ChangeEvent<HTMLInputElement>) {
    const newValue: Time = formEvent.currentTarget.value
      ? new Time(formEvent.currentTarget.value)
      : TimeInterval.defaultFrom

    this.props.startInterval.from = newValue
  }

  private handleChangeTo(formEvent: ChangeEvent<HTMLInputElement>) {
    const newValue: Time = formEvent.currentTarget.value
      ? new Time(formEvent.currentTarget.value)
      : TimeInterval.defaultTo

    this.props.startInterval.to = newValue
  }

  private resetInterval() {
    this.props.startInterval.from = TimeInterval.defaultFrom
    this.props.startInterval.to = TimeInterval.defaultTo
  }

  public render() {
    return (
      <div>
        <div className="form-inline mb-3">
          <label className="mr-3">Starttidspunkt:</label>
          <input
            type="time"
            className="form-control col-2"
            onChange={e => this.handleChangeFrom(e)}
            value={this.props.startInterval.from.inputFieldValue()}
          />
          <label className="ml-2 mr-2">-</label>
          <input
            type="time"
            className="form-control col-2"
            onChange={e => this.handleChangeTo(e)}
            value={this.props.startInterval.to.inputFieldValue()}
          />
           <button type="button" className="btn btn-secondary ml-5" onClick={() => this.resetInterval()}>Nulstil</button>
        </div>
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
      </div>
    )
  }
}