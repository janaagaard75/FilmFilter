import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router"

import { DatesCollapsible } from "./DatesCollapsible"
import { MatchingShowings } from "./MatchingShowings"
import { MoviesCollapsible } from "./MoviesCollapsible"
import { Store } from "../model/Store"
import { Tab } from "../model/Tab"
import { Tabs } from "./Tabs"
import { TheatersCollapsible } from "./TheatersCollapsible"

interface Props {
  routeProps: RouteComponentProps<void, void>
  store: Store
}

@observer
export class App extends Component<Props, void> {
  private setActiveTab(tab: Tab) {
    console.info("Active tab: " + tab)
  }

  public render() {
    const firstMovies = this.props.store.matchingMovies.slice(0, 24)
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
        <Tabs setActiveTab={this.setActiveTab}/>
        <div className="row">
          <div className="col-4">
            <MoviesCollapsible
              movies={firstMovies}
              selectedMovies={this.props.store.selectedMovies}
              setMovieNameFilter={(filter: string) => this.props.store.setMovieNameFilter(filter)}
            />
          </div>
          <div className="col-4">
            <DatesCollapsible
              dates={this.props.store.dates}
              selectedDates={this.props.store.selectedDates}
            />
          </div>
          <div className="col-4">
            <TheatersCollapsible
              theaters={this.props.store.theatersSortedByName}
              selectedTheaters={this.props.store.selectedTheaters}
            />
          </div>
        </div>
        <MatchingShowings matchingShowings={this.props.store.matchingShowings} />
      </div>
    )
  }
}