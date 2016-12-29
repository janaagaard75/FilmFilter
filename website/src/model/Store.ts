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

    this.movies = new Map()
    this.theaters = new Map()

    this.showings = this.data.showings.map(showingData => new Showing(showingData, this))

    this.movieNameFilter = ''
  }

  private data: Data
  private movies: Map<number, Movie>
  private showings: Array<Showing>
  private theaters: Map<number, Theater>

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

    let movie = this.movies.get(movieId)
    if (movie === undefined) {
      movie = new Movie(this.data.movies[movieId])
      this.movies.set(movieId, movie)
    }

    return movie
  }

  public getTheater(theaterId: number): Theater {
    let theater = this.theaters.get(theaterId)
    if (theater === undefined) {
      theater = new Theater(this.data.theaters[theaterId])
      this.theaters.set(theaterId, theater)
    }

    return theater
  }

  @action
  public setMovieNameFilter(movieName: string) {
    this.movieNameFilter = movieName
  }
}