import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router"

import { DateSelecter } from "./DateSelecter"
import { MatchingShowings } from "./MatchingShowings"
import { MoviesSelecter } from "./MoviesSelecter"
import { Store } from "../model/Store"
import { TheatersSelecter } from "./TheatersSelecter"

interface Props {
  routeProps: RouteComponentProps<void, void>
  store: Store
}

@observer
export class App extends Component<Props, void> {
  public render() {
    return (
      <div className="container-fluid">
        <div className="d-flex">
          <h1 className="mr-auto">Film Filter</h1>
          <span className="align-self-center">
            {this.props.store.fetchingAndParsing
              ? <span className="mr-3">Opdaterer&hellip;</span>
              : ""
            }
            <button className="btn btn-secondary btn-sm" onClick={() => this.props.store.fetchAndUpdateData()}disabled={this.props.store.fetchingAndParsing}>Opdater data</button>
          </span>
        </div>
        <div className="row">
          <div className="col-md-5 flex-last mb-3">
            <MatchingShowings matchingShowings={this.props.store.matchingShowings} />
          </div>
          <div className="col-md-7">
            <div className="mb-3">
              <MoviesSelecter
                movies={this.props.store.matchingMovies.slice(0, 24)}
                selectedMovies={this.props.store.selectedMovies}
                setMovieFilter={this.props.store.setMovieFilter}
              />
            </div>
            <div className="mb-3">
              <TheatersSelecter
                theaters={this.props.store.theatersSortedByName}
                selectedTheaters={this.props.store.selectedTheaters}
              />
            </div>
            <div className="mb-3">
              <DateSelecter
                dates={this.props.store.dates}
                selectedDates={this.props.store.selectedDates}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}