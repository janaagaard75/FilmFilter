import { Movie } from "./Movie"
import { ShowingFlags } from "./ShowingFlags"
import { ShowingLine } from "../input/ShowingLine"
import { Theater } from "./Theater"
import { UrlUtil } from "./UrlUtil"

export class Showing {
  constructor(
    line: ShowingLine,
    lineIndex: number,
    movies: Array<Movie>,
    theaters: Array<Theater>
  ) {
    if (line.movieUrl === "NO_MOVIE_URL") {
      this.movieId = -1
      // TODO: Use the movieTitle property. Add a new movie, or add a movieTitle property to Showing?
    }
    else {
      const movieUrl = UrlUtil.removeStandardPrefix(line.movieUrl)
      const movie = movies.find(m => m.movieUrl === movieUrl)
      if (movie === undefined) {
        this.movieId = -1
      }
      else {
        this.movieId = movies.indexOf(movie)
      }
    }

    this.seatingInfo = line.seatingInfo

    this.showingUrl = UrlUtil.removeStandardPrefix(line.showingUrl)

    this.start = line.start

    const theaterUrl = UrlUtil.removeStandardPrefix(line.theaterUrl)
    const theater = theaters.find(t => t.theatherUrl === theaterUrl)
    if (theater === undefined) {
      console.error(`Theater with url '${theaterUrl}' was not found, line number ${lineIndex + 1}.`)
      this.theaterId = -1
    }
    else {
      this.theaterId = theaters.indexOf(theater)
    }

    this.setFlag(ShowingFlags.SpecialShowing, line.version.find(flag => flag === "Særvisning") !== undefined)

    this.setFlag(ShowingFlags.Dubbed, line.version.find(flag => flag === "dansk tale") !== undefined)

    this.setFlag(ShowingFlags.Imax, line.version.find(flag => flag === "IMAX 2D" || flag === "IMAX 3D") !== undefined)

    this.setFlag(ShowingFlags.ThreeD, line.version.find(flag => flag === "3D" || flag === "IMAX 3D") !== undefined)
  }

  public flags: ShowingFlags
  public readonly movieId: number
  public readonly seatingInfo: Array<string>
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

// TODO: Consider this Array.includes polyfill: http://stackoverflow.com/questions/37640785/how-do-you-add-polyfills-to-globals-in-typescript-modules