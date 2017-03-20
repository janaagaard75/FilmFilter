import { Dimensions } from "./Dimensions"
import { FilmType } from "./FilmType"
import { FiltersJson } from "./FiltersJson"
import { Language } from "./Language"
import { log } from "../../utilities"
import { ShowingType } from "./ShowingType"
import { TimeInterval } from "./TimeInterval"

export class Filters implements FiltersJson {
  public readonly dimensions = new Dimensions()
  public readonly filmType = new FilmType()
  public readonly language = new Language()
  public readonly showingType = new ShowingType()
  public readonly startInterval = new TimeInterval()

  public setValues(filtersJson: FiltersJson) {
    try {
      this.dimensions.threeD = filtersJson.dimensions.threeD
      this.dimensions.twoD = filtersJson.dimensions.twoD
      this.filmType.imax = filtersJson.filmType.imax
      this.filmType.standardFilm = filtersJson.filmType.standardFilm
      this.language.dubbedToDanish = filtersJson.language.dubbedToDanish
      this.language.originalLanguage = filtersJson.language.originalLanguage
      this.showingType.normalShowings = filtersJson.showingType.normalShowings
      this.showingType.specialShowings = filtersJson.showingType.specialShowings
      // TODO: Figure out how to handle that 'from' might contain both hours and minutes.
      this.startInterval.from = filtersJson.startInterval.from
      this.startInterval.to = filtersJson.startInterval.to
    }
    catch (error) {
      log("Error parsing stored filters.")
      // TODO: Figure out how to recover from this in the best possible way.
    }
  }
}