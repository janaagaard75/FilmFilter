import { Data } from "./Data"
import { Movie } from "./Movie"
import { ShowingFlags } from "./ShowingFlags"
import { ShowingLine } from "../input/ShowingLine"
import { UrlUtil } from "./UrlUtil"

export class Showing {
  constructor(
    showingLine: ShowingLine,
    outputData: Data
  ) {
    if (showingLine.movieUrl === Movie.noMovieUrl) {
      this.movieIndex = outputData.addOrGetMovieIndexFromTitle(showingLine.movieTitle)
    }
    else {
      this.movieIndex = outputData.getMovieIndexFromUrl(showingLine.movieUrl)
    }

    this.freeSeats = Showing.getFreeSeats(showingLine.seatingInfo)
    this.totalSeats = Showing.getTotalSeats(showingLine.seatingInfo)

    this.showingId = UrlUtil.getShowingId(showingLine.showingUrl)
    this.start = Showing.convertDateTimeToNumber(showingLine.start)
    this.theaterIndex = outputData.getTheaterIndex(showingLine.theaterUrl)

    this.setFlag(ShowingFlags.SpecialShowing, showingLine.version.includes("Særvisning"))
    this.setFlag(ShowingFlags.Dubbed, showingLine.version.includes("dansk tale"))
    this.setFlag(ShowingFlags.Imax, showingLine.version.includes("IMAX 2D") || showingLine.version.includes("IMAX 3D"))
    this.setFlag(ShowingFlags.ThreeD, showingLine.version.includes("3D") || showingLine.version.includes("IMAX 3D"))
  }

  public flags: ShowingFlags
  public readonly freeSeats: number
  public readonly movieIndex: number
  public readonly showingId: number
  public readonly start: number
  public readonly theaterIndex: number
  public readonly totalSeats: number

  private static convertDateTimeToNumber(dateTimeString: string): number {
    const numbers = dateTimeString.split(/\D/)
    const dateTime = new Date(
      parseInt(numbers[0], 10),
      parseInt(numbers[1], 10) - 1,
      parseInt(numbers[2], 10),
      parseInt(numbers[3], 10),
      parseInt(numbers[4], 10),
      parseInt(numbers[5], 10))
    const dateTimeNumber = dateTime.valueOf()
    return dateTimeNumber
  }

  private static getFreeSeats(seatingInfo: Array<string>): number {
    const freeSeatsLine = seatingInfo.filter(info => info.startsWith("Ledige"))[0]
    const freeSeats = parseInt(freeSeatsLine.substring("Ledige: ".length), 10)
    return freeSeats
  }

  private static getTotalSeats(seatingInfo: Array<string>): number {
    const totalSeatsLine = seatingInfo.filter(info => info.startsWith("Sæder"))[0]
    const totalSeats = parseInt(totalSeatsLine.substring("Sæder: ".length), 10)
    return totalSeats
  }

  private setFlag(flag: ShowingFlags, value: boolean): void {
    if (value) {
      this.flags |= flag
    }
    else {
      this.flags &= ~flag
    }
  }
}