import { observable } from "mobx"

import { Time } from "./Time"

export class TimeInterval {
  constructor() {
    this.from = TimeInterval.defaultFrom
    this.to = TimeInterval.defaultTo
  }

  @observable public from: Time
  @observable public to: Time

  public static readonly defaultFrom = new Time("00:00")
  public static readonly defaultTo = new Time("23:59")
}