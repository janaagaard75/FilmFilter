import { DimensionsJson } from "./DimensionsJson"
import { FilmTypeJson } from "./FilmTypeJson"
import { LanguageJson } from "./LanguageJson"
import { ShowingTypeJson } from "./ShowingTypeJson"
import { TimeIntervalJson } from "./TimeIntervalJson"

export interface FiltersJson {
  dimensions: DimensionsJson
  filmType: FilmTypeJson
  language: LanguageJson
  showingType: ShowingTypeJson
  startInterval: TimeIntervalJson
  version: number
}