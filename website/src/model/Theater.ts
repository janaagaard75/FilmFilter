import { action } from "mobx"
import { computed } from "mobx"
import { observable } from "mobx"

import { TheaterData } from "./data/TheaterData"

export class Theater {
  constructor(data: TheaterData) {
    this.name = Theater.cleanUpTheaterName(data.name)
    this._selected = false
    this.theatherUrl = "http://www.kino.dk/" + data.theatherUrl
  }

  @observable private _selected: boolean
  public readonly name: string
  public readonly theatherUrl: string

  @computed
  public get selected(): boolean {
    return this._selected
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
  public toggleSelection() {
    this._selected = !this._selected
  }
}