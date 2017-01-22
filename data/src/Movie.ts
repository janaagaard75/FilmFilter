import { MovieLine } from './MovieLine'
import { UrlUtil } from './UrlUtil'

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
  public readonly movieUrl: string
  public readonly originalTitle: string
  public readonly posterUrl: string
}