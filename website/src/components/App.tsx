import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router"

import { DatesPicker } from "./DatesPicker"
import { MatchingShowings } from "./MatchingShowings"
import { MoviesPicker } from "./MoviesPicker"
import { splitIntoChunks } from "../utilities"
import { Store } from "../model/Store"
import { Tab } from "../model/Tab"
import { Tabs } from "./Tabs"
import { TheatersPicker } from "./TheatersPicker"

interface Props {
  routeProps: RouteComponentProps<void, void>
  store: Store
}

interface State {
  // TODO: Allow that no tab is active.
  activeTab: Tab
}

@observer
export class App extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      activeTab: "Film"
    }
  }

  private setActiveTab(tab: Tab) {
    this.setState({
      activeTab: tab
    })
  }

  private getTabContent() {
    switch (this.state.activeTab) {
      case "Film":
        const firstMovies = this.props.store.matchingMovies.slice(0, 24)
        return (
          <MoviesPicker
            movies={firstMovies}
            setMovieNameFilter={(filter: string) => this.props.store.setMovieNameFilter(filter)}
          />
        )

      case "Dato":
        const weeks = splitIntoChunks(this.props.store.dates, 7)
        const firstWeeks = weeks.slice(0, 100)
        return (
          <DatesPicker
            weeks={firstWeeks}
          />
        )

      case "Biograf":
        return (
          <TheatersPicker
            theaters={this.props.store.theatersSortedByName}
          />
        )

      default:
        throw new Error(`${this.state.activeTab} is not a supported tab type.`)
    }
  }

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
        <Tabs activeTab={this.state.activeTab} setActiveTab={(tab: Tab) => this.setActiveTab(tab)}/>
        {this.getTabContent()}
        <MatchingShowings matchingShowings={this.props.store.matchingShowings} />
      </div>
    )
  }
}