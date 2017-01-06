import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"
import { RouterContext } from "react-router"

import { DateSelecter } from "./DateSelecter"
import { MatchingShowings } from "./MatchingShowings"
import { MoviesSelecter } from "./MoviesSelecter"
import { Store } from "../model/Store"
import { TheatersSelecter } from "./TheatersSelecter"

interface Props {
  routerContext: RouterContext.RouterContextProps
  store: Store
}

@observer
export class App extends Component<Props, void> {
  public render() {
    return (
      <div className="container-fluid">
        <h1>Film Filter</h1>
        <div className="row">
          <div className="col-7">
            <MoviesSelecter
              movies={this.props.store.getMoviesByNumberOfShowings().slice(0, 24)}
              selectedMovies={this.props.store.selectedMovies}
              toggleMovieSelection={this.props.store.toggleMovieSelection}
            />
            <TheatersSelecter
              theaters={this.props.store.getTheatersSortedByName()}
              selectedTheaters={this.props.store.selectedTheaters}
              toggleTheaterSelection={this.props.store.toggleTheaterSelection}
            />
            <DateSelecter
              dates={this.props.store.dates}
              selectedDates={this.props.store.selectedDates}
              toggleDateSelection={this.props.store.toggleDateSelection}
            />
          </div>
          <div className="col-5">
            <MatchingShowings matchingShowings={this.props.store.matchingShowings}/>
          </div>
        </div>
      </div>
    )
  }
}