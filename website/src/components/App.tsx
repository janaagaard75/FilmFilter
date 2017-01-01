import * as React from 'react'
import { Component } from 'react'
import { observer } from 'mobx-react'
import { RouterContext } from 'react-router'

import { MovieCard } from './MovieCard'
import { ShowingsTable } from './ShowingsTable'
import { Store } from '../model/Store'
import { TheaterForm } from './TheaterForm'

interface Props {
  routerContext: RouterContext.RouterContextProps
  store: Store
}

@observer
export class App extends Component<Props, void> {
  public render() {
    return (
      // TODO: Avoid the br element.
      <div className="container-fluid">
        <h1>Film Filter</h1>
        <div id="accordion" role="tablist" aria-multiselectable="true">
          <MovieCard
            movies={this.props.store.getMoviesByNumberOfShowings().slice(0, 24)}
            selectedMovies={this.props.store.selectedMovies}
            toggleMovieSelection={this.props.store.toggleMovieSelection}
          />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <TheaterForm theaters={this.props.store.theaters}/>
          </div>
        </div>
        <br/>
        <ShowingsTable showings={this.props.store.matchingShowings}/>
      </div>
    )
  }
}