import * as moment from "moment"
import { Moment } from "moment"

import { ImmutableMoment } from "./ImmutableMoment"

export class ImmutableDate extends ImmutableMoment {
  constructor(dateTime: Moment) {
    super(ImmutableDate.getDate(dateTime))
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
}