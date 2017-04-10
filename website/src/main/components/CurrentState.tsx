import * as React from "react"
import { Component } from "react"
import { computed } from "mobx"
import { observable } from "mobx"
import { observer } from "mobx-react"

import { AppState } from "../model/AppState"
import { Store } from "../model/Store"

interface Props {
  store: Store
}

@observer
export class CurrentState extends Component<Props, void> {
  @observable private progress: number = 0

  private count(): void {
    const CounterWorker = require("../../workers/Counter.worker") as any
    const counterWorker = new CounterWorker() as Worker
    counterWorker.addEventListener("message", (e: any) => {
      console.info("Message from worker:", e)
    })
    counterWorker.postMessage({ a: 1 })
  }

  @computed
  private get progressPercent(): string {
    const progressInPercent = Math.floor(100 * this.progress)
    return `${progressInPercent}%`
  }

  public render() {
    return (
      <span>
        <button className="btn btn-primary btn-sm mr-3" onClick={() => this.count()}>Count</button>
        <span className="mr-5">{this.progressPercent}</span>
        <span>
          {this.props.store.appState !== AppState.Idle
            ? <span className="form-control-static mr-3">{this.props.store.stateDescription} <i className="fa fa-spinner fa-pulse"/></span>
            : undefined
          }
        </span>
      </span>
    )
  }
}