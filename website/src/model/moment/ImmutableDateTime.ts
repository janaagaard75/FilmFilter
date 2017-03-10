// import * as moment from "moment"
import { DurationInputArg2 } from "moment"
import { Moment } from "moment"

import { ImmutableDate } from "./ImmutableDate"
import { ImmutableMoment } from "./ImmutableMoment"

export class ImmutableDateTime extends ImmutableMoment {
  constructor(dateTime?: string | Moment) {
    super(dateTime)
  }

  public add(amount: number, unit?: DurationInputArg2): ImmutableDateTime {
    const clone = this.moment.clone()
    clone.add(amount, unit)
    return new ImmutableDateTime(clone)
  }

  public equals(other: ImmutableDateTime): boolean {
    const equals = this.moment.unix() === other.moment.unix()
    return equals
  }

  public subtract(amount: number, unit?: DurationInputArg2): ImmutableDateTime {
    const clone = this.moment.clone()
    clone.subtract(amount, unit)
    return new ImmutableDateTime(clone)
  }

  public toDate(): ImmutableDate {
    const date = new ImmutableDate(this.moment)
    return date
  }
}