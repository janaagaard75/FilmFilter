import { Movie } from "./Movie"
import { MovieLine } from "../input/MovieLine"
import { Showing } from "./Showing"
import { ShowingLine } from "../input/ShowingLine"
import { Theater } from "./Theater"
import { TheaterLine } from "../input/TheaterLine"
import { UrlUtil } from "./UrlUtil"

export class OutputData {
  constructor(
    movieLines: Array<MovieLine>,
    showingLines: Array<ShowingLine>,
    theaterLines: Array<TheaterLine>
  ) {
    this.movies = movieLines.map(line => new Movie(line))
    this.theaters = theaterLines.map(line => new Theater(line))

    // Mappaing showings last, since they depend on movies and theaters.
    this.showings = showingLines.map(line => new Showing(line, this))
  }

  public movies: Array<Movie>
  public showings: Array<Showing>
  public theaters: Array<Theater>

  public addOrGetMovieWithoutUrl(movieTitle: string): number {
    const existingMovie = this.movies.find(m => m.movieUrl === "NO_MOVIE_URL" && m.originalTitle === movieTitle)

    if (existingMovie !== undefined) {
      const movieIndex = this.movies.indexOf(existingMovie)
      return movieIndex
    }

    const newMovie = new Movie(movieTitle)
    this.movies.push(newMovie)
    const movieIndex = this.movies.length - 1
    return movieIndex
  }

  public getMovieIndex(prefixedMovieUrl: string): number {
    const movieUrl = UrlUtil.removeStandardPrefix(prefixedMovieUrl)
    const movie = this.movies.find(m => m.movieUrl === movieUrl)

    if (movie === undefined) {
      return -1
    }

    const movieIndex = this.movies.indexOf(movie)
    return movieIndex
  }

  public getTheaterIndex(prefixedTheaterUrl: string): number {
    const theaterUrl = UrlUtil.removeStandardPrefix(prefixedTheaterUrl)
    const theater = this.theaters.find(t => t.theaterUrl === theaterUrl)

    if (theater === undefined) {
      return -1
    }

    const theaterIndex = this.theaters.indexOf(theater)
    return theaterIndex
  }
}