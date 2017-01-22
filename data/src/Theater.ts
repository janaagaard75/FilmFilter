import { TheaterLine } from './TheaterLine'
import { UrlUtil } from './UrlUtil'

export class Theater {
  constructor(line: TheaterLine) {
    this.name = line.name
    this.theatherUrl = UrlUtil.removeStandardPrefix(line.theaterUrl)
  }

  public readonly name: string
  public readonly theatherUrl: string
}