import * as moment from "moment"
import { action } from "mobx"
import { computed } from "mobx"
import { Moment } from "moment"

import { Data } from "./data/Data"
import { Movie } from "./Movie"
import { SelectableDate } from "./SelectableDate"
import { Showing } from "./Showing"
import { Theater } from "./Theater"

export class Store {
  constructor() {
    this.data = require<Data>("../data.json")

    this.dates = []
    this.movies = this.data.movies.map(movieData => new Movie(movieData))
    this.theaters = this.data.theaters.map(theaterData => new Theater(theaterData))
    this.showings = this.data.showings.map(showingData => new Showing(showingData, this))
  }

  private readonly data: Data
  public readonly dates: Array<SelectableDate>
  private readonly movies: Array<Movie>
  private readonly showings: Array<Showing>
  private readonly theaters: Array<Theater>

  @computed
  public get matchingShowings(): Array<Showing> {
    const now = moment()

    const matching = this.showings
      // TODO: Support movies that don't have a separate move page.
      .filter(showing => showing.movie !== undefined)
      .filter(showing => showing.start > now)
      .filter(showing => this.selectedMovies.length === 0 || showing.movie.selected)
      .filter(showing => this.selectedTheaters.length === 0 || showing.theater.selected)
      .filter(showing => this.selectedDates.length === 0 || showing.date.selected)
      .sort((showingA, showingB) => showingA.start.diff(showingB.start))
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

  private compareByName(a: Theater, b: Theater) {
    if (a.name > b.name) {
      return 1
    }

    if (a.name < b.name) {
      return -1
    }

    return 0
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

  public getMoviesByNumberOfShowings(): Array<Movie> {
    const sorted = this.movies.sort((a, b) => b.showings.length - a.showings.length)
    return sorted
  }

  public getSelectableDate(date: Moment): SelectableDate {
    const newSelectableDate = new SelectableDate(date)
    const existingSelectableDate = this.dates.find(selectableDate => selectableDate.date.unix() === newSelectableDate.date.unix())

    if (existingSelectableDate === undefined) {
      this.dates.push(newSelectableDate)
      this.dates.sort((a, b) => a.date.unix() - b.date.unix())
      return newSelectableDate
    }

    return existingSelectableDate
  }

  public getTheater(theaterId: number): Theater {
    const theater = this.theaters[theaterId]

    if (theater === undefined) {
      return Theater.UndefinedTheater
    }

    return theater
  }

  public getTheatersSortedByName(): Array<Theater> {
    const sortedByName = this.theaters.sort(this.compareByName)
    return sortedByName
  }

  @action
  public toggleDateSelection(date: SelectableDate) {
    date.selected = !date.selected
  }

  // TODO: Is it worth using actions at thus forcing this method?
  @action
  public toggleMovieSelection(movie: Movie) {
    movie.selected = !movie.selected
  }

  @action
  public toggleTheaterSelection(theater: Theater) {
    theater.selected = !theater.selected
  }
}