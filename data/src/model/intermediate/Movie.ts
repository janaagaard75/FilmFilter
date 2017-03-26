import { MovieLine } from "../input/MovieLine"
import { UrlUtil } from "./UrlUtil"

interface MovieWithoutUrl {
  movieId: string
  movieTitle: string
}

export class Movie {
  constructor(movieLineOrMovieWithoutUrl: MovieLine | MovieWithoutUrl) {
    if (Movie.isMovieLine(movieLineOrMovieWithoutUrl)) {
      this.movieUrlOrId = UrlUtil.removeStandardPrefix(movieLineOrMovieWithoutUrl.movieUrl)
      this.originalTitle = movieLineOrMovieWithoutUrl.originalTitle
      this.posterUrl = movieLineOrMovieWithoutUrl.posterUrl

      if (movieLineOrMovieWithoutUrl.danishTitle !== movieLineOrMovieWithoutUrl.originalTitle) {
        this.danishTitle = movieLineOrMovieWithoutUrl.danishTitle
      }
    }
    else {
      this.danishTitle = ""
      // TODO: Figure out how to set the ID. Use a random number?
      this.movieUrlOrId = movieLineOrMovieWithoutUrl.movieId
      this.originalTitle = movieLineOrMovieWithoutUrl.movieTitle
      this.posterUrl = "http://cdn01.kino.dk/sites/default/files/imagecache/k_poster_small/imagefield_default_images/movie-default-poster.jpg"
    }
  }

  private static isMovieLine(x: any): x is MovieLine {
    const isAMovieLine = (x.movieUrl !== undefined)
    return isAMovieLine
  }

  public readonly danishTitle?: string
  /** Short URL, without the standard prefix or an intermediate ID. */
  public readonly movieUrlOrId: string
  public readonly originalTitle: string
  /** Full URL, does not start with the standard prefix. */
  public readonly posterUrl: string
}