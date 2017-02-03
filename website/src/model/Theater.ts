import { observable } from "mobx"

import { TheaterData } from "./data/TheaterData"

export class Theater {
  constructor(data: TheaterData) {
    this.name = Theater.cleanUpTheaterName(data.name)
    this.selected = false
    this.theatherUrl = "http://www.kino.dk/" + data.theatherUrl
  }

  public readonly name: string
  @observable public selected: boolean
  public readonly theatherUrl: string

  public static readonly UndefinedTheater = new Theater({
    name: "",
    theatherUrl: ""
  })

  private static cleanUpTheaterName(originalName: string) {
    const cleanedUpName = originalName.replace("Nordisk Film Biografer ", "")
    return cleanedUpName
  }
}