import { IntermediateMovie } from "../intermediate/IntermediateMovie"

export class Movie {
  constructor(intermediateMovie: IntermediateMovie) {
    this.danishTitle = intermediateMovie.danishTitle
    this.movieUrl = intermediateMovie.movieUrl
    this.originalTitle = intermediateMovie.originalTitle
    this.posterUrl = intermediateMovie.posterUrl
  }

  public readonly danishTitle?: string
  /** Short URL, without the standard prefix. */
  public readonly movieUrl: string | undefined
  public readonly originalTitle: string
  /** Full URL, does not start with the standard prefix. */
  public readonly posterUrl: string
}