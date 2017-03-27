import { OutputData } from "./OutputData"
import { ShowingFlags } from "./ShowingFlags"
import { ShowingLine } from "../input/ShowingLine"

export class Showing {
  constructor(
    line: ShowingLine,
    outputData: OutputData
  ) {
    if (line.movieUrl === "NO_MOVIE_URL") {
      this.movieIndex = outputData.addOrGetMovieWithoutUrl(line.movieTitle)
    }
    else {
      this.movieIndex = outputData.getMovieIndex(line.movieUrl)
    }

    this.seatingInfo = line.seatingInfo
    this.showingId = Showing.getShowingId(line.showingUrl)
    this.start = line.start
    this.theaterIndex = outputData.getTheaterIndex(line.theaterUrl)

    this.setFlag(ShowingFlags.SpecialShowing, line.version.includes("Særvisning"))
    this.setFlag(ShowingFlags.Dubbed, line.version.includes("dansk tale"))
    this.setFlag(ShowingFlags.Imax, line.version.includes("IMAX 2D") || line.version.includes("IMAX 3D"))
    this.setFlag(ShowingFlags.ThreeD, line.version.includes("3D") || line.version.includes("IMAX 3D"))
  }

  public flags: ShowingFlags
  /** Index in the movies array. May be -1. */
  public readonly movieIndex: number
  public readonly seatingInfo: Array<string>
  /** ID in the URL to the showing, that is http://www.kino.dk/ticketflow/<showingId>. */
  public readonly showingId: number
  public readonly start: string
  /** Index in the theaters array. May be -1. */
  public readonly theaterIndex: number

  private setFlag(flag: ShowingFlags, value: boolean): void {
    if (value) {
      this.flags |= flag
    }
    else {
      this.flags &= ~flag
    }
  }

  private static getShowingId(showingUrl: string): number {
    const showingUrlPrefix = "http://www.kino.dk/ticketflow/"
    const showingId = parseInt(showingUrl.slice(showingUrlPrefix.length), 10)
    return showingId
  }
}