import * as React from 'react'
import { Component } from 'react'
import { observer } from 'mobx-react'
import { RouterContext } from 'react-router'

import { FilterForm } from './FilterForm'
import { ShowingsTable } from './ShowingsTable'
import { Store } from '../model/Store'
import { TheaterForm } from './TheaterForm'

interface Props {
  routerContext: RouterContext.RouterContextProps,
  store: Store
}

@observer
export class App extends Component<Props, void> {
  public render() {
    return (
      // TODO: Avoid the br element.
      <div className="container-fluid">
        <h1>Film Filter</h1>
        <div className="row">
          <div className="col-sm-6">
            <FilterForm setMovieNameFilter={e => this.props.store.setMovieNameFilter(e)} />
          </div>
          <div className="col-sm-6">
            <TheaterForm theaters={this.props.store.theaters}/>
          </div>
        </div>
        <br/>
        <ShowingsTable showings={this.props.store.matchingShowings}/>
        <ul>
          {this.props.store.getMoviesByNumberOfShowings().slice(0, 25).map(movie =>
            <li key={movie.movieUrl}>{movie.originalTitle} ({movie.showings.length})</li>
          )}
        </ul>
      </div>
    )
  }
}