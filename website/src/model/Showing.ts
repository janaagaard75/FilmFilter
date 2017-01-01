import * as moment from "moment"
import { Moment } from "moment"

import { Movie } from "./Movie"
import { ShowingData } from "./data/ShowingData"
import { Store } from "./Store"
import { Theater } from "./Theater"

export class Showing {
  constructor(data: ShowingData, store: Store) {
    this.dubbed = data.dubbed
    this.freeSeats = this.getFreeSeats(data.seatingInfo)
    this.imax = data.imax
    this.movie = store.getMovie(data.movieId)
    this.showingUrl = "http://www.kino.dk/" + data.showingUrl
    this.specialShowing = data.specialShowing
    this.start = moment(data.start)
    this.theater = store.getTheater(data.theaterId)
    this.threeD = data.threeD
    this.totalSeats = this.getTotolSeats(data.seatingInfo)

    this.movie.addShowing(this)
  }

  public readonly dubbed: boolean
  public readonly freeSeats: number
  public readonly imax: boolean
  public readonly movie: Movie
  public readonly showingUrl: string
  public readonly specialShowing: boolean
  public readonly start: Moment
  public readonly theater: Theater
  public readonly threeD: boolean
  public readonly totalSeats: number

  private getFreeSeats(seatingInfo: Array<string>): number {
    const freeSeatsLine = seatingInfo.filter(info => info.startsWith("Ledige"))[0]
    const freeSeats = parseInt(freeSeatsLine.substring("Ledige: ".length), 10)
    return freeSeats
  }

  private getTotolSeats(seatingInfo: Array<string>): number {
    const totalSeatsLine = seatingInfo.filter(info => info.startsWith("Sæder"))[0]
    const totalSeats = parseInt(totalSeatsLine.substring("Sæder: ".length), 10)
    return totalSeats
  }
}