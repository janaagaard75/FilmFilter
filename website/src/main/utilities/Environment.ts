export class Environment {
  public static readonly inDevelopmentMode = (process.env.NODE_ENV === "development")
}