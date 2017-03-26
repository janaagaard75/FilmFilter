import { MovieLine } from "../input/MovieLine"
import { UrlUtil } from "./UrlUtil"

export class Movie {
  constructor(lineOrTitle: MovieLine | string) {
    if (Movie.isMovieLine(lineOrTitle)) {
      this.movieUrl = UrlUtil.removeStandardPrefix(lineOrTitle.movieUrl)
      this.originalTitle = lineOrTitle.originalTitle
      this.posterUrl = lineOrTitle.posterUrl

      if (lineOrTitle.danishTitle !== lineOrTitle.originalTitle) {
        this.danishTitle = lineOrTitle.danishTitle
      }
    }
    else {
      this.danishTitle = ""
      this.movieUrl = undefined
      this.originalTitle = lineOrTitle
      this.posterUrl = "http://cdn01.kino.dk/sites/default/files/imagecache/k_poster_small/imagefield_default_images/movie-default-poster.jpg"
    }
  }

  public readonly danishTitle?: string
  /** Short URL, without the standard prefix or an intermediate ID. */
  public readonly movieUrl?: string
  public readonly originalTitle: string
  /** Full URL, does not start with the standard prefix. */
  public readonly posterUrl: string

  private static isMovieLine(x: any): x is MovieLine {
    const isAMovieLine = (x.movieUrl !== undefined)
    return isAMovieLine
  }
}