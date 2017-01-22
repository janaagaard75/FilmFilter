export class JsonlParser {
  public static parseLines<TLine>(lines: string): Array<TLine> {
    const parsed = lines
      .split("\n")
      .filter(line => line.length >= 1)
      .map(line => JSON.parse(line) as TLine)
    return parsed
  }
}