import { LinesType } from "./LinesType"
import { TypedLines } from "./TypedLines"

export class JsonlParser {
  public static parseLines<TLine>(typedLinesArray: Array<TypedLines>, type: LinesType): Array<TLine> {
    const parsed = typedLinesArray
      .find(tl => tl.type === type)
      .lines
      .trim()
      .split("\n")
      .filter(line => line.length >= 1)
      .map(line => JSON.parse(line) as TLine)

    return parsed
  }
}