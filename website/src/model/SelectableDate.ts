import { Moment } from "moment"
import { observable } from "mobx"

export class SelectableDate {
  constructor(date: Moment) {
    this.date = date.startOf("day")
    this.selected = false
  }

  public readonly date: Moment
  @observable public selected: boolean

  // TODO: Should this be part of the model? And if so, what about a formatting of the start in Showing.ts?
  public get label(): string {
    const label = this.date.format("dd D/M")
    return label
  }
}