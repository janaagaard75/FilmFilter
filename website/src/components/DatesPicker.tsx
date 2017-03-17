import * as React from "react"
import { Component } from "react"
import { ChangeEvent } from "react"
import { observer } from "mobx-react"

import { SelectableDate } from "../model/SelectableDate"
import { Week } from "./Week"

interface Props {
  weeks: Array<Array<SelectableDate>>
}

interface State {
  startIntervalFrom: string
  startIntervalTo: string
}

@observer
export class DatesPicker extends Component<Props, State> {
  private readonly defaultFrom = "00:00"
  private readonly defaultTo = "23:59"

  constructor(props?: Props, context?: any) {
    super(props, context)

    this.state = {
      startIntervalFrom: this.defaultFrom,
      startIntervalTo: this.defaultTo
    }
  }

  private handleChangeFrom(formEvent: ChangeEvent<HTMLInputElement>) {
    const value = formEvent.currentTarget.value
      ? formEvent.currentTarget.value
      : this.defaultFrom

    this.setState({
      startIntervalFrom: value
    })
  }

  private handleChangeTo(formEvent: ChangeEvent<HTMLInputElement>) {
    const value = formEvent.currentTarget.value
      ? formEvent.currentTarget.value
      : this.defaultTo

    this.setState({
      startIntervalTo: value
    })
  }

  public render() {
    return (
      <div>
        <div className="form-inline mb-3">
          <label className="mr-3">Fra:</label>
          <input
            type="time"
            className="form-control col-2"
            onChange={e => this.handleChangeFrom(e)}
            value={this.state.startIntervalFrom}
          />
          <label className="ml-5 mr-3">Til:</label>
          <input
            type="time"
            className="form-control col-2"
            onChange={e => this.handleChangeTo(e)}
            value={this.state.startIntervalTo}
          />
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