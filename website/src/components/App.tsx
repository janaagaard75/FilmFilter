import * as React from "react"
import { Component } from "react"
import { RouterContext } from "react-router"

import { Store } from "../model/Store"

interface Props {
  routerContext: RouterContext.RouterContextProps,
  store: Store
}

export class App extends Component<Props, void> {
  public render() {
    return (
      <div className="container-fluid">
        <h1>Film Filter</h1>
      </div>
    )
  }
}