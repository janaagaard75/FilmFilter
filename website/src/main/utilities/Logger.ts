import { Environment } from "./Environment"

export class Logger {
  private static lastTimestamp: number | undefined

  public static log(message: string): void {
    if (!Environment.inDevelopmentMode()) {
      return
    }

    const thisTimestamp = Date.now()
    if (this.lastTimestamp !== undefined) {
      const executionTime = thisTimestamp - this.lastTimestamp
      const formatted = executionTime.toLocaleString("da-DK")
      message += ` (${formatted} ms)`
    }

    // tslint:disable-next-line:no-console
    console.info(message)
    this.lastTimestamp = thisTimestamp
  }
}