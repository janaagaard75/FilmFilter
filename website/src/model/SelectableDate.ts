import * as moment from "moment"
import { action } from "mobx"
import { observable } from "mobx"

import { ImmutableMoment } from "./ImmutableMoment"

export class SelectableDate {
  constructor(date: ImmutableMoment) {
    this.date = date.toDate()
    this.selected = false
  }

  public readonly date: ImmutableMoment
  @observable public selected: boolean

  // TODO: Should this be part of the model? And if so, what about a formatting of the start in Showing.ts?
  public get label(): string {
    const label = this.date.format("dd D/M")
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
    new ImmutableMoment(moment(new Date(2000, 0, 1)))
  )
}