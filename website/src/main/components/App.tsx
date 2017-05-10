import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { AppState } from "../model/AppState"
import { Arrays } from "../utilities/Arrays"
import { CurrentState } from "./CurrentState"
import { DatesPicker } from "./DatesPicker"
import { Environment } from "../utilities/Environment"
import { MatchingShowings } from "./MatchingShowings"
import { MoviesPicker } from "./MoviesPicker"
import { Store } from "../model/Store"
import { TheatersPicker } from "./TheatersPicker"
import { TypePicker } from "./TypePicker"

enum Picker {
  Date,
  Movie,
  Theater,
  Type
}

interface Props {
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

  private getPickerButton(buttonText: string, pickedText: string, picker: Picker): JSX.Element {
    return (
      <div className="row mb-1">
        <div className="col">
          <p className="form-control-static">{pickedText}</p>
        </div>
        <div className="col col-7rem">
          <button
            className={
              classNames(
                "btn btn-secondary w-100",
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
      </div>
    )
  }

  private getSelectedDatesText(): string {
    if (this.props.store.selectedDates.length === 0) {
      return "Alle datoer"
    }

    const selectedDates = this.props.store.selectedDates.map(date => date.label).join(", ")
    return selectedDates
  }

  private getSelectedMoviesText(): string {
    if (this.props.store.selectedMovies.length === 0) {
      return "Alle film"
    }

    const selectedMovies = this.props.store.selectedMovies.map(movie => movie.originalTitle).join(", ")
    return selectedMovies
  }

  private getSelectedTheatersText(): string {
    if (this.props.store.selectedTheaters.length === 0) {
      return "Alle biografer"
    }

    const selectedTheaters = this.props.store.selectedTheaters.map(theater => theater.name).join(", ")
    return selectedTheaters
  }

  private getSelectedTypesText(): string {
    const selectedTypesTexts: Array<string> = []

    if (this.props.store.filters.dimensions.twoD && !this.props.store.filters.dimensions.threeD) {
      selectedTypesTexts.push("2D")
    }

    if (!this.props.store.filters.dimensions.twoD && this.props.store.filters.dimensions.threeD) {
      selectedTypesTexts.push("3D")
    }

    if (this.props.store.filters.filmType.imax && !this.props.store.filters.filmType.standardFilm) {
      selectedTypesTexts.push("IMAX")
    }

    if (!this.props.store.filters.filmType.imax && this.props.store.filters.filmType.standardFilm) {
      selectedTypesTexts.push("Almindeligt lærred")
    }

    if (this.props.store.filters.language.dubbedToDanish && !this.props.store.filters.language.originalLanguage) {
      selectedTypesTexts.push("Synkroniseret til dansk")
    }

    if (!this.props.store.filters.language.dubbedToDanish && this.props.store.filters.language.originalLanguage) {
      selectedTypesTexts.push("Originalt sprog")
    }

    if (this.props.store.filters.showingType.normalShowings && !this.props.store.filters.showingType.specialShowings) {
      selectedTypesTexts.push("Almindelige visninger")
    }

    if (!this.props.store.filters.showingType.normalShowings && this.props.store.filters.showingType.specialShowings) {
      selectedTypesTexts.push("Særvisninger")
    }

    if (selectedTypesTexts.length === 0) {
      return "Alle typer film"
    }

    const selectedTypesText = selectedTypesTexts.join(", ")
    return selectedTypesText
  }

  private getTabContent(): JSX.Element | undefined {
    // TODO: Use polymorphism to avoid this switch.
    switch (this.state.activePicker) {
      case Picker.Date:
        const weeks = Arrays.splitIntoChunks(this.props.store.dates, 7)
        const firstWeeks = weeks.slice(0, 100)
        return (
          <DatesPicker
            startInterval={this.props.store.filters.startInterval}
            weeks={firstWeeks}
          />
        )

      case Picker.Movie:
        return (
          <MoviesPicker
            movies={this.props.store.matchingMovies}
            setMovieNameFilter={(filter: string) => { this.props.store.setMovieNameFilter(filter) }}
          />
        )

      case Picker.Theater:
        return (
          <TheatersPicker
            theaters={this.props.store.theatersSortedByName}
          />
        )

      case Picker.Type:
        return (
          <TypePicker
            filters={this.props.store.filters}
          />
        )

      case undefined:
        return undefined

      default:
        throw new Error(`'${this.state.activePicker}' is not a supported picker type.`)
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

  public render() {
    return (
      <div className="container-fluid">
        <div className="d-flex">
          <h1 className="mr-auto">Filmfilter</h1>
          <span className="align-self-center">
            <CurrentState store={this.props.store}/>
          </span>
          {Environment.inDevelopmentMode &&
            <span className="align-self-center">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => this.props.store.fetchAndUpdateData()}
                disabled={this.props.store.appState !== AppState.Idle}
              >
                Opdater
              </button>
            </span>
          }
          </div>
        <div className="row">
          <div className="col-lg-6 push-lg-6">
            <div className="mb-3">
              {this.getPickerButton("Film", this.getSelectedMoviesText(), Picker.Movie)}
              {this.getPickerButton("Dato", this.getSelectedDatesText(), Picker.Date)}
              {this.getPickerButton("Biograf", this.getSelectedTheatersText(), Picker.Theater)}
              {this.getPickerButton("Type", this.getSelectedTypesText(), Picker.Type)}
            </div>
            {this.getTabContent()}
          </div>
          <div className="col-lg-6 pull-lg-6">
            <MatchingShowings
              matchingShowings={this.props.store.matchingShowings}
              selectedMovies={this.props.store.selectedMovies}
              selectedTheaters={this.props.store.selectedTheaters}
            />
          </div>
        </div>
      </div>
    )
  }
}