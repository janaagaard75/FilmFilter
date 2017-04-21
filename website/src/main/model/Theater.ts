import { observable } from "mobx"

import { Comparable } from "../utilities/Comparable"
import { ApiTheater } from "./api-data/ApiTheater"

export class Theater implements Comparable<Theater> {
  constructor(serializableTheater: ApiTheater) {
    this.favorited = false
    this.name = Theater.cleanUpTheaterName(serializableTheater.name)
    this.selected = false
    this.theaterId = serializableTheater.theaterId
  }

  public readonly name: string
  public readonly theaterId: string

  @observable public favorited: boolean
  @observable public selected: boolean

  public get theaterUrl(): string {
    const theaterUrl = "http://www.kino.dk/biografer/" + this.theaterId
    return theaterUrl
  }

  public equals(other: Theater) {
    return this.theaterId === other.theaterId
  }

  public static readonly UndefinedTheater = new Theater({
    name: "",
    theaterId: ""
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