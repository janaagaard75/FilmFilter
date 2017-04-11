import { ApiData } from "../main/model/data/ApiData"
import { Dates } from "../main/utilities/Dates"
import { ImmutableDate } from "../main/model/moment/ImmutableDate"
import { Movie } from "../main/model/Movie"
import { ParsedData } from "../main/model/ParsedData"
import { SelectableDate } from "../main/model/SelectableDate"
import { Showing } from "../main/model/Showing"
import { StoreInterface } from "../main/model/StoreInterface"
import { Theater } from "../main/model/Theater"

class DataParser implements StoreInterface {
  private parsedData: ParsedData

  public getMovie(movieIndex: number): Movie {
    if (movieIndex === -1) {
      return Movie.UndefinedMovie
    }

    const movie = this.parsedData.movies[movieIndex]
    if (movie === undefined) {
      return Movie.UndefinedMovie
    }

    return movie
  }

  public getTheater(theaterIndex: number): Theater {
  }

  public getOrAddSelectableDate(date: ImmutableDate): SelectableDate {
  }

  public parseData(data: ApiData) {
    this.parsedData = {
      dates: [],
      movies: [],
      showings: [],
      theaters: []
    }

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

  private addMissingDates() {
    this.sortDates()
    const earliest = this.dates[0].date
    const latest = this.dates[this.dates.length - 1].date

    for (let date = earliest; !date.equals(latest); date = date.add(1, "day")) {
      this.getOrAddSelectableDate(date)
    }
  }

  private sendOutputBack(): void {
    postMessage(this)
  }
}

interface TypedMessageEvent<T> extends MessageEvent {
  data: T
}

type DataMessageEvent = TypedMessageEvent<ApiData>

const store = new DataParser()
self.addEventListener("message", (e: DataMessageEvent) => store.parseData(e.data), false)