import * as fs from 'fs'

export class ScraperReader {
  public static readData<TLine>(filename: string): Array<TLine> {
    const lines = this.readScraperOutput(filename)
    const parsed = lines
      .filter(line => line.length >= 1)
      .map(line => JSON.parse(line) as TLine)
    return parsed
  }

  private static readJsonLines(path: string): Array<string> {
    const content = fs.readFileSync(path, 'utf8')
    const lines = content.split('\n')
    return lines
  }

  private static readScraperOutput(filename: string): Array<string> {
    const lines = this.readJsonLines('../scraper/output/' + filename)
    return lines
  }
}