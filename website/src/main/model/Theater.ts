import { observable } from "mobx"

import { ApiTheater } from "./api-data/ApiTheater"

export class Theater {
  constructor(data: ApiTheater) {
    this.favorited = false
    this.name = Theater.cleanUpTheaterName(data.name)
    this.selected = false
    this.theaterId = data.theaterUrl.replace("biografer/", "")
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
    theaterUrl: ""
  })

  private static cleanUpTheaterName(originalName: string) {
    const cleanedUpName = originalName.replace("Nordisk Film Biografer ", "")
    return cleanedUpName
  }

  public toggleFavorited() {
    this.favorited = !this.favorited
  }

  public toggleSelection() {
    this.selected = !this.selected
  }
}