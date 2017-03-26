import { TheaterLine } from "../input/TheaterLine"
import { UrlUtil } from "./UrlUtil"

export class IntermediateTheater {
  constructor(line: TheaterLine) {
    this.name = line.name
    this.theatherUrl = UrlUtil.removeStandardPrefix(line.theaterUrl)
  }

  public readonly name: string
  /** Short URL, without the standard prefix. */
  public readonly theatherUrl: string
}