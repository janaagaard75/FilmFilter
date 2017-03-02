import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router"

import { DatesPicker } from "./DatesPicker"
import { MatchingShowings } from "./MatchingShowings"
import { MoviesPicker } from "./MoviesPicker"
import { splitIntoChunks } from "../utilities"
import { Store } from "../model/Store"
import { TheatersPicker } from "./TheatersPicker"

enum Picker {
  Date,
  Movie,
  Theater
}

interface Props {
  routeProps: RouteComponentProps<void, void>
  store: Store
}

interface State {
  activePicker: Picker | undefined
}

@observer
export class App extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      activePicker: undefined
    }
  }

  private setActivePicker(picker: Picker) {
    if (picker === this.state.activePicker) {
      this.setState({
        activePicker: undefined
      })
    }
    else {
      this.setState({
        activePicker: picker
      })
    }
  }

  private getMovieButtonText(): string {
    let buttonText = "Film"

    if (this.props.store.selectedMovies.length > 0) {
      const selectedMovies = this.props.store.selectedMovies.map(movie => movie.originalTitle).join(", ")
      buttonText += `: ${selectedMovies}`
    }

    return buttonText
  }

  private getTabContent() {
    switch (this.state.activePicker) {
      case Picker.Date:
        const weeks = splitIntoChunks(this.props.store.dates, 7)
        const firstWeeks = weeks.slice(0, 100)
        return (
          <DatesPicker
            weeks={firstWeeks}
          />
        )

      case Picker.Movie:
        const firstMovies = this.props.store.matchingMovies.slice(0, 24)
        return (
          <MoviesPicker
            movies={firstMovies}
            setMovieNameFilter={(filter: string) => this.props.store.setMovieNameFilter(filter)}
          />
        )

      case Picker.Theater:
        return (
          <TheatersPicker
            theaters={this.props.store.theatersSortedByName}
          />
        )

      case undefined:
        return undefined

      default:
        throw new Error(`'${this.state.activePicker}' is not a supported tab type.`)
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
        <div className="row">
          <div className="col-md-7">
            <div className="row mb-3">
              <div className="col-sm-4">
                <button
                  className={
                    classNames(
                      "btn btn-secondary w-100 text-left",
                      {
                        "active": this.state.activePicker === Picker.Movie
                      }
                    )
                  }
                  onClick={() => this.setActivePicker(Picker.Movie)}
                >
                    {this.getMovieButtonText()}
                </button>
              </div>
              <div className="col-sm-4">
                <button
                  className={
                    classNames(
                      "btn btn-secondary w-100 text-left",
                      {
                        "active": this.state.activePicker === Picker.Date
                      }
                    )
                  }
                  onClick={() => this.setActivePicker(Picker.Date)}
                >
                  Dato
                </button>
              </div>
              <div className="col-sm-4">
                <button
                  className={
                    classNames(
                      "btn btn-secondary w-100 text-left",
                      {
                        "active": this.state.activePicker === Picker.Theater
                      }
                    )
                  }
                  onClick={() => this.setActivePicker(Picker.Theater)}
                >
                  Biograf
                </button>
              </div>
            </div>
            {this.getTabContent()}
          </div>
          <div className="col-md-5">
            <MatchingShowings matchingShowings={this.props.store.matchingShowings} />
          </div>
        </div>
      </div>
    )
  }
}