import * as React from 'react'
import { Component } from 'react'
import { RouterContext } from 'react-router'

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
              <th>Billetter</th>
            </tr>
          </thead>
          <tbody>
            {this.props.store.first100Showings.map(showing =>
              <tr key={showing.showingUrl}>
                <td>{showing.movieId === -1
                  ? ''
                  : this.props.store.data.movies[showing.movieId].originalTitle}</td>
                <td>{this.props.store.data.theaters[showing.theaterId].name}</td>
                <td>{showing.start}</td>
                <td><a href={showing.showingUrl}>Billetter</a></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}