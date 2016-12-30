import * as moment from 'moment'
import { Moment } from 'moment'

import { Movie } from './Movie'
import { ShowingData } from './data/ShowingData'
import { Store } from './Store'
import { Theater } from './Theater'

export class Showing {
  constructor(data: ShowingData, store: Store) {
    this.dubbed = data.dubbed
    this.imax = data.imax
    this.movie = store.getMovie(data.movieId)
    this.showingUrl = 'http://www.kino.dk/' + data.showingUrl
    this.specialShowing = data.specialShowing
    this.start = moment(data.start)
    this.theater = store.getTheater(data.theaterId)
    this.threeD = data.threeD

    this.movie.addShowing(this)
  }

  public readonly dubbed: boolean
  public readonly imax: boolean
  public readonly movie: Movie
  public readonly showingUrl: string
  public readonly specialShowing: boolean
  public readonly start: Moment
  public readonly theater: Theater
  public readonly threeD: boolean
}