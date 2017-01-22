import { Movie } from './Movie'
import { ShowingLine } from './ShowingLine'
import { Theater } from './Theater'
import { UrlUtil } from './UrlUtil'

export class Showing {
  constructor(
    line: ShowingLine,
    lineIndex: number,
    movies: Array<Movie>,
    theaters: Array<Theater>
  ) {
    this.dubbed = (line.version.find(flag => flag === 'dansk tale') !== undefined)

    this.imax = (line.version.find(flag => flag === 'IMAX 2D' || flag === 'IMAX 3D') !== undefined)

    if (line.movieUrl === 'NO_MOVIE_URL') {
      this.movieId = -1
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

    this.specialShowing = (line.version.find(flag => flag === 'Særvisning') !== undefined)

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

    this.threeD = (line.version.find(flag => flag === '3D' || flag === 'IMAX 3D') !== undefined)
  }

  public readonly dubbed: boolean
  public readonly imax: boolean
  public readonly movieId: number
  public readonly seatingInfo: Array<string>
  public readonly showingUrl: string
  public readonly specialShowing: boolean
  public readonly start: string
  public readonly theaterId: number
  public readonly threeD: boolean
}

// TODO: Consider the includes polyfill: http://stackoverflow.com/questions/37640785/how-do-you-add-polyfills-to-globals-in-typescript-modules