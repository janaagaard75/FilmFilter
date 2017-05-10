import * as React from "react"
// TODO: Figure out how to remove dev tools from the production bundle.
import DevTools from "mobx-react-devtools"
import { Component } from "react"

import { App } from "./components/App"
import { Environment } from "./utilities/Environment"
import { Store } from "./model/Store"

export class ConnectedApp extends Component<{}, void> {
  constructor() {
    super()

    this.store = new Store()
    this.store.initializeData()
    this.store.initialize()
  }

  private store: Store

  public render() {
    return (
      <div>
        <App store={this.store}/>
        {Environment.inDevelopmentMode &&
          <DevTools
            position={
              {
                bottom: 0,
                right: 20
              }
            }
          />
        }
      </div>
    )
  }
}