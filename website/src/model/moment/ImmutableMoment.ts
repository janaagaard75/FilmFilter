import * as moment from "moment"
import { Moment } from "moment"

import { Comparer } from "../../utilities/Comparer"
import { Dates } from "../../utilities/Dates"

export abstract class ImmutableMoment {
  constructor(dateTime?: string | Moment) {
    if (dateTime === undefined) {
      this.moment = moment()
    }
    else if (Comparer.isString(dateTime)) {
      this.moment = moment(Dates.parseAsLocalDateTime(dateTime))
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

  public hours(): number {
    return this.moment.hours()
  }

  public month(): number {
    return this.moment.month()
  }

  public weekday(): number {
    return this.moment.weekday()
  }

  public year(): number {
    return this.moment.year()
  }
}