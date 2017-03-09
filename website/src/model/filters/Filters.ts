import { Dimensions } from "./Dimensions"
import { FilmType } from "./FilmType"
import { Language } from "./Language"
import { ShowingType } from "./ShowingType"

export class Filters {
  public dimensions = new Dimensions()
  public filmType = new FilmType()
  public language = new Language()
  public showingType = new ShowingType()
}