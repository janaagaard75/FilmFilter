import { Movie } from "./Movie"
import { Showing } from "./Showing"
import { Theater } from "./Theater"

export class OutputData {
  public movies: Array<Movie> = []
  public showings: Array<Showing> = []
  public theaters: Array<Theater> = []
}