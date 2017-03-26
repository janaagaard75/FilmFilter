import { Movie } from "./Movie"
import { MovieLine } from "../input/MovieLine"
import { Showing } from "./Showing"
import { ShowingLine } from "../input/ShowingLine"
import { Theater } from "./Theater"
import { TheaterLine } from "../input/TheaterLine"

export class OutputData {
  public movies: Array<Movie> = []
  public showings: Array<Showing> = []
  public theaters: Array<Theater> = []

  public setMovies(movieLines: Array<MovieLine>): void {
    this.movies = movieLines.map(line => new Movie(line))
  }

  /** Movies and theaters must have been set before settings the showings. */
  public setShowings(showingLines: Array<ShowingLine>): void {
    if (this.movies.length === 0) {
      throw new Error("No movies. Remember to call setMovies() first.")
    }

    if (this.theaters.length === 0) {
      throw new Error("No theaters. Remember to calls setTheaters() first.")
    }

    this.showings = showingLines.map((line, index) => new Showing(line, index, this.movies, this.theaters))
  }

  public setTheaters(theaterLines: Array<TheaterLine>): void {
    this.theaters = theaterLines.map(line => new Theater(line))
  }
}