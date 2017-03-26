import { OutputData } from "./OutputData"
import { ShowingFlags } from "./ShowingFlags"
import { ShowingLine } from "../input/ShowingLine"
import { UrlUtil } from "./UrlUtil"

export class Showing {
  constructor(
    line: ShowingLine,
    outputData: OutputData
  ) {
    if (line.movieUrl === "NO_MOVIE_URL") {
      this.movieId = outputData.addMovieWithoutUrl(line.movieTitle)
    }
    else {
      this.movieId = outputData.getMovieIndex(line.movieUrl)
    }

    this.seatingInfo = line.seatingInfo
    this.showingUrl = UrlUtil.removeStandardPrefix(line.showingUrl)
    this.start = line.start
    this.theaterId = outputData.getTheaterIndex(line.theaterUrl)

    this.setFlag(ShowingFlags.SpecialShowing, line.version.includes("Særvisning"))

    this.setFlag(ShowingFlags.Dubbed, line.version.includes("dansk tale"))

    this.setFlag(ShowingFlags.Imax, line.version.includes("IMAX 2D") || line.version.includes("IMAX 3D"))

    this.setFlag(ShowingFlags.ThreeD, line.version.includes("3D") || line.version.includes("IMAX 3D"))
  }

  public flags: ShowingFlags
  public readonly movieId: number
  public readonly seatingInfo: Array<string>
  /** Short URL, without the standard prefix or an intermediate ID. */
  public readonly showingUrl: string
  public readonly start: string
  public readonly theaterId: number

  private setFlag(flag: ShowingFlags, value: boolean): void {
    if (value) {
      this.flags |= flag
    }
    else {
      this.flags &= ~flag
    }
  }
}