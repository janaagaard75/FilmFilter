import { action } from "mobx"
import { observable } from "mobx"

import { TheaterData } from "./data/TheaterData"

export class Theater {
  constructor(data: TheaterData) {
    this.favorited = false
    this.name = Theater.cleanUpTheaterName(data.name)
    this.selected = false
    this.theaterUrl = "http://www.kino.dk/" + data.theatherUrl
  }

  @observable public favorited: boolean
  public readonly name: string
  @observable public selected: boolean
  public readonly theaterUrl: string

  public static readonly UndefinedTheater = new Theater({
    name: "",
    theatherUrl: ""
  })

  private static cleanUpTheaterName(originalName: string) {
    const cleanedUpName = originalName.replace("Nordisk Film Biografer ", "")
    return cleanedUpName
  }

  @action
  public toggleFavorited() {
    this.favorited = !this.favorited
  }

  @action
  public toggleSelection() {
    this.selected = !this.selected
  }
}