import { IntermediateData } from "./IntermediateData"
import { Movie } from "./Movie"
import { ShowingFlags } from "./ShowingFlags"
import { ShowingLine } from "../input/ShowingLine"
import { Theater } from "./Theater"
import { UrlUtil } from "./UrlUtil"

export class Showing {
  constructor(
    line: ShowingLine,
    outputData: IntermediateData
  ) {
    const movie = outputData.findMovie(line.movieUrl)
    if (movie === undefined) {
      if (line.movieTitle !== "") {
        this.movie = outputData.addMovieWithoutUrl(outputData.movies, line.movieTitle)
      }
    }
    else {
      this.movie = movie
    }

    this.seatingInfo = line.seatingInfo

    this.showingUrl = UrlUtil.removeStandardPrefix(line.showingUrl)

    this.start = line.start

    this.theater = outputData.findTheater(line.theaterUrl)

    this.setFlag(ShowingFlags.SpecialShowing, line.version.includes("Særvisning"))

    this.setFlag(ShowingFlags.Dubbed, line.version.includes("dansk tale"))

    this.setFlag(ShowingFlags.Imax, line.version.includes("IMAX 2D") || line.version.includes("IMAX 3D"))

    this.setFlag(ShowingFlags.ThreeD, line.version.includes("3D") || line.version.includes("IMAX 3D"))
  }

  public flags: ShowingFlags
  public readonly movie: Movie | undefined
  public readonly seatingInfo: Array<string>
  public readonly showingUrl: string
  public readonly start: string
  public readonly theater: Theater | undefined

  private setFlag(flag: ShowingFlags, value: boolean): void {
    if (value) {
      this.flags |= flag
    }
    else {
      this.flags &= ~flag
    }
  }
}