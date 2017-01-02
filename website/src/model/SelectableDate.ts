import { Moment } from "moment"
import { observable } from "mobx"

export class SelectableDate {
  constructor(date: Moment) {
    this.date = date.startOf("day")
    this.selected = false
  }

  public readonly date: Moment
  @observable public selected: boolean

  public get label(): string {
    const label = this.date.format("dd D/M")
    return label
  }
}