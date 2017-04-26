
import { ApiMovie } from "./ApiMovie"
import { ApiShowing } from "./ApiShowing"
import { ApiTheater } from "./ApiTheater"

// TODO: Prefix these interfaces with Api instead of Serializable once the old Api classes have been removed from the code.
// TODO: Share these interfaces with the Data project.
// TODO: Introduce a derived StoredData that adds selectable dates to the set.
export interface ApiData {
  readonly movies: Array<ApiMovie>
  readonly showings: Array<ApiShowing>
  readonly theaters: Array<ApiTheater>
}