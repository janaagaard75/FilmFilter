import * as moment from "moment"
import { Moment } from "moment"

import { ImmutableMoment } from "./ImmutableMoment"

type DateDurationUnit = (
  "year" | "years" | "y" |
  "month" | "months" | "M" |
  "week" | "weeks" | "w" |
  "day" | "days" | "d" |
  "quarter" | "quarters" | "Q"
)

export class ImmutableDate extends ImmutableMoment {
  constructor(dateTime: Moment) {
    super(ImmutableDate.getDate(dateTime))
  }

  public add(amount: number, unit?: DateDurationUnit): ImmutableDate {
    const clone = this.moment.clone()
    clone.add(amount, unit)
    return new ImmutableDate(clone)
  }

  public equals(other: ImmutableDate): boolean {
    const equals = this.moment.unix() === other.moment.unix()
    return equals
  }

  /** Return a Moment where the hours and minutes have been removed. */
  private static getDate(dateTime: Moment): Moment {
    const date = moment(new Date(
      dateTime.year(),
      dateTime.month(),
      dateTime.date()
    ))

    return date
  }

  public subtract(amount: number, unit?: DateDurationUnit): ImmutableDate {
    const clone = this.moment.clone()
    clone.subtract(amount, unit)
    return new ImmutableDate(clone)
  }
}