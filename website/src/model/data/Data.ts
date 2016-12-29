import { MovieData } from './MovieData'
import { ShowingData} from './ShowingData'
import { TheaterData } from './TheaterData'

export interface Data {
  movies: Array<MovieData>,
  showings: Array<ShowingData>,
  theaters: Array<TheaterData>
}