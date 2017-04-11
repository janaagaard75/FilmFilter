import { Movie } from "./Movie"
import { SelectableDate } from "./SelectableDate"
import { Showing } from "./Showing"
import { Theater } from "./Theater"

export interface ParsedData {
  dates: Array<SelectableDate>
  movies: Array<Movie>
  showings: Array<Showing>
  theaters: Array<Theater>
}