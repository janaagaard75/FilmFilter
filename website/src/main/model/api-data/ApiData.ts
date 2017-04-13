import { ApiMovie } from "./ApiMovie"
import { ApiShowing } from "./ApiShowing"
import { ApiTheater } from "./ApiTheater"

export interface ApiData {
  movies: Array<ApiMovie>
  showings: Array<ApiShowing>
  theaters: Array<ApiTheater>
}