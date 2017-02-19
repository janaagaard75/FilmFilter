import { action } from "mobx"
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

  public addShowing(showing: Showing): void {
    this.showings.push(showing)
  }

  public titleMatchesFilter(filter: string): boolean {
    const matches
      = this.originalTitle.indexOf(filter) !== -1
      || (this.danishTitle !== undefined
        && this.danishTitle.indexOf(filter) !== -1)
    return matches
  }

  public static compareByNumberOfShowings(a: Movie, b: Movie): number {
    const compare = b.showings.length - a.showings.length
    return compare
  }

  @action
  public toggleSelection(): void {
    this.selected = !this.selected
  }
}