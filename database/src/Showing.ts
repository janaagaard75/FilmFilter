import { Movie } from './Movie'
import { ShowingLine } from './ShowingLine'
import { Theater } from './Theater'
import { UrlUtil } from './UrlUtil'
import { Versions } from './Versions'

export class Showing {
  constructor(
    line: ShowingLine,
    movies: Array<Movie>,
    theaters: Array<Theater>,
    versions: Versions
  ) {
    this.start = new Date(line.start)

    const movieUrl = UrlUtil.removeStandardPrefix(line.movieUrl)
    const movie = movies.find(m => m.movieUrl === movieUrl)
    if (movie === undefined) {
      console.error(`Movie with url ${movieUrl} was not found.`)
      this.movieId = -1
    }
    else {
      this.movieId = movies.indexOf(movie)
    }

    this.versionId = versions.getVersionId(line.versionFlags)

    const theaterUrl = UrlUtil.removeStandardPrefix(line.theatherUrl)
    const theater = theaters.find(t => t.theatherUrl === theaterUrl)
    if (theater === undefined) {
      console.error(`Theater with url ${theaterUrl} was not found.`)
      this.theaterId = -1
    }
    else {
      this.theaterId = theaters.indexOf(theater)
    }
  }

  public readonly movieId: number
  public readonly start: Date
  public readonly theaterId: number
  public readonly versionId: number
}