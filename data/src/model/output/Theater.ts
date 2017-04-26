import { ApiTheater } from "./interface/ApiTheater"
import { TheaterLine } from "../input/TheaterLine"
import { UrlUtil } from "./UrlUtil"

export class Theater implements ApiTheater {
  constructor(theaterLine: TheaterLine) {
    this.name = theaterLine.name
    this.theaterId = UrlUtil.getTheaterId(theaterLine.theaterUrl)
  }

  public readonly name: string
  public readonly theaterId: string
}