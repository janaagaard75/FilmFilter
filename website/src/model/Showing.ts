import { MovieData } from './Data'
import { ShowingData } from './Data'
import { Store } from './Store'

export class Showing {
  constructor(data: ShowingData, store: Store) {
    this.dubbed = data.dubbed
    this.imax = data.imax
    this.showingUrl = 'http://www.kino.dk/' + data.showingUrl
    this.specialShowing = data.specialShowing
    this.start = new Date(data.start)
    this.theaterId = data.theaterId
    this.threeD = data.threeD

    if (data.movieId === -1) {
      this.movie = undefined
    }
    else {
      this.movie = store.data.movies[data.movieId]
    }
  }

  public readonly dubbed: boolean
  public readonly imax: boolean
  public readonly movie?: MovieData
  public readonly showingUrl: string
  public readonly specialShowing: boolean
  public readonly start: Date
  public readonly theaterId: number
  public readonly threeD: boolean
}

// TODO: This class is not yet used.