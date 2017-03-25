interface Process {
  env: {
    NODE_ENV: "development" | "production"
  }
}

declare const __BUILD_TIMESTAMP__: number
declare const process: Process