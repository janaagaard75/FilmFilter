import { pad } from "../utilities"

export class Time {
  constructor(time: string) {
    const splitted = time.split(/[^\d]/)
    this.hours = parseInt(splitted[0], 10)
    this.minutes = parseInt(splitted[1], 10)
  }

  public readonly hours: number
  public readonly minutes: number

  public inputFieldValue() {
    const stringified = `${pad(this.hours, 2)}:${pad(this.minutes, 2)}`
    return stringified
  }
}