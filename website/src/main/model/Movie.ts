import { observable } from "mobx"

import { ApiMovie } from "./data/ApiMovie"
import { Showing } from "./Showing"
import { Strings } from "../utilities/Strings"

export class Movie {
  constructor(data: ApiMovie) {
    this.danishTitle = data.danishTitle
    this.movieUrl = "http://www.kino.dk/" + data.movieUrl
    this.originalTitle = data.originalTitle
    this.posterUrl = data.posterUrl
    this.selected = false
    this.showings = []

    this.searchableTitle = Strings.searchable(data.originalTitle)
    if (data.danishTitle !== undefined) {
      this.searchableTitle += " " + Strings.searchable(data.danishTitle)
    }
  }

  @observable public selected: boolean

  public readonly danishTitle?: string
  public readonly movieUrl: string
  public readonly originalTitle: string
  public readonly posterUrl: string
  public readonly showings: Array<Showing>

  private memoizedKey: string | undefined = undefined
  private readonly searchableTitle: string

  public static UndefinedMovie: Movie = new Movie({
    movieUrl: "",
    originalTitle: "",
    posterUrl: ""
  })

  public get key(): string {
    if (this.memoizedKey === undefined) {
      this.memoizedKey = "KEY-" + this.movieUrl + this.originalTitle + this.posterUrl
    }

    return this.memoizedKey
  }

  public addShowing(showing: Showing): void {
    this.showings.push(showing)
  }

  /** Returns true if the string `filter` is container in either the original or the Danish title of this movie. Assumes that `filter` has been transformed with `Strings.searchable()`. */
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