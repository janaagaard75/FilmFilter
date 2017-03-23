import { Dimensions } from "./filters/Dimensions"
import { FilmType } from "./filters/FilmType"
import { ImmutableDateTime } from "./moment/ImmutableDateTime"
import { Language } from "./filters/Language"
import { Movie } from "./Movie"
import { SelectableDate } from "./SelectableDate"
import { ShowingData } from "./data/ShowingData"
import { ShowingType } from "./filters/ShowingType"
import { Store } from "./Store"
import { Theater } from "./Theater"
import { TimeInterval } from "./filters/TimeInterval"
import { ShowingFlags } from "./data/ShowingFlags";

export class Showing {
  constructor(data: ShowingData, store: Store) {
    this.dubbed = Showing.getFlagValue(data, ShowingFlags.Dubbed)
    this.freeSeats = this.getFreeSeats(data.seatingInfo)
    this.imax = Showing.getFlagValue(data, ShowingFlags.Imax)
    this.movie = store.getMovie(data.movieId)
    this.showingUrl = "http://www.kino.dk/" + data.showingUrl
    this.specialShowing = Showing.getFlagValue(data, ShowingFlags.SpecialShowing)
    this.start = new ImmutableDateTime(data.start)
    this.theater = store.getTheater(data.theaterId)
    this.threeD = Showing.getFlagValue(data, ShowingFlags.ThreeD)
    this.totalSeats = this.getTotalSeats(data.seatingInfo)

    this.date = store.getOrAddSelectableDate(this.start.toDate())
    this.date.addShowing(this)

    this.movie.addShowing(this)
  }

  public readonly date: SelectableDate
  public readonly dubbed: boolean
  public readonly freeSeats: number
  public readonly imax: boolean
  public readonly movie: Movie
  public readonly showingUrl: string
  public readonly specialShowing: boolean
  public readonly start: ImmutableDateTime
  public readonly theater: Theater
  public readonly threeD: boolean
  public readonly totalSeats: number

  private static getFlagValue(data: ShowingData, flag: ShowingFlags): boolean {
    const flagValue = (data.flags & flag) > 0
    return flagValue
  }

  private getFreeSeats(seatingInfo: Array<string>): number {
    const freeSeatsLine = seatingInfo.filter(info => info.startsWith("Ledige"))[0]
    const freeSeats = parseInt(freeSeatsLine.substring("Ledige: ".length), 10)
    return freeSeats
  }

  private getTotalSeats(seatingInfo: Array<string>): number {
    const totalSeatsLine = seatingInfo.filter(info => info.startsWith("Sæder"))[0]
    const totalSeats = parseInt(totalSeatsLine.substring("Sæder: ".length), 10)
    return totalSeats
  }

  public matchesDimensionsFilter(dimensions: Dimensions): boolean {
    const matches = this.threeD && dimensions.threeD || !this.threeD && dimensions.twoD
    return matches
  }

  public matchesFilmTypeFilter(filmType: FilmType): boolean {
    const matches = this.imax && filmType.imax || !this.imax && filmType.standardFilm
    return matches
  }

  public matchesLanguageFilter(language: Language): boolean {
    const matches = this.dubbed && language.dubbedToDanish || !this.dubbed && language.originalLanguage
    return matches
  }

  public matchesShowingType(showingType: ShowingType): boolean {
    const matches = this.specialShowing && showingType.specialShowings || !this.specialShowing && showingType.normalShowings
    return matches
  }

  public matchesStartInterval(startInterval: TimeInterval): boolean {
    const matches = this.start.hours() >= startInterval.from && this.start.hours() <= startInterval.to - 1
    return matches
  }
}