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

    this.searchableTitle = data.originalTitle.toLocaleLowerCase()
    if (data.danishTitle !== undefined) {
      this.searchableTitle += " " + data.danishTitle.toLocaleLowerCase()
    }
  }

  @observable public selected: boolean

  public readonly danishTitle?: string
  public readonly movieUrl: string
  public readonly originalTitle: string
  public readonly posterUrl: string
  public readonly showings: Array<Showing>

  private readonly searchableTitle: string

  public static UndefinedMovie: Movie = new Movie({
    movieUrl: "",
    originalTitle: "",
    posterUrl: ""
  })

  public addShowing(showing: Showing): void {
    this.showings.push(showing)
  }

  /** Returns true if the string `filter` is container in either the original or the Danish title of this movie. Assumes that `filter` is lower cased. */
  public titleMatchesFilter(filter: string): boolean {
    const matches = this.searchableTitle.indexOf(filter) !== -1
    return matches
  }

  public static compareByNumberOfShowings(a: Movie, b: Movie): number {
    const compare = b.showings.length - a.showings.length
    return compare
  }

  public toggleSelection(): void {
    this.selected = !this.selected
  }
}