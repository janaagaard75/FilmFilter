import * as moment from "moment"
import { action } from "mobx"
import { observable } from "mobx"

import { ImmutableDate } from "./ImmutableDate"
import { ImmutableDateTime } from "./ImmutableDateTime"

export class SelectableDate {
  // TODO: Consider removing ImmutableDateTime and moving toDate and toDateTime out of ImmutableMoment.
  constructor(dateOrDateTime: ImmutableDate | ImmutableDateTime) {
    this.date = dateOrDateTime.toDate()
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
    new ImmutableDateTime(moment(new Date(2000, 0, 1)))
  )
}