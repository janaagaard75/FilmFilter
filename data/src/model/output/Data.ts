import { Movie } from "./Movie"
import { MovieLine } from "../input/MovieLine"
import { Showing } from "./Showing"
import { ShowingLine } from "../input/ShowingLine"
import { Theater } from "./Theater"
import { TheaterLine } from "../input/TheaterLine"
import { UrlUtil } from "./UrlUtil"

export class Data {
  constructor(
    movieLines: Array<MovieLine>,
    showingLines: Array<ShowingLine>,
    theaterLines: Array<TheaterLine>
  ) {
    this.movies = movieLines
      .map(line => new Movie(line))
      .filter((movie, index, array) => array.findIndex(m => m.equals(movie)) === index)

    this.theaters = theaterLines.map(line => new Theater(line))

    this.showings = showingLines.map(line => new Showing(line, this))
  }

  public readonly movies: Array<Movie>
  public readonly showings: Array<Showing>
  public readonly theaters: Array<Theater>

  public addOrGetMovieIndexFromTitle(originalTitle: string): number {
    const existingMovie = this.movies.find(m => m.movieUrl === undefined && m.originalTitle === originalTitle)

    if (existingMovie === undefined) {
      const newMovie = Movie.createFromTitle(originalTitle)
      this.movies.push(newMovie)
      const movieIndex = this.movies.length - 1
      return movieIndex
    }

    const movieIndex = this.movies.indexOf(existingMovie)
    return movieIndex
  }

  public getMovieIndexFromUrl(prefixedMovieUrl: string): number {
    const movieUrl = UrlUtil.getMovieUrl(prefixedMovieUrl)
    const movie = this.movies.find(m => m.movieUrl === movieUrl)

    if (movie === undefined) {
      return -1
    }

    const movieIndex = this.movies.indexOf(movie)
    return movieIndex
  }

  public getTheaterIndex(prefixedTheaterUrl: string): number {
    const theaterId = UrlUtil.getTheaterId(prefixedTheaterUrl)
    const theater = this.theaters.find(t => t.theaterId === theaterId)

    if (theater === undefined) {
      return -1
    }

    const theaterIndex = this.theaters.indexOf(theater)
    return theaterIndex
  }
}