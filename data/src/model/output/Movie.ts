import { ApiMovie } from "./interface/ApiMovie"
import { MovieLine } from "../input/MovieLine"
import { UrlUtil } from "./UrlUtil"

export class Movie implements ApiMovie {
  constructor(movieLine: MovieLine) {
    if (movieLine.originalTitle === "" && movieLine.danishTitle === "") {
      console.error("Neither original title nor Danish title is defined.")
    }

    this.movieUrl = UrlUtil.getMovieUrl(movieLine.movieUrl)

    if (movieLine.originalTitle === "") {
      this.originalTitle = movieLine.danishTitle
    }
    else {
      this.originalTitle = movieLine.originalTitle

      // Also handles the special case when movieLine.danishTitle is undefined.
      if (movieLine.danishTitle !== movieLine.originalTitle) {
        this.danishTitle = movieLine.danishTitle
      }
    }

    if (movieLine.posterUrl !== Movie.noPosterUrl) {
      this.posterUrl = movieLine.posterUrl
    }
  }

  public readonly danishTitle?: string
  public readonly movieUrl?: string
  public readonly originalTitle: string
  public readonly posterUrl?: string

  public static noMovieUrl = "NO_MOVIE_URL"
  public static noPosterUrl = "NO_POSTER_URL"

  public equals(other: Movie) {
    const equals =
      this.danishTitle === other.danishTitle
      && this.movieUrl === other.movieUrl
      && this.originalTitle === other.originalTitle
      && this.posterUrl === other.posterUrl
    return equals
  }

  public static createFromTitle(originalTitle: string): Movie {
    const fakeMovieLine: MovieLine = {
      danishTitle: originalTitle,
      movieUrl: Movie.noMovieUrl,
      originalTitle: originalTitle,
      posterUrl: Movie.noPosterUrl
    }

    const newMovie = new Movie(fakeMovieLine)
    return newMovie
  }
}