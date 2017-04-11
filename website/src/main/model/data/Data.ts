import { ApiMovie } from "./MovieData"
import { ApiShowing } from "./ShowingData"
import { ApiTheater } from "./TheaterData"

// TODO: Figure out a better name for this. RawData? ApiData? Same goes for the associated *Data classes.
export interface ApiData {
  movies: Array<ApiMovie>
  showings: Array<ApiShowing>
  theaters: Array<ApiTheater>
}