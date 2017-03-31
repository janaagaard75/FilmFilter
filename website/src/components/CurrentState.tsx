import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { AppState } from "../model/AppState"
import { Store } from "../model/Store"

interface Props {
  store: Store
}

@observer
export class CurrentState extends Component<Props, void> {
  public render() {
    return (
      <span>
        {this.props.store.state !== AppState.Idle
          ? <span className="form-control-static mr-3">{this.props.store.stateDescription} <i className="fa fa-spinner fa-pulse"/></span>
          : undefined
        }
      </span>
    )
  }
}