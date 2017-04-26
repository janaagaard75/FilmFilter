import { ApiMovie } from "./ApiMovie"
import { ApiShowing } from "./ApiShowing"
import { ApiTheater } from "./ApiTheater"

export interface ApiData {
  readonly movies: Array<ApiMovie>
  readonly showings: Array<ApiShowing>
  readonly theaters: Array<ApiTheater>
}