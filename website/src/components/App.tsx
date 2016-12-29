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
      // TODO: Avoid the br element.
      <div className="container-fluid">
        <h1>Film Filter</h1>
        <div className="row">
          <div className="col-sm-6">
            <FilterForm setMovieNameFilter={e => this.props.store.setMovieNameFilter(e)} />
          </div>
          <div className="col-sm-6">
            Biograf
          </div>
        </div>
        <br/>
        <ShowingsTable showings={this.props.store.matchingShowings}/>
      </div>
    )
  }
}