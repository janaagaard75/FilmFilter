import * as React from "react"
// TODO: Figure out how to remove dev tools from the production bundle.
import DevTools from "mobx-react-devtools"

import { App } from "./components/App"
import { RouteComponent } from "./model/RouteComponent"
import { Store } from "./model/Store"

declare const process: any

export class ConnectedApp extends RouteComponent<void, void, void> {
  constructor() {
    super()

    this.includeDevTools = process.env.NODE_ENV === "development"

    this.store = new Store()
    this.store.initializeData()
    this.store.initialize()
  }

  private includeDevTools: boolean
  private store: Store

  public render() {
    return (
      <div>
        <App routeProps={this.props} store={this.store}/>
        {this.includeDevTools &&
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