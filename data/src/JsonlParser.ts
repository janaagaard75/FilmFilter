import { JsonlType } from "./model/JsonlType"
import { TypedJsonl } from "./model/TypedLines"

export class JsonlParser {
  public static parseLines<TLine>(typedLinesArray: Array<TypedJsonl>, type: JsonlType): Array<TLine> {
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