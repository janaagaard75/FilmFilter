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

  private getDateButtonText(): string {
    const standardButtonText = "Dato"
    if (this.props.store.selectedDates.length === 0) {
      return standardButtonText
    }

    const selectedDates = this.props.store.selectedDates.map(date => date.label).join(", ")
    const buttonTextWithDates = `${standardButtonText}: ${selectedDates}`
    return buttonTextWithDates
  }

  private getMovieButtonText(): string {
    const standardButtonText = "Film"
    if (this.props.store.selectedMovies.length === 0) {
      return standardButtonText
    }

    const selectedMovies = this.props.store.selectedMovies.map(movie => movie.originalTitle).join(", ")
    const buttonTextWithMovies = `${standardButtonText}: ${selectedMovies}`
    return buttonTextWithMovies
  }

  private getPickerButton(picker: Picker, buttonText: string): JSX.Element {
    return (
      <div className="mb-1">
        <button
          className={
            classNames(
              "btn btn-secondary btn-no-active w-100 text-left",
              {
                "active": this.state.activePicker === picker
              }
            )
          }
          onClick={() => this.setActivePicker(picker)}
        >
          {buttonText}
        </button>
      </div>
    )
  }

  private getTabContent(): JSX.Element | undefined {
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
        return (
          <MoviesPicker
            movies={this.props.store.matchingMovies}
            setMovieNameFilter={(filter: string) => this.props.store.setMovieNameFilter(filter)}
          />
        )

      case Picker.Theater:
        return (
          <TheatersPicker
            theaters={this.props.store.theaters}
          />
        )

      case undefined:
        return undefined

      default:
        throw new Error(`'${this.state.activePicker}' is not a supported picker type.`)
    }
  }

  private getTheaterButtonText(): string {
    const standardButtonText = "Biograf"
    if (this.props.store.selectedTheaters.length === 0) {
      return standardButtonText
    }

    const selectedTheaters = this.props.store.selectedTheaters.map(theater => theater.name).join(", ")
    const buttonTextWithTheaters = `${standardButtonText}: ${selectedTheaters}`
    return buttonTextWithTheaters
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
            <button className="btn btn-secondary btn-sm" onClick={() => this.props.store.fetchAndUpdateData()}disabled={this.props.store.fetchingAndParsing}>Opdater</button>
          </span>
        </div>
        <div className="row">
          <div className="col-xl-7">
            <div className="mb-3">
              {this.getPickerButton(Picker.Movie, this.getMovieButtonText())}
              {this.getPickerButton(Picker.Date, this.getDateButtonText())}
              {this.getPickerButton(Picker.Theater, this.getTheaterButtonText())}
            </div>
            {this.getTabContent()}
          </div>
          <div className="col-xl-5">
            <MatchingShowings matchingShowings={this.props.store.matchingShowings} />
          </div>
        </div>
      </div>
    )
  }
}