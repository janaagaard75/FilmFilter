import { IntermediateShowing } from "../intermediate/IntermediateShowing"
import { OutputData } from "./OutputData"
import { ShowingFlags } from "./ShowingFlags"

export class Showing {
  constructor(
    intermediateShowing: IntermediateShowing,
    outputData: OutputData
  ) {
    this.movieIndex = outputData.getMovieIndex(intermediateShowing.movie)

    this.seatingInfo = intermediateShowing.seatingInfo

    this.showingUrl = intermediateShowing.showingUrl

    this.start = intermediateShowing.start

    this.theaterIndex = outputData.getTheaterIndex(intermediateShowing.theater)

    this.flags = intermediateShowing.flags
  }

  public flags: ShowingFlags
  public readonly movieIndex: number
  public readonly seatingInfo: Array<string>
  /** Short URL, without the standard prefix. */
  public readonly showingUrl: string
  public readonly start: string
  public readonly theaterIndex: number
}