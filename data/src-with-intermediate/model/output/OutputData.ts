import { IntermediateData } from "../intermediate/IntermediateData"
import { IntermediateMovie } from "../intermediate/IntermediateMovie"
import { IntermediateTheater } from "../intermediate/IntermediateTheater"
import { Movie } from "./Movie"
import { Showing } from "./Showing"
import { Theater } from "./Theater"

export class OutputData {
  constructor(
    intermediateData: IntermediateData
  ) {
    this.intermediateMovies = intermediateData.movies
    this.movies = intermediateData.movies.map(intermediateMovie => new Movie(intermediateMovie))

    this.theaters = intermediateData.theaters.map(intermediateTheater => new Theater(intermediateTheater))

    this.showings = intermediateData.showings.map(intermediateShowing => new Showing(intermediateShowing, this))
  }

  public movies: Array<Movie>
  public showings: Array<Showing>
  public theaters: Array<Theater>

  private intermediateMovies: Array<IntermediateMovie>

  public getMovieIndex(intermediateMovie: IntermediateMovie): number {
    // Relies on the arrays intermediateMovies and outputMovies having the exact same ordering.
    const movieIndex = this.intermediateMovies.indexOf(intermediateMovie)
    return movieIndex
  }

  public getTheaterIndex(intermediateTheater: IntermediateTheater): number {
    const theater = this.theaters.find(t => t.theaterUrl === intermediateTheater.theaterUrl)
    const theaterIndex = this.theaters.indexOf(theater)
    return theaterIndex
  }
}