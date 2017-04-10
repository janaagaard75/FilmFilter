export class Environment {
  public static inDevelopmentMode() {
    const inDevMode = (process.env.NODE_ENV === "development")
    return inDevMode
  }
}