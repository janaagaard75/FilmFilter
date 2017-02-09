import { action } from "mobx"
import { computed } from "mobx"
import { observable } from "mobx"

import { compareByName } from "../utilities"
import { Data } from "./data/Data"
import { ImmutableDate } from "./ImmutableDate"
import { Movie } from "./Movie"
import { parseAsLocalDateTime } from "../utilities"
import { SelectableDate } from "./SelectableDate"
import { Showing } from "./Showing"
import { Theater } from "./Theater"

export class Store {
  constructor() {
    this.dates = []
    this.movies = []
    this.showings = []
    this.theaters = []
    this.fetchingAndParsing = false
  }

  @observable private data: Data | undefined
  @observable public dates: Array<SelectableDate>
  @observable private movies: Array<Movie>
  @observable private showings: Array<Showing>
  @observable private theaters: Array<Theater>
  @observable private fetchingAndParsing: boolean

  @computed
  public get matchingShowings(): Array<Showing> {
    const matching = this.showings
      // TODO: Support movies that don't have a separate move page.
      .filter(showing => showing.movie !== undefined)
      .filter(showing => this.selectedMovies.length === 0 || showing.movie.selected)
      .filter(showing => this.selectedTheaters.length === 0 || showing.theater.selected)
      .filter(showing => this.selectedDates.length === 0 || showing.date.selected)

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
    const selectedTheaters = this.theaters.filter(theater => theater.selected)
    return selectedTheaters
  }

  private addMissingDates() {
    this.sortDates()
    const earliest = this.dates[0].date
    const latest = this.dates[this.dates.length - 1].date

    for (let date = earliest; date.equals(latest); date = date.add(1, "day")) {
      this.getOrAddSelectableDate(date)
    }
  }

  private addStartAndEndDates() {
    this.sortDates()
    const earliest = this.dates[0].date
    const latest = this.dates[this.dates.length - 1].date

    for (let i = 1; i < earliest.weekday(); i++) {
      this.getOrAddSelectableDate(earliest.subtract(i, "days"))
    }

    for (let i = 6; i > latest.weekday(); i--) {
      this.getOrAddSelectableDate(latest.add(i, "days"))
    }
  }

  public getFetchingAndParsing(): boolean {
    return this.fetchingAndParsing
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

  public getMoviesSortedByNumberOfShowings(): Array<Movie> {
    const sorted = this.movies.sort((a, b) => b.showings.length - a.showings.length)
    return sorted
  }

  @action
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

  public getTheatersSortedByName(): Array<Theater> {
    const sortedByName = this.theaters.sort(compareByName)
    return sortedByName
  }

  @action
  public setData(data: Data) {
    this.data = data

    this.dates = []
    this.movies = this.data.movies.map(movieData => new Movie(movieData))
    this.theaters = this.data.theaters.map(theaterData => new Theater(theaterData))

    // TODO: The date strings are now being parsed twice, both in here and in the ImmutableMoment constructor. Consider fixing this by adding an intermediate model where start is a date.
    const now = Date.now()
    this.showings = this.data.showings
      .filter(showingData => parseAsLocalDateTime(showingData.start).valueOf() >= now)
      .map(showingData => new Showing(showingData, this))
      .sort((showingA, showingB) => showingA.start.diff(showingB.start))

    this.addMissingDates()
    this.addStartAndEndDates()
    this.sortDates()
  }

  @action
  public setFetchingAndParsing(updating: boolean) {
    this.fetchingAndParsing = updating
  }

  private sortDates() {
    this.dates = this.dates.sort((a, b) => a.date.diff(b.date))
  }
}