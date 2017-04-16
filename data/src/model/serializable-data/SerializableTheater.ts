import { TheaterLine } from "../input/TheaterLine"
import { UrlUtil } from "../output/UrlUtil"

export class SerializableTheater {
  constructor(theaterLine: TheaterLine) {
    this.name = theaterLine.name
    this.theaterId = UrlUtil.getTheaterId(theaterLine.theaterUrl)
  }

  public readonly name: string
  public readonly theaterId: string
}