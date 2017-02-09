import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router"

import { DateSelecter } from "./DateSelecter"
import { MatchingShowings } from "./MatchingShowings"
import { MoviesSelecter } from "./MoviesSelecter"
import { Store } from "../model/Store"
import { TheatersSelecter } from "./TheatersSelecter"
import { DataGetter } from "../model/DataGetter"

interface Props {
  routeProps: RouteComponentProps<void, void>
  store: Store
}

@observer
export class App extends Component<Props, void> {
  private async handleUpateData() {
    this.props.store.setFetchingAndParsing(true)
    const fetchedData = await DataGetter.fetchAndUpdateStoredData()
    this.props.store.setData(fetchedData)
    this.props.store.setFetchingAndParsing(false)
  }

  public render() {
    return (
      <div className="container-fluid">
        <h1>Film Filter</h1>
        <div className="row">
          <div className="col-md-5 flex-last mb-3">
            <MatchingShowings matchingShowings={this.props.store.matchingShowings}/>
          </div>
          <div className="col-md-7">
            <div className="mb-3">
              <MoviesSelecter
                movies={this.props.store.getMoviesSortedByNumberOfShowings().slice(0, 24)}
                selectedMovies={this.props.store.selectedMovies}
              />
            </div>
            <div className="mb-3">
              <TheatersSelecter
                theaters={this.props.store.getTheatersSortedByName()}
                selectedTheaters={this.props.store.selectedTheaters}
              />
            </div>
            <div className="mb-3">
              <DateSelecter
                dates={this.props.store.dates}
                selectedDates={this.props.store.selectedDates}
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-secondary" onClick={() => this.handleUpateData()}>Opdater data</button>
              {/* TODO: Use an ellipsis character. */}
              <span className="ml-2">{this.props.store.getFetchingAndParsing() ? "Opdaterer..." : ""}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}