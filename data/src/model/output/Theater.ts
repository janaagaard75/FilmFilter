import { IntermediateTheater } from "../intermediate/IntermediateTheater"

export class Theater {
  constructor(intermediateTheater: IntermediateTheater) {
    this.name = intermediateTheater.name
    this.theaterUrl = intermediateTheater.theaterUrl
  }

  public readonly name: string
  /** Short URL, without the standard prefix. */
  public readonly theaterUrl: string
}