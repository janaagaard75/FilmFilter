import { MovieLine } from './MovieLine'
import { UrlUtil } from './UrlUtil'

export class Movie {
  constructor(line: MovieLine) {
    this.danishTitle = line.danishTitle
    this.movieUrl = UrlUtil.removeStandardPrefix(line.movieUrl)
    this.originalTitle = line.originalTitle
    this.posterUrl = UrlUtil.removeStandardPrefix(line.posterUrl)
  }

  public danishTitle: string
  public movieUrl: string
  public originalTitle: string
  public posterUrl: string
}