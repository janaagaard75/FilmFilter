import { MovieData } from "./MovieData"
import { ShowingData } from "./ShowingData"
import { TheaterData } from "./TheaterData"

// TODO: Figure out a better name for this. RawData? ApiData? Same goes for the associated *Data classes.
export interface Data {
  movies: Array<MovieData>
  showings: Array<ShowingData>
  theaters: Array<TheaterData>
}