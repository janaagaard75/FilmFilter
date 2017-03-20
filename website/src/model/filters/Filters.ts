import { Dimensions } from "./Dimensions"
import { FilmType } from "./FilmType"
import { FiltersJson } from "./FiltersJson"
import { Language } from "./Language"
import { ShowingType } from "./ShowingType"
import { Time } from "./Time"
import { TimeInterval } from "./TimeInterval"

export class Filters implements FiltersJson {
  public readonly dimensions = new Dimensions()
  public readonly filmType = new FilmType()
  public readonly language = new Language()
  public readonly showingType = new ShowingType()
  public readonly startInterval = new TimeInterval()

  public setValues(filtersJson: FiltersJson) {
    // TODO: Delegate these settings into the individual classes.
    this.dimensions.twoD = filtersJson.dimensions.twoD
    this.dimensions.threeD = filtersJson.dimensions.threeD
    this.filmType.imax = filtersJson.filmType.imax
    this.filmType.standardFilm = filtersJson.filmType.standardFilm
    this.language.dubbedToDanish = filtersJson.language.dubbedToDanish
    this.language.originalLanguage = filtersJson.language.originalLanguage
    this.showingType.normalShowings = filtersJson.showingType.normalShowings
    this.showingType.specialShowings = filtersJson.showingType.specialShowings

    if (filtersJson.startInterval !== undefined) {
      this.startInterval.from = new Time(filtersJson.startInterval.from)
      this.startInterval.to = new Time(filtersJson.startInterval.to)
    }
  }
}