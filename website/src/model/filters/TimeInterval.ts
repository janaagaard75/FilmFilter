import { observable } from "mobx"

import { Time } from "./Time"
import { TimeIntervalJson } from "./TimeIntervalJson"

export class TimeInterval implements TimeIntervalJson {
  constructor() {
    this.from = TimeInterval.defaultFrom
    this.to = TimeInterval.defaultTo
  }

  @observable public from: Time
  @observable public to: Time

  public static readonly defaultFrom = new Time({ hours: 0, minutes: 0 })
  public static readonly defaultTo = new Time({ hours: 23, minutes: 59 })
}