import { MovieLine } from "../input/MovieLine"
import { UrlUtil } from "./UrlUtil"

export class Movie {
  constructor(line: MovieLine) {
    this.movieUrl = UrlUtil.removeStandardPrefix(line.movieUrl)
    this.originalTitle = line.originalTitle
    this.posterUrl = line.posterUrl

    if (line.danishTitle !== line.originalTitle) {
      this.danishTitle = line.danishTitle
    }
  }

  public readonly danishTitle?: string
  /** Short URL, without the standard prefix. */
  public readonly movieUrl: string
  public readonly originalTitle: string
  /** Full URL, does not start with the standard prefix. */
  public readonly posterUrl: string
}