interface Process {
  env: {
    NODE_ENV: "development" | "production"
  }
}

declare const __BUILD_TIMESTAMP__: number
declare const process: Process

declare const require: {
    <T>(path: string): T
    (paths: Array<string>, callback: (...modules: Array<any>) => void): void
    ensure: (paths: Array<string>, callback: (require: <T>(path: string) => T) => void) => void
}