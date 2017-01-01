import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"
import { RouterContext } from "react-router"

import { MoviesSelecter } from "./MoviesSelecter"
import { ShowingsTable } from "./ShowingsTable"
import { Store } from "../model/Store"
import { TheaterForm } from "./TheaterForm"
import { TheatersSelecter } from "./TheatersSelecter"

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
        <p>Antal matchende visninger: {this.props.store.matchingShowings.length}</p>
        <div id="accordion" role="tablist" aria-multiselectable="true">
          <MoviesSelecter
            movies={this.props.store.getMoviesByNumberOfShowings().slice(0, 24)}
            selectedMovies={this.props.store.selectedMovies}
            toggleMovieSelection={this.props.store.toggleMovieSelection}
          />
          <TheatersSelecter
            theaters={this.props.store.theaters}
            selectedTheaters={this.props.store.selectedTheaters}
            toggleTheaterSelection={this.props.store.toggleTheaterSelection}
          />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <TheaterForm theaters={this.props.store.theaters}/>
          </div>
        </div>
        <br/>
        <ShowingsTable showings={this.props.store.matchingShowings.slice(0, 100)}/>
      </div>
    )
  }
}