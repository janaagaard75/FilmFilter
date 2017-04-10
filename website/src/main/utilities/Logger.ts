import { Environment } from "./Environment"

export class Logger {
  public static log(message: string) {
    if (Environment.inDevelopmentMode()) {
      // tslint:disable-next-line:no-console
      console.info(message)
    }
  }
}