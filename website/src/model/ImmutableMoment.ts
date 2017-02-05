import * as moment from "moment"
import { Moment } from "moment"

import { isString } from "../utilities"
import { parseAsLocalDateTime } from "../utilities"

export abstract class ImmutableMoment {
  constructor(dateTime?: string | Moment) {
    if (dateTime === undefined) {
      this.moment = moment()
    }
    else if (isString(dateTime)) {
      this.moment = moment(parseAsLocalDateTime(dateTime))
    }
    else {
      this.moment = moment(dateTime)
    }
  }

  protected moment: Moment

  public date(): number {
    return this.moment.date()
  }

  public diff(other: ImmutableMoment): number {
    const diff = this.moment.diff(other.moment)
    return diff
  }

  public format(format: string): string {
    const formatted = this.moment.format(format)
    return formatted
  }

  public month(): number {
    return this.moment.month()
  }

  public weekday(): number {
    const weekday = this.moment.weekday()
    return weekday
  }

  public year(): number {
    return this.moment.year()
  }
}