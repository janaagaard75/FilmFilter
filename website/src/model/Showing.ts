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

export class Showing {
  constructor(data: ShowingData, store: Store) {
    this.dubbed = data.dubbed
    this.freeSeats = this.getFreeSeats(data.seatingInfo)
    this.imax = data.imax
    this.movie = store.getMovie(data.movieId)
    this.showingUrl = "http://www.kino.dk/" + data.showingUrl
    this.specialShowing = data.specialShowing
    this.start = new ImmutableDateTime(data.start)
    this.theater = store.getTheater(data.theaterId)
    this.threeD = data.threeD
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

  public matchesStartInterval(startInternval: TimeInterval): boolean {
    const matches = this.start.minutesSinceMidnight() >= startInternval.from.minutesSinceMidnight()
      && this.start.minutesSinceMidnight() <= startInternval.to.minutesSinceMidnight()
    return matches
  }
}