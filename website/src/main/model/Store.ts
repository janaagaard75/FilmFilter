import { computed } from "mobx"
import { observable } from "mobx"
import { reaction } from "mobx"

import { ApiData } from "./api-data/ApiData"
import { AppState } from "./AppState"
import { Arrays } from "../utilities/Arrays"
import { Comparer } from "../utilities/Comparer"
import { DataFetcher } from "./DataFetcher"
import { DataStorer } from "./DataStorer"
import { Filters } from "./filters/Filters"
import { ImmutableDate } from "./moment/ImmutableDate"
import { Movie } from "./Movie"
import { SelectableDate } from "./SelectableDate"
import { Settings } from "./Settings"
import { Showing } from "./Showing"
import { ShowingConstructorHelper } from "./ShowingConstructorHelper"
import { Strings } from "../utilities/Strings"
import { Theater } from "./Theater"

export class Store implements ShowingConstructorHelper {
  @observable public appState: AppState = AppState.Idle
  @observable public dates: Array<SelectableDate> = []
  public readonly filters = new Filters()
  @observable private movieNameFilter: string = ""
  @observable private movies: Array<Movie> = []
  @observable private showings: Array<Showing> = []
  @observable private theaters: Array<Theater> = []

  @computed
  public get matchingMovies(): Array<Movie> {
    const matchingMovies = this.movies
      .filter(movie => movie.titleMatchesFilter(this.movieNameFilter))
      .filter(movie => {
        const movieDates = movie.showings.map(showing => showing.date.date)
        const selectedDates = this.selectedDates.map(selectedDate => selectedDate.date)
        const hasDatesInCommon = Arrays.hasSomeInCommon(movieDates, selectedDates)
        return hasDatesInCommon
      })
    return matchingMovies
  }

  @computed
  public get matchingShowings(): Array<Showing> {
    const matching = this.showings
      .filter(showing => this.selectedMovies.length === 0 || showing.movie.selected)
      .filter(showing => this.selectedTheaters.length === 0 || showing.theater.selected)
      .filter(showing => this.selectedDates.length === 0 || showing.date.selected)
      .filter(showing => showing.matchesDimensionsFilter(this.filters.dimensions))
      .filter(showing => showing.matchesFilmTypeFilter(this.filters.filmType))
      .filter(showing => showing.matchesLanguageFilter(this.filters.language))
      .filter(showing => showing.matchesShowingType(this.filters.showingType))
      .filter(showing => showing.matchesStartInterval(this.filters.startInterval))

    return matching
  }

  @computed
  public get selectedDates(): Array<SelectableDate> {
    const selectedDates = this.dates.filter(date => date.selected)
    return selectedDates
  }

  @computed
  public get selectedMovies(): Array<Movie> {
    const selectedMovies = this.movies.filter(movie => movie.selected)
    return selectedMovies
  }

  @computed
  public get selectedTheaters(): Array<Theater> {
    const selectedTheaters = this.theatersSortedByName.filter(theater => theater.selected)
    return selectedTheaters
  }

  @computed
  public get stateDescription() {
    switch (this.appState) {
      case AppState.FetchingData:
        return "Fetching data"

      case AppState.Idle:
        return "Idle"

      case AppState.LoadingData:
        return "Loading data"

      case AppState.LoadingSettings:
        return "Loading settings"

      case AppState.ParsingData:
        return "Parsing data"

      case AppState.SavingData:
        return "Saving data"

      default:
        return `'${this.appState}' is an unknown state.`
    }
  }

  @computed
  public get theatersSortedByName(): Array<Theater> {
    const sortedTheaters = this.theaters.sort(Comparer.compareByName)
    return sortedTheaters
  }

  private addMissingDates(): void {
    this.sortDates()
    const earliest = this.dates[0].date
    const latest = this.dates[this.dates.length - 1].date

    for (let date = earliest; !date.equals(latest); date = date.add(1, "day")) {
      this.getOrAddSelectableDate(date)
    }
  }

  private addStartAndEndDates(): void {
    this.sortDates()
    const earliest = this.dates[0].date
    const latest = this.dates[this.dates.length - 1].date

    for (let i = 1; i <= earliest.weekday(); i++) {
      this.getOrAddSelectableDate(earliest.subtract(i, "days"))
    }

    for (let i = 6; i > latest.weekday(); i--) {
      this.getOrAddSelectableDate(latest.add(i, "days"))
    }
  }

  private async fetchAndSaveData(): Promise<ApiData> {
    this.appState = AppState.FetchingData
    const fetchedData = await DataFetcher.fetchData()
    if (fetchedData === undefined) {
      throw new Error("Count not fetch data.")
    }

    this.appState = AppState.SavingData
    await DataStorer.saveData(fetchedData)

    this.appState = AppState.Idle
    return fetchedData
  }

  public async fetchAndUpdateData(): Promise<void> {
    const data = await this.fetchAndSaveData()
    await this.setData(data)
  }

  public getMovie(movieIndex: number): Movie {
    // TODO: Not sure there is a need for -1 any longer.
    if (movieIndex === -1) {
      return Movie.UndefinedMovie
    }

    const movie = this.movies[movieIndex]
    if (movie === undefined) {
      return Movie.UndefinedMovie
    }

    return movie
  }

  public getOrAddSelectableDate(date: ImmutableDate): SelectableDate {
    const existingSelectableDate = this.dates.find(selectableDate => selectableDate.date.equals(date))
    if (existingSelectableDate !== undefined) {
      return existingSelectableDate
    }

    const newSelectableDate = new SelectableDate(date)
    this.dates.push(newSelectableDate)
    return newSelectableDate
  }

  public getTheater(theaterId: number): Theater {
    const theater = this.theaters[theaterId]

    if (theater === undefined) {
      return Theater.UndefinedTheater
    }

    return theater
  }

  public initialize(): void {
    // TODO: Figure out a better way to implement this.
    reaction(
      () => this.filters.dimensions.threeD,
      () => this.saveSettings()
    )

    reaction(
      () => this.filters.dimensions.twoD,
      () => this.saveSettings()
    )

    reaction(
      () => this.filters.filmType.imax,
      () => this.saveSettings()
    )

    reaction(
      () => this.filters.filmType.standardFilm,
      () => this.saveSettings()
    )

    reaction(
      () => this.filters.language.dubbedToDanish,
      () => this.saveSettings()
    )

    reaction(
      () => this.filters.language.originalLanguage,
      () => this.saveSettings()
    )

    reaction(
      () => this.filters.showingType.normalShowings,
      () => this.saveSettings()
    )

    reaction(
      () => this.filters.showingType.specialShowings,
      () => this.saveSettings()
    )

    reaction(
      () => this.theaters.filter(theater => theater.favorited),
      () => this.saveSettings()
    )

    reaction(
      () => this.theaters.filter(theater => theater.selected),
      () => this.saveSettings()
    )
  }

  public async initializeData(): Promise<void> {
    this.appState = AppState.LoadingData
    const storedData = DataStorer.loadData()

    let data: ApiData
    if (DataStorer.dataIsOkay(storedData)) {
      data = storedData.data
    }
    else {
      data = await this.fetchAndSaveData()
    }

    await this.setData(data)
    this.loadSettings()

    this.appState = AppState.Idle
  }

  private loadSettings(): void {
    this.appState = AppState.LoadingSettings

    const settingsString = localStorage.getItem("settings")

    // tslint:disable-next-line:no-null-keyword
    if (settingsString === null) {
      this.appState = AppState.Idle
      return
    }

    const settings = JSON.parse(settingsString) as Settings

    if (settings.filters !== undefined) {
      this.filters.setValues(settings.filters)
    }

    for (const theater of this.theaters) {
      if (settings.favoritedTheaterIds !== undefined && settings.favoritedTheaterIds.indexOf(theater.theaterId) !== -1) {
        theater.favorited = true
      }

      if (settings.selectedTheaterIds !== undefined && settings.selectedTheaterIds.indexOf(theater.theaterId) !== -1) {
        theater.selected = true
      }
    }

    this.appState = AppState.Idle
  }

  private saveSettings(): void {
    if (this.appState !== AppState.Idle) {
      return
    }

    // TODO: Create a Settings class that will handle the persisted settings.
    const settings: Settings = {
      favoritedTheaterIds: this.theaters.filter(theater => theater.favorited).map(theater => theater.theaterId),
      filters: this.filters,
      selectedTheaterIds: this.theaters.filter(theater => theater.selected).map(theater => theater.theaterId)
    }

    const settingsString = JSON.stringify(settings)
    localStorage.setItem("settings", settingsString)
  }

  public setData(data: ApiData): void {
    this.appState = AppState.ParsingData

    this.dates = []
    // Don't sort the movies and the theaters, because the showings refer to them by index in the arrays.
    this.movies = data.movies.map(serializableMovie => new Movie(serializableMovie))
    this.theaters = data.theaters.map(serializableTheater => new Theater(serializableTheater))

    const now = Date.now()
    this.showings = data.showings
      .filter(serializableShowing => serializableShowing.start >= now)
      .map(serializableShowing => new Showing(serializableShowing, this))
      .sort((showingA, showingB) => showingA.start.diff(showingB.start)) // TODO: Add compare method.

    this.movies = this.movies.sort(Movie.compareByNumberOfShowings)

    this.addMissingDates()
    this.addStartAndEndDates()
    this.sortDates()

    this.appState = AppState.Idle
  }

  public setMovieNameFilter(filter: string): void {
    this.movieNameFilter = Strings.searchable(filter)
  }

  private sortDates(): void {
    this.dates = this.dates.sort((a, b) => a.date.diff(b.date))
  }
}