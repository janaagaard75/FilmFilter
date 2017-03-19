import { Dimensions } from "./Dimensions"
import { FilmType } from "./FilmType"
import { Language } from "./Language"
import { ShowingType } from "./ShowingType"
import { TimeInterval } from "../TimeInterval"

// TODO: Filters has to be an interface since it's being serialized to and from JSON.
export class Filters {
  public readonly dimensions = new Dimensions()
  public readonly filmType = new FilmType()
  public readonly language = new Language()
  public readonly showingType = new ShowingType()
  public readonly startInterval = new TimeInterval()
}