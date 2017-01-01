import { observable } from "mobx"

import { MovieData } from "./data/MovieData"
import { Showing } from "./Showing"

export class Movie {
  constructor(data: MovieData) {
    this.danishTitle = data.danishTitle
    this.movieUrl = "http://www.kino.dk/" + data.movieUrl
    this.originalTitle = data.originalTitle
    this.posterUrl = data.posterUrl
    this.selected = false
    this.showings = []

    this.lowerCaseTitle = data.originalTitle.toLocaleLowerCase()
    if (data.danishTitle !== undefined) {
      this.lowerCaseTitle += " " + data.danishTitle.toLocaleLowerCase()
    }
  }

  public readonly danishTitle?: string
  public readonly lowerCaseTitle: string
  public readonly movieUrl: string
  public readonly originalTitle: string
  public readonly posterUrl: string
  @observable public selected: boolean
  public readonly showings: Array<Showing>

  public static UndefinedMovie: Movie = new Movie({
    movieUrl: "",
    originalTitle: "",
    posterUrl: ""
  })

  public addShowing(showing: Showing) {
    this.showings.push(showing)
  }
}