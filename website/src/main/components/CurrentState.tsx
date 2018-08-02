import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { AppState } from "../model/AppState"
import { Store } from "../model/Store"
import { Environment } from "../utilities/Environment"

interface Props {
  store: Store
}

@observer
export class CurrentState extends Component<Props> {
  public render() {
    return (
      <span>
        {this.props.store.appState !== AppState.Idle && (
          <span className="form-control-static mr-3">
            {Environment.inDevelopmentMode && (
              this.props.store.stateDescription + " "
            )}
            <i className="fa fa-spinner fa-pulse"/>
          </span>
        )}
      </span>
    )
  }
}