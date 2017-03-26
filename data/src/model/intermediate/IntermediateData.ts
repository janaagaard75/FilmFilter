import { Movie } from "./Movie"
import { MovieLine } from "../input/MovieLine"
import { Showing } from "./Showing"
import { ShowingLine } from "../input/ShowingLine"
import { Theater } from "./Theater"
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

  public movies: Array<Movie>
  public showings: Array<Showing>
  public theaters: Array<Theater>

  private addMovies(movieLines: Array<MovieLine>): void {
    this.movies = movieLines.map(line => new Movie(line))
  }

  public addMovieWithoutUrl(movies: Array<Movie>, movieTitle: string): Movie {
    const movieId = `ID-${movies.length - 1}`
    const newMovie = new Movie({ movieId, movieTitle })
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

    this.showings = showingLines.map(line => new Showing(line, this))
  }

  private addTheaters(theaterLines: Array<TheaterLine>): void {
    this.theaters = theaterLines.map(line => new Theater(line))
  }

  public findMovie(movieUrlWithPrefix: string): Movie | undefined {
    if (movieUrlWithPrefix === "NO_MOVIE_URL") {
      return undefined
    }

    const movieUrl = UrlUtil.removeStandardPrefix(movieUrlWithPrefix)
    const movie = this.movies.find(m => m.movieUrlOrId === movieUrl)
    return movie
  }

  public findTheater(theaterUrlWithPrefix: string): Theater | undefined {
    const theaterUrl = UrlUtil.removeStandardPrefix(theaterUrlWithPrefix)
    const theater = this.theaters.find(t => t.theatherUrl === theaterUrl)
    return theater
  }
}