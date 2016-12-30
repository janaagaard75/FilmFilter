import { action } from 'mobx'
import { computed } from 'mobx'
import { observable } from 'mobx'

import { Data } from './data/Data'
import { Movie } from './Movie'
import { Showing } from './Showing'
import { Theater } from './Theater'

export class Store {
  constructor() {
    this.data = require<Data>('../data.json')

    this.movies = this.data.movies.map(movieData => new Movie(movieData))

    this.theaters = this.data.theaters
      .map(theaterData => new Theater(theaterData))
      .sort((a, b) => this.compareByName(a, b))

    this.showings = this.data.showings.map(showingData => new Showing(showingData, this))

    this.movieNameFilter = ''
  }

  private data: Data
  private movies: Array<Movie>
  private showings: Array<Showing>
  public theaters: Array<Theater>

  @observable
  private movieNameFilter: string

  @computed
  public get matchingShowings(): Array<Showing> {
    const matching = this.showings
      // TODO: Support movies that don't have a separate move page.
      .filter(showing => showing.movie !== undefined)
      .filter(showing => this.matchesMovieName(showing))
      .sort((showingA, showingB) => showingA.start.diff(showingB.start))
      .slice(0, 100)
    return matching
  }

  private matchesMovieName(showing: Showing) {
    const match = showing.movie.lowerCaseTitle.indexOf(this.movieNameFilter.toLocaleLowerCase()) >= 0
    return match
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

  public getTheater(theaterId: number): Theater {
    const theater = this.theaters[theaterId]

    if (theater === undefined) {
      return Theater.UndefinedTheater
    }

    return theater
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

  @action
  public setMovieNameFilter(movieName: string) {
    this.movieNameFilter = movieName
  }
}