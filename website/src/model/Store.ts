import * as moment from "moment"
import { action } from "mobx"
import { computed } from "mobx"

import { Data } from "./data/Data"
import { Movie } from "./Movie"
import { Showing } from "./Showing"
import { Theater } from "./Theater"

export class Store {
  constructor() {
    this.data = require<Data>("../data.json")

    this.movies = this.data.movies.map(movieData => new Movie(movieData))

    this.theaters = this.data.theaters
      .map(theaterData => new Theater(theaterData))
      .sort((a, b) => this.compareByName(a, b))

    this.showings = this.data.showings.map(showingData => new Showing(showingData, this))
  }

  private readonly data: Data
  private readonly movies: Array<Movie>
  private readonly showings: Array<Showing>
  public readonly theaters: Array<Theater>

  @computed
  public get matchingShowings(): Array<Showing> {
    const now = moment()

    const matching = this.showings
      // TODO: Support movies that don't have a separate move page.
      .filter(showing => showing.movie !== undefined)
      .filter(showing => showing.start > now)
      .filter(showing => this.selectedMovies.length === 0 || showing.movie.selected)
      .filter(showing => this.selectedTheaters.length === 0 || showing.theater.selected)
      .sort((showingA, showingB) => showingA.start.diff(showingB.start))
    return matching
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

  public getTheater(theaterId: number): Theater {
    const theater = this.theaters[theaterId]

    if (theater === undefined) {
      return Theater.UndefinedTheater
    }

    return theater
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