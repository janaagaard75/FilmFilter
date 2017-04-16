import * as moment from "moment"

import { ApiData } from "../main/model/api-data/ApiData"
import { Dates } from "../main/utilities/Dates"
import { ImmutableDate } from "../main/model/moment/ImmutableDate"
import { SelectableDate } from "../main/model/SelectableDate"
import { SendableData } from "../main/model/sendable-data/SendableData"
import { SendableImmutableDate } from "../main/model/sendable-data/SendableImmutableDate"
import { SendableMovie } from "../main/model/sendable-data/SendableMovie"
import { SendableSelectableDate } from "../main/model/sendable-data/SendableSelectableDate"
import { SendableTheater } from "../main/model/sendable-data/SendableTheater"
import { TypedMessageEvent } from "./TypedMessageEvent"

class DataParser {
  private sendableData: SendableData

  public getMovie(movieIndex: number): SendableMovie | undefined {
    if (movieIndex === -1) {
      return undefined
    }

    const movie = this.sendableData.movies[movieIndex]
    if (movie === undefined) {
      return undefined
    }

    return movie
  }

  public getTheater(theaterIndex: number): SendableTheater | undefined {
    const theater = this.sendableData.theaters[theaterIndex]

    if (theater === undefined) {
      return undefined
    }

    return theater
  }

  public getOrAddSelectableDate(date: ImmutableDate): SendableSelectableDate {
    const existingSelectableDate = this.sendableData.dates.find(selectableDate => selectableDate.date.equals(date))
    if (existingSelectableDate !== undefined) {
      return existingSelectableDate
    }

    const newSelectableDate = new SelectableDate(date)
    this.sendableData.dates.push(newSelectableDate)
    return newSelectableDate
  }

  public parseAndSendBack(data: ApiData): void {
    this.parseData(data)
    this.sendParsedDataBack()
  }

  private addStartAndEndDates(): void {
    this.sortDates()
    const earliest = DataParser.toImmutableDate(this.sendableData.dates[0].date)
    const latest = DataParser.toImmutableDate(this.sendableData.dates[this.sendableData.dates.length - 1].date)

    for (let i = 1; i <= earliest.weekday(); i++) {
      this.getOrAddSelectableDate(earliest.subtract(i, "days"))
    }

    for (let i = 6; i > latest.weekday(); i--) {
      this.getOrAddSelectableDate(latest.add(i, "days"))
    }
  }

  private static toImmutableDate(date: SendableImmutableDate): ImmutableDate {
    const immutableDate = new ImmutableDate(moment({
      date: date.date,
      month: date.month,
      year: date.year
    }))
    return immutableDate
  }

  private addMissingDates(): void {
    this.sortDates()
    const earliest = this.sendableData.dates[0].date
    const latest = this.sendableData.dates[this.sendableData.dates.length - 1].date

    for (let date = earliest; !date.equals(latest); date = date.add(1, "day")) {
      this.getOrAddSelectableDate(date)
    }
  }

  private initializeParsedData(): void {
    this.sendableData = {
      dates: [],
      movies: [],
      showings: [],
      theaters: []
    }
  }

  private parseData(data: ApiData): void {
    this.initializeParsedData()

    this.sendableData.movies = data.movies.map(movieData => new Movie(movieData))
    // Don't sort the theaters, because the showings refer to them by ID in the array.
    this.sendableData.theaters = data.theaters.map(theaterData => new Theater(theaterData))

    // TODO: The date strings are being parsed twice, both in here and in the ImmutableMoment constructor. Consider fixing this by adding an intermediate model where start is a date.
    const now = Date.now()
    this.sendableData.showings = data.showings
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
    postMessage(this.sendableData)
  }

  private sortDates(): void {
    this.sendableData.dates = this.sendableData.dates.sort((a, b) => a.date.diff(b.date))
  }

  private sortMovies(): void {
    this.sendableData.movies = this.sendableData.movies.sort(Movie.compareByNumberOfShowings)
  }
}

type ApiDataMessageEvent = TypedMessageEvent<ApiData>

const store = new DataParser()
self.addEventListener("message", (e: ApiDataMessageEvent) => store.parseAndSendBack(e.data), false)