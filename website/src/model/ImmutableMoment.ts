import * as moment from "moment"
import { Moment } from "moment"

import { isString } from "../utilities"

export class ImmutableMoment {
  constructor(dateTime: string | Moment) {
    if (isString(dateTime)) {
      this.moment = moment.parseZone(dateTime)
    }
    else {
      this.moment = moment(dateTime)
    }
  }

  private moment: Moment

  public diff(other: ImmutableMoment): number {
    const diff = this.moment.diff(other.moment)
    return diff
  }

  public equals(other: ImmutableMoment): boolean {
    const equals = this.moment.unix() === other.moment.unix()
    return equals
  }

  public format(format: string): string {
    const formatted = this.moment.format(format)
    return formatted
  }

  /** Return a new ImmutableMoment where the hours have been stripped. */
  public toDate(): ImmutableMoment {
    const date = new ImmutableMoment(this.moment.clone().startOf("day"))
    return date
  }
}