import { Movie } from "./Movie"
import { Showing } from "./Showing"
import { Theater } from "./Theater"

export interface OutputData {
  movies: Array<Movie>
  showings: Array<Showing>
  theaters: Array<Theater>
}