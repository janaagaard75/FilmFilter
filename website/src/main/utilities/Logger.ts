import { Environment } from "./Environment"

export class Logger {
  private static lastTimestamp: number | undefined

  public static log(message: string): void {
    if (!Environment.inDevelopmentMode()) {
      return
    }

    // tslint:disable-next-line:no-console
    console.info(message)
  }

  public static logAndTime(message: string): void {
    if (!Environment.inDevelopmentMode()) {
      return
    }

    if (this.lastTimestamp === undefined) {
      throw new Error("The timer hasn't been started. Call startTimer() before calling logAndTime().")
    }

    const thisTimestamp = Date.now()

    const executionTime = thisTimestamp - this.lastTimestamp
    const formatted = executionTime.toLocaleString("da-DK")
    const timestampedMessage = `${message} (${formatted} ms)`

    // tslint:disable-next-line:no-console
    console.info(timestampedMessage)
  }

  public static startTimer(): void {
    if (!Environment.inDevelopmentMode()) {
      return
    }

    this.lastTimestamp = Date.now()
  }
}