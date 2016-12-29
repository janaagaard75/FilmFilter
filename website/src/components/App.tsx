import * as React from 'react'
import { Component } from 'react'
import { observer } from 'mobx-react'
import { RouterContext } from 'react-router'

import { FilterForm } from './FilterForm'
import { ShowingsTable } from './ShowingsTable'
import { Store } from '../model/Store'

interface Props {
  routerContext: RouterContext.RouterContextProps,
  store: Store
}

@observer
export class App extends Component<Props, void> {
  public render() {
    return (
      <div className="container-fluid">
        <h1>Film Filter</h1>
        <FilterForm setMovieNameFilter={e => this.props.store.setMovieNameFilter(e)} />
        <ShowingsTable showings={this.props.store.matchingShowings}/>
      </div>
    )
  }
}