import { Movie } from "./Movie"
import { MovieLine } from "../input/MovieLine"
import { Showing } from "./Showing"
import { ShowingLine } from "../input/ShowingLine"
import { Theater } from "./Theater"
import { TheaterLine } from "../input/TheaterLine"

export class OutputData {
  constructor(
    movieLines: Array<MovieLine>,
    showingLines: Array<ShowingLine>,
    theaterLines: Array<TheaterLine>
  ) {
    this.setMovies(movieLines)
    this.setTheaters(theaterLines)
    this.setShowings(showingLines)

    // TODO: Add some code that filters out movies that aren't associated with any showings. This is pretty complicated since the showings currently point to indexes in the movies array.
  }

  public movies: Array<Movie>
  public showings: Array<Showing>
  public theaters: Array<Theater>

  private setMovies(movieLines: Array<MovieLine>): void {
    this.movies = movieLines.map(line => new Movie(line))
  }

  private setShowings(showingLines: Array<ShowingLine>): void {
    if (this.movies.length === 0) {
      throw new Error("No movies. Remember to call setMovies() first.")
    }

    if (this.theaters.length === 0) {
      throw new Error("No theaters. Remember to calls setTheaters() first.")
    }

    this.showings = showingLines.map((line, index) => new Showing(line, index, this.movies, this.theaters))
  }

  private setTheaters(theaterLines: Array<TheaterLine>): void {
    this.theaters = theaterLines.map(line => new Theater(line))
  }
}