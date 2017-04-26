import { ApiMovie } from "./ApiMovie"
import { ApiShowing } from "./ApiShowing"
import { ApiTheater } from "./ApiTheater"

// TODO: Share these interfaces with the Data project.
// TODO: Introduce a derived StoredData that adds selectable dates to the set.
export interface ApiData {
  readonly movies: Array<ApiMovie>
  readonly showings: Array<ApiShowing>
  readonly theaters: Array<ApiTheater>
}