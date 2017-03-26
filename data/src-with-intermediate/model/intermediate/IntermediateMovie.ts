import { IntermediateData } from "./IntermediateData"
import { MovieLine } from "../input/MovieLine"
import { UrlUtil } from "./UrlUtil"

interface MovieWithoutUrl {
  movieTitle: string
}

export class IntermediateMovie {
  constructor(movieLineOrMovieWithoutUrl: MovieLine | MovieWithoutUrl, data: IntermediateData) {
    this.movieId = data.getNextMovieId()

    if (IntermediateMovie.isMovieLine(movieLineOrMovieWithoutUrl)) {
      this.movieUrl = UrlUtil.removeStandardPrefix(movieLineOrMovieWithoutUrl.movieUrl)
      this.originalTitle = movieLineOrMovieWithoutUrl.originalTitle
      this.posterUrl = movieLineOrMovieWithoutUrl.posterUrl

      if (movieLineOrMovieWithoutUrl.danishTitle !== movieLineOrMovieWithoutUrl.originalTitle) {
        this.danishTitle = movieLineOrMovieWithoutUrl.danishTitle
      }
    }
    else {
      this.danishTitle = ""
      this.movieUrl = undefined
      this.originalTitle = movieLineOrMovieWithoutUrl.movieTitle
      this.posterUrl = "http://cdn01.kino.dk/sites/default/files/imagecache/k_poster_small/imagefield_default_images/movie-default-poster.jpg"
    }
  }

  private static isMovieLine(x: any): x is MovieLine {
    const isAMovieLine = (x.movieUrl !== undefined)
    return isAMovieLine
  }

  public readonly movieId: number
  public readonly danishTitle?: string
  /** Short URL, without the standard prefix or an intermediate ID. */
  public readonly movieUrl: string | undefined
  public readonly originalTitle: string
  /** Full URL, does not start with the standard prefix. */
  public readonly posterUrl: string
}