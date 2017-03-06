import { action } from "mobx"
import { observable } from "mobx"

import { TheaterData } from "./data/TheaterData"

export class Theater {
  constructor(data: TheaterData) {
    this.favorited = false
    this.name = Theater.cleanUpTheaterName(data.name)
    this.selected = false
    this.theaterId = data.theatherUrl.replace("biografer/", "")
  }

  public readonly name: string
  public readonly theaterId: string

  @observable public favorited: boolean
  @observable public selected: boolean

  public get theaterUrl(): string {
    const theaterUrl = "http://www.kino.dk/biografer/" + this.theaterId
    return theaterUrl
  }

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