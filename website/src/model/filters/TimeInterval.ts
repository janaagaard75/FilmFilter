import { observable } from "mobx"

import { TimeIntervalJson } from "./TimeIntervalJson"

export class TimeInterval implements TimeIntervalJson {
  constructor() {
    this.from = TimeInterval.defaultFrom
    this.to = TimeInterval.defaultTo
  }

  @observable public from: number
  @observable public to: number

  public static readonly defaultFrom = 0
  public static readonly defaultTo = 24
}