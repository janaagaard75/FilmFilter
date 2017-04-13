import { Movie } from "../Movie"
import { SelectableDate } from "../SelectableDate"
import { Showing } from "../Showing"
import { Theater } from "../Theater"

export interface DryData {
  dates: Array<SelectableDate>
  movies: Array<Movie>
  showings: Array<Showing>
  theaters: Array<Theater>
}