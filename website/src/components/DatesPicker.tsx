import * as React from "react"
import { Component } from "react"
import { KeyboardEvent } from "react"
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
  constructor(props?: Props, context?: any) {
    super(props, context)

    this.state = {
      startIntervalFrom: "",
      startIntervalTo: ""
    }
  }

  private handleKeyUpFrom(formEvent: KeyboardEvent<HTMLInputElement>) {
    if (formEvent.key === "Escape") {
      formEvent.currentTarget.value = ""
    }

    this.setState({
      startIntervalFrom: formEvent.currentTarget.value
    })
  }

  private handleKeyUpTo(formEvent: KeyboardEvent<HTMLInputElement>) {
    if (formEvent.key === "Escape") {
      formEvent.currentTarget.value = ""
    }

    this.setState({
      startIntervalTo: formEvent.currentTarget.value
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
            onKeyUp={e => this.handleKeyUpFrom(e)}
          />
          <label className="ml-5 mr-3">Til:</label>
          <input
            type="time"
            className="form-control col-2"
            onKeyUp={e => this.handleKeyUpTo(e)}
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