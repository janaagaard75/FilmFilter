import { TheaterData } from './data/TheaterData'

export class Theater {
  constructor(data: TheaterData) {
    this.name = data.name
    this.theatherUrl = 'http://www.kino.dk/' + data.theatherUrl
  }

  public readonly name: string
  public readonly theatherUrl: string

  public static readonly UndefinedTheater = new Theater({
    name: '',
    theatherUrl: ''
  })
}