import { autorun } from "mobx"
import { computed } from "mobx"
import { observable } from "mobx"

import { AppState } from "./AppState"
import { Comparer } from "../utilities/Comparer"
import { Data } from "./data/Data"
import { DataFetcher } from "./DataFetcher"
import { DataStorer } from "./DataStorer"
import { Dates } from "../utilities/Dates"
import { Filters } from "./filters/Filters"
import { ImmutableDate } from "./moment/ImmutableDate"
import { Logger } from "../utilities/Logger"
import { Movie } from "./Movie"
import { SelectableDate } from "./SelectableDate"
import { Settings } from "./Settings"
import { Showing } from "./Showing"
import { Theater } from "./Theater"

export class Store {
  @observable public dates: Array<SelectableDate> = []
  public readonly filters = new Filters()
  @observable private movieNameFilter: string = ""
  @observable private movies: Array<Movie> = []
  @observable private showings: Array<Showing> = []
  @observable public state: AppState = AppState.Idle
  @observable private theaters: Array<Theater> = []

  @computed
  public get matchingMovies(): Array<Movie> {
    const matchingMovies = this.movies.filter(movie => movie.titleMatchesFilter(this.movieNameFilter))
    return matchingMovies
  }

  @computed
  public get matchingShowings(): Array<Showing> {
    const matching = this.showings
      .filter(showing => showing.movie !== undefined)
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
  public get theatersSortedByName(): Array<Theater> {
    const sortedTheaters = this.theaters.sort(Comparer.compareByName)
    return sortedTheaters
  }

  private addMissingDates() {
    this.sortDates()
    const earliest = this.dates[0].date
    const latest = this.dates[this.dates.length - 1].date

    for (let date = earliest; !date.equals(latest); date = date.add(1, "day")) {
      this.getOrAddSelectableDate(date)
    }
  }

  private addStartAndEndDates() {
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

  public async fetchAndUpdateData(): Promise<void> {
    this.state = AppState.FetchingData
    const fetchedData = await DataFetcher.fetchData()
    if (fetchedData === undefined) {
      throw new Error("Could not fetch data.")
    }

    this.state = AppState.SavingData
    DataStorer.saveData(fetchedData)

    this.setData(fetchedData)
    this.loadSettings()

    this.state = AppState.Idle
  }

  public getMovie(movieId: number): Movie {
    if (movieId === -1) {
      return Movie.UndefinedMovie
    }

    const movie = this.movies[movieId]
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

  public initialize() {
    autorun(() => this.saveSettings())
  }

  public initializeData(): void {
    this.state = AppState.LoadingData
    const storedData = DataStorer.loadData()
    if (DataStorer.dataIsOkay(storedData)) {
      this.setData(storedData.data)
      this.loadSettings()
    }
    else {
      this.fetchAndUpdateData()
    }

    this.state = AppState.Idle
  }

  private loadSettings() {
    this.state = AppState.LoadingSettings
    Logger.log("Loading settings.")

    const settingsString = localStorage.getItem("settings")

    // tslint:disable-next-line:no-null-keyword
    if (settingsString === null) {
      Logger.log("No settings.")
      this.state = AppState.Idle
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

    this.state = AppState.Idle
  }

  private saveSettings() {
    if (this.state !== AppState.Idle) {
      Logger.log(`Not saving settings since the app state is ${AppState[this.state]}.`)
      return
    }

    Logger.log("Saving settings.")

    const settings: Settings = {
      favoritedTheaterIds: this.theaters.filter(theater => theater.favorited).map(theater => theater.theaterId),
      filters: this.filters,
      selectedTheaterIds: this.theaters.filter(theater => theater.selected).map(theater => theater.theaterId)
    }

    const settingsString = JSON.stringify(settings)
    localStorage.setItem("settings", settingsString)
  }

  public setData(data: Data) {
    this.state = AppState.ParsingData

    // TODO: Consider using a worker thread to parse this in a separate thread.
    this.dates = []
    this.movies = data.movies.map(movieData => new Movie(movieData))
    // Don't sort the theaters, because the showings refer to them by ID in the array.
    this.theaters = data.theaters.map(theaterData => new Theater(theaterData))

    // TODO: The date strings are being parsed twice, both in here and in the ImmutableMoment constructor. Consider fixing this by adding an intermediate model where start is a date.
    const now = Date.now()
    this.showings = data.showings
      .filter(showingData => Dates.parseAsLocalDateTime(showingData.start).valueOf() >= now)
      .map(showingData => new Showing(showingData, this))
      .sort((showingA, showingB) => showingA.start.diff(showingB.start))

    this.movies = this.movies.sort(Movie.compareByNumberOfShowings)

    this.addMissingDates()
    this.addStartAndEndDates()
    this.sortDates()

    this.state = AppState.Idle
  }

  public setMovieNameFilter(filter: string) {
    this.movieNameFilter = filter.toLocaleLowerCase()
  }

  private sortDates() {
    this.dates = this.dates.sort((a, b) => a.date.diff(b.date))
  }
}