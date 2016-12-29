import { MovieData } from './data/MovieData'

export class Movie {
  constructor(data: MovieData) {
    this.danishTitle = data.danishTitle
    this.movieUrl = 'http://www.kino.dk/' + data.movieUrl
    this.originalTitle = data.originalTitle
    this.posterUrl = 'http://www.kino.dk/' + data.posterUrl

    this.lowerCaseTitle = data.originalTitle.toLocaleLowerCase()
    if (data.danishTitle !== undefined) {
      this.lowerCaseTitle += ' ' + data.danishTitle.toLocaleLowerCase()
    }
  }

  public readonly danishTitle?: string
  public readonly lowerCaseTitle: string
  public readonly movieUrl: string
  public readonly originalTitle: string
  public readonly posterUrl: string

  public static UndefinedMovie: Movie = new Movie({
    movieUrl: '',
    originalTitle: '',
    posterUrl: ''
  })

  public static isUndefined(movie: Movie) {
    const notDefined = movie === Movie.UndefinedMovie
    return notDefined
  }
}