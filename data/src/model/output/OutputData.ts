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
    this.showings = showingLines.map((line, index) => new Showing(line, index, this.theaters, this))
  }

  public movies: Array<Movie>
  public showings: Array<Showing>
  public theaters: Array<Theater>

  public addMovieWithoutUrl(movieTitle: string): number {
    const newMovie = new Movie(movieTitle)
    this.movies.push(newMovie)
    const movieId = this.movies.length - 1
    return movieId
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
}