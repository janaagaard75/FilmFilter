import * as moment from "moment"
import { action } from "mobx"
import { observable } from "mobx"

import { ImmutableDate } from "./ImmutableDate"
import { Showing } from "./Showing"

export class SelectableDate {
  constructor(date: ImmutableDate) {
    this.date = date
    this.selected = false
    this.showings = new Set()
  }

  public readonly date: ImmutableDate
  @observable public selected: boolean
  public showings: Set<Showing>

  public get label(): string {
    const label = this.date.format("D/M")
    return label
  }

  public get key(): string {
    const key = this.date.format("YYYYMMDD")
    return key
  }

  public addShowing(showing: Showing) {
    this.showings.add(showing)
  }

  @action
  public toggleSelection() {
    this.selected = !this.selected
  }

  public static UndefinedSelectableDate = new SelectableDate(
    new ImmutableDate(moment(new Date(2000, 0, 1)))
  )
}