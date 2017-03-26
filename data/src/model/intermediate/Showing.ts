import { IntermediateData } from "./IntermediateData"
import { ShowingFlags } from "./ShowingFlags"
import { ShowingLine } from "../input/ShowingLine"
import { UrlUtil } from "./UrlUtil"

export class Showing {
  constructor(
    line: ShowingLine,
    lineIndex: number,
    outputData: IntermediateData
  ) {
    if (line.movieUrl === "NO_MOVIE_URL") {
      this.movieId = outputData.addMovieWithoutUrl(outputData.movies, line.movieTitle)
    }
    else {
      this.movieId = outputData.findMovie(line.movieUrl)
    }

    this.seatingInfo = line.seatingInfo

    this.showingUrl = UrlUtil.removeStandardPrefix(line.showingUrl)

    this.start = line.start

    this.theaterId = outputData.findTheater(line.theaterUrl, lineIndex)

    this.setFlag(ShowingFlags.SpecialShowing, line.version.includes("Særvisning"))

    this.setFlag(ShowingFlags.Dubbed, line.version.includes("dansk tale"))

    this.setFlag(ShowingFlags.Imax, line.version.includes("IMAX 2D") || line.version.includes("IMAX 3D"))

    this.setFlag(ShowingFlags.ThreeD, line.version.includes("3D") || line.version.includes("IMAX 3D"))
  }

  public flags: ShowingFlags
  public readonly movieId: number
  public readonly seatingInfo: Array<string>
  /** Short URL, without the standard prefix. */
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