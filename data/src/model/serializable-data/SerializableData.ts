import { MovieLine } from "../input/MovieLine"
import { SerializableMovie } from "./SerializableMovie"
import { SerializableShowing } from "./SerializableShowing"
import { SerializableTheater } from "./SerializableTheater"
import { ShowingLine } from "../input/ShowingLine"
import { TheaterLine } from "../input/TheaterLine"
import { UrlUtil } from "../output/UrlUtil"

export class SerializableData {
  constructor(
    movieLines: Array<MovieLine>,
    showingLines: Array<ShowingLine>,
    theaterLines: Array<TheaterLine>
  ) {
    this.movies = movieLines
      .map(line => new SerializableMovie(line))
      .filter((movie, index, array) => array.findIndex(m => m.equals(movie)) === index)

    this.theaters = theaterLines.map(line => new SerializableTheater(line))

    this.showings = showingLines.map(line => new SerializableShowing(line, this))
  }

  public readonly movies: Array<SerializableMovie>
  public readonly showings: Array<SerializableShowing>
  public readonly theaters: Array<SerializableTheater>

  public addOrGetMovieIndexFromTitle(originalTitle: string): number {
    const existingMovie = this.movies.find(m => m.movieUrl === undefined && m.originalTitle === originalTitle)

    if (existingMovie === undefined) {
      const newMovie = SerializableMovie.createFromTitle(originalTitle)
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