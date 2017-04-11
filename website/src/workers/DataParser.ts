import { ApiData } from "../main/model/data/ApiData"
import { Dates } from "../main/utilities/Dates"
import { ImmutableDate } from "../main/model/moment/ImmutableDate"
import { Movie } from "../main/model/Movie"
import { ParsedData } from "../main/model/ParsedData"
import { SelectableDate } from "../main/model/SelectableDate"
import { Showing } from "../main/model/Showing"
import { StoreInterface } from "../main/model/StoreInterface"
import { Theater } from "../main/model/Theater"
import { TypedMessageEvent } from "./TypedMessageEvent"

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
    const theater = this.parsedData.theaters[theaterIndex]

    if (theater === undefined) {
      return Theater.UndefinedTheater
    }

    return theater
  }

  public getOrAddSelectableDate(date: ImmutableDate): SelectableDate {
    const existingSelectableDate = this.parsedData.dates.find(selectableDate => selectableDate.date.equals(date))
    if (existingSelectableDate !== undefined) {
      return existingSelectableDate
    }

    const newSelectableDate = new SelectableDate(date)
    this.parsedData.dates.push(newSelectableDate)
    return newSelectableDate
  }

  public parseAndSendBack(data: ApiData): void {
    this.parseData(data)
    this.sendParsedDataBack()
  }

  private addStartAndEndDates(): void {
    this.sortDates()
    const earliest = this.parsedData.dates[0].date
    const latest = this.parsedData.dates[this.parsedData.dates.length - 1].date

    for (let i = 1; i <= earliest.weekday(); i++) {
      this.getOrAddSelectableDate(earliest.subtract(i, "days"))
    }

    for (let i = 6; i > latest.weekday(); i--) {
      this.getOrAddSelectableDate(latest.add(i, "days"))
    }
  }

  private addMissingDates(): void {
    this.sortDates()
    const earliest = this.parsedData.dates[0].date
    const latest = this.parsedData.dates[this.parsedData.dates.length - 1].date

    for (let date = earliest; !date.equals(latest); date = date.add(1, "day")) {
      this.getOrAddSelectableDate(date)
    }
  }

  private initializeParsedData(): void {
    this.parsedData = {
      dates: [],
      movies: [],
      showings: [],
      theaters: []
    }
  }

  private parseData(data: ApiData): void {
    this.initializeParsedData()

    this.parsedData.movies = data.movies.map(movieData => new Movie(movieData))
    // Don't sort the theaters, because the showings refer to them by ID in the array.
    this.parsedData.theaters = data.theaters.map(theaterData => new Theater(theaterData))

    // TODO: The date strings are being parsed twice, both in here and in the ImmutableMoment constructor. Consider fixing this by adding an intermediate model where start is a date.
    const now = Date.now()
    this.parsedData.showings = data.showings
      .filter(showingData => Dates.parseAsLocalDateTime(showingData.start).valueOf() >= now)
      .map(showingData => new Showing(showingData, this))
      .sort((showingA, showingB) => showingA.start.diff(showingB.start))

    this.sortMovies()
    this.addMissingDates()
    this.addStartAndEndDates()
    this.sortDates()
  }

  private sendParsedDataBack(): void {
    // TODO: Fix this. The issue is probably that the objects in ParsedData are too complex. What to do?
    debugger
    postMessage(this.parsedData)
  }

  private sortDates(): void {
    this.parsedData.dates = this.parsedData.dates.sort((a, b) => a.date.diff(b.date))
  }

  private sortMovies(): void {
    this.parsedData.movies = this.parsedData.movies.sort(Movie.compareByNumberOfShowings)
  }
}

type ApiDataMessageEvent = TypedMessageEvent<ApiData>

const store = new DataParser()
self.addEventListener("message", (e: ApiDataMessageEvent) => store.parseAndSendBack(e.data), false)