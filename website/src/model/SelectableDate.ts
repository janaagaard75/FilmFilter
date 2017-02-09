import * as moment from "moment"
import { action } from "mobx"
import { observable } from "mobx"

import { ImmutableDate } from "./ImmutableDate"

export class SelectableDate {
  constructor(date: ImmutableDate) {
    this.date = date
    this.selected = false
  }

  public readonly date: ImmutableDate
  @observable public selected: boolean

  // TODO: Should this be part of the model? And if so, what about a formatting of the start in Showing.ts?
  public get label(): string {
    const label = this.date.format("D/M")
    return label
  }

  public get key(): string {
    const key = this.date.format("YYYYMMDD")
    return key
  }

  @action
  public toggleSelection() {
    this.selected = !this.selected
  }

  public static UndefinedSelectableDate = new SelectableDate(
    new ImmutableDate(moment(new Date(2000, 0, 1)))
  )
}