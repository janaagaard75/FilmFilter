import { Dimensions } from "./filters/Dimensions"
import { FilmType } from "./filters/FilmType"
import { ImmutableDateTime } from "./moment/ImmutableDateTime"
import { Language } from "./filters/Language"
import { Movie } from "./Movie"
import { SelectableDate } from "./SelectableDate"
import { ApiShowing } from "./serializable-data/SerializableShowing"
import { ShowingConstructorHelper } from "./ShowingConstructorHelper"
import { ShowingFlags } from "./serializable-data/ShowingFlags"
import { ShowingType } from "./filters/ShowingType"
import { Theater } from "./Theater"
import { TimeInterval } from "./filters/TimeInterval"

export class Showing {
  constructor(
    serializableShowing: ApiShowing,
    helper: ShowingConstructorHelper
  ) {
    this.dubbed = Showing.getFlagValue(serializableShowing, ShowingFlags.Dubbed)
    this.freeSeats = serializableShowing.freeSeats
    this.imax = Showing.getFlagValue(serializableShowing, ShowingFlags.Imax)
    this.movie = helper.getMovie(serializableShowing.movieIndex)
    this.showingUrl = `http://www.kino.dk/ticketflow/${serializableShowing.showingId}`
    this.specialShowing = Showing.getFlagValue(serializableShowing, ShowingFlags.SpecialShowing)
    this.start = new ImmutableDateTime(serializableShowing.start)
    this.theater = helper.getTheater(serializableShowing.theaterIndex)
    this.threeD = Showing.getFlagValue(serializableShowing, ShowingFlags.ThreeD)
    this.totalSeats = serializableShowing.totalSeats

    this.date = helper.getOrAddSelectableDate(this.start.toDate())
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

  private static getFlagValue(serializableShowing: ApiShowing, flag: ShowingFlags): boolean {
    const flagValue = (serializableShowing.flags & flag) > 0
    return flagValue
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