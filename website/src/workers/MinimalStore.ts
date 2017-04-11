import { Data } from "../main/model/data/Data"
import { Dates } from "../main/utilities/Dates"
import { ImmutableDate } from "../main/model/moment/ImmutableDate"
import { Movie } from "../main/model/Movie"
import { SelectableDate } from "../main/model/SelectableDate"
import { Showing } from "../main/model/Showing"
import { StoreInterface } from "../main/model/StoreInterface"
import { Theater } from "../main/model/Theater"

interface Output {
  dates: Array<SelectableDate>
  movies: Array<Movie>
  showings: Array<Showing>
  theaters: Array<Theater>
}

class MinimalStore implements StoreInterface, Output {
  public dates: Array<SelectableDate> = []
  public movies: Array<Movie> = []
  public showings: Array<Showing> = []
  public theaters: Array<Theater> = []

  public getMovie(movieIndex: number): Movie {

  }

  public getTheater(theaterIndex: number): Theater {

  }

  public getOrAddSelectableDate(date: ImmutableDate): SelectableDate {

  }

  public parseData(data: Data) {
    // TODO: Consider using a worker thread to parse this in a separate thread.
    const dates = []
    let movies = data.movies.map(movieData => new Movie(movieData))
    // Don't sort the theaters, because the showings refer to them by ID in the array.
    const theaters = data.theaters.map(theaterData => new Theater(theaterData))

    // TODO: The date strings are being parsed twice, both in here and in the ImmutableMoment constructor. Consider fixing this by adding an intermediate model where start is a date.
    const now = Date.now()
    const showings = data.showings
      .filter(showingData => Dates.parseAsLocalDateTime(showingData.start).valueOf() >= now)
      .map(showingData => new Showing(showingData, this))
      .sort((showingA, showingB) => showingA.start.diff(showingB.start))

    movies = movies.sort(Movie.compareByNumberOfShowings)

    this.addMissingDates()
    this.addStartAndEndDates()
    this.sortDates()
  }

  private sendOutputBack(): void {
    postMessage(this)
  }
}

interface TypedMessageEvent<T> extends MessageEvent {
  data: T
}

type DataMessageEvent = TypedMessageEvent<Data>

const store = new MinimalStore()
self.addEventListener("message", (e: DataMessageEvent) => store.parseData(e.data), false)