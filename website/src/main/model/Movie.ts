import { observable } from "mobx"

import { ApiMovie } from "./api-data/ApiMovie"
import { Showing } from "./Showing"
import { Strings } from "../utilities/Strings"

export class Movie {
  constructor(serializableMovie: ApiMovie) {
    this.danishTitle = serializableMovie.danishTitle
    this.movieUrl = "http://www.kino.dk/" + serializableMovie.movieUrl
    this.originalTitle = serializableMovie.originalTitle
    this.posterUrl = Movie.getPosterUrl(serializableMovie.posterUrl)
    this.searchableTitle = Movie.getSearchableTitle(serializableMovie.danishTitle, serializableMovie.originalTitle)
    this.selected = false
    this.showings = []
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
      this.memoizedKey = this.movieUrl + this.posterUrl + this.originalTitle
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

  public toggleSelection(): void {
    this.selected = !this.selected
  }

  public static compareByNumberOfShowings(a: Movie, b: Movie): number {
    const compare = b.showings.length - a.showings.length
    return compare
  }

  private static getPosterUrl(posterUrl: string | undefined): string {
    if (posterUrl === undefined) {
      return "http://cdn01.kino.dk/sites/default/files/imagecache/k_poster_small/imagefield_default_images/movie-default-poster.jpg"
    }

    return posterUrl
  }

  private static getSearchableTitle(danishTitle: string | undefined, originalTitle: string): string {
    let searchableTitle = Strings.searchable(originalTitle)
    if (danishTitle !== undefined) {
      searchableTitle += " " + Strings.searchable(danishTitle)
    }

    return searchableTitle
  }
}