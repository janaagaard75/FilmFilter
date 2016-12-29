import * as React from 'react'
import { Component } from 'react'
import { RouterContext } from 'react-router'
import * as moment from 'moment'

import { ShowingRow } from './ShowingRow'
import { Store } from '../model/Store'

interface Props {
  routerContext: RouterContext.RouterContextProps,
  store: Store
}

export class App extends Component<Props, void> {
  public render() {
    return (
      <div className="container-fluid">
        <h1>Film Filter</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Navn</th>
              <th>Biograf</th>
              <th>Tidspunkt</th>
            </tr>
          </thead>
          <tbody>
            {this.props.store.matchingShowings.map(showing =>
              <ShowingRow key={showing.showingUrl} showing={showing}/>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}