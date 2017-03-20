import { pad } from "../../utilities"
import { TimeJson } from "./TimeJson"

export class Time implements TimeJson {
  constructor(time: TimeJson) {
    this.hours = time.hours
    this.minutes = time.minutes
  }

  // TODO: Is there any reason to make these values read only?
  public readonly hours: number
  public readonly minutes: number

  public inputFieldValue() {
    const stringified = `${pad(this.hours, 2)}:${pad(this.minutes, 2)}`
    return stringified
  }

  public static fromString(timeString: string) {
    const splitted = timeString.split(/[^\d]/)
    const hours = parseInt(splitted[0], 10)
    const minutes = parseInt(splitted[1], 10)
    const time = new Time({ hours, minutes })
    return time
  }
}