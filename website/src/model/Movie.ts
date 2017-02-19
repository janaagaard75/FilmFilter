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

  /** Returns true if the string `filter` is container in either the original or the Danish title of this movie. Assused that `filter` is lower case. */
  public titleMatchesFilter(filter: string): boolean {
    // TODO: Consider creating a single string containing both titles that are already lowercased.
    const matches
      = this.originalTitle.toLocaleLowerCase().indexOf(filter) !== -1
      || (this.danishTitle !== undefined
        && this.danishTitle.toLocaleLowerCase().indexOf(filter) !== -1)
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