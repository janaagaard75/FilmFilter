import { IntermediateMovie } from "./IntermediateMovie"
import { IntermediateShowing } from "./IntermediateShowing"
import { IntermediateTheater } from "./IntermediateTheater"
import { MovieLine } from "../input/MovieLine"
import { ShowingLine } from "../input/ShowingLine"
import { TheaterLine } from "../input/TheaterLine"
import { UrlUtil } from "./UrlUtil"

export class IntermediateData {
  constructor(
    movieLines: Array<MovieLine>,
    showingLines: Array<ShowingLine>,
    theaterLines: Array<TheaterLine>
  ) {
    this.addMovies(movieLines)
    this.addTheaters(theaterLines)

    // Adding showings last, because they depend on movies and theaters already being added.
    this.addShowings(showingLines)

    // TODO: Add some code that filters out movies that aren't associated with any showings. This is complicated with the current setup since the showings currently point to indexes in the movies array. One solution is to introduce a temporary data state, where there aren't used any array indexes, perform the cleanup and the only introduce the indexes as the final step?
  }

  public movies: Array<IntermediateMovie>
  public showings: Array<IntermediateShowing>
  public theaters: Array<IntermediateTheater>

  private addMovies(movieLines: Array<MovieLine>): void {
    this.movies = movieLines.map(line => new IntermediateMovie(line, this))
  }

  public addMovieWithoutUrl(movies: Array<IntermediateMovie>, movieTitle: string): IntermediateMovie {
    const newMovie = new IntermediateMovie({ movieTitle }, this)
    movies.push(newMovie)
    return newMovie
  }

  private addShowings(showingLines: Array<ShowingLine>): void {
    if (this.movies.length === 0) {
      throw new Error("No movies. Remember to call setMovies() first.")
    }

    if (this.theaters.length === 0) {
      throw new Error("No theaters. Remember to call setTheaters() first.")
    }

    this.showings = showingLines.map(line => new IntermediateShowing(line, this))
  }

  private addTheaters(theaterLines: Array<TheaterLine>): void {
    this.theaters = theaterLines.map(line => new IntermediateTheater(line))
  }

  public findMovie(movieUrlWithPrefix: string): IntermediateMovie | undefined {
    if (movieUrlWithPrefix === "NO_MOVIE_URL") {
      return undefined
    }

    const movieUrl = UrlUtil.removeStandardPrefix(movieUrlWithPrefix)
    const movie = this.movies.find(m => m.movieUrl === movieUrl)
    return movie
  }

  public findTheater(theaterUrlWithPrefix: string): IntermediateTheater | undefined {
    const theaterUrl = UrlUtil.removeStandardPrefix(theaterUrlWithPrefix)
    const theater = this.theaters.find(t => t.theaterUrl === theaterUrl)
    return theater
  }

  public getNextMovieId(): number {
    return this.movies.length + 1
  }
}