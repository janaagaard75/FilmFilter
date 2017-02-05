declare var __BUILD_TIMESTAMP__: number

declare var require: {
  <T>(path: string): T
  (paths: Array<string>, callback: (...modules: Array<any>) => void): void
  ensure: (paths: Array<string>, callback: (require: <T>(path: string) => T) => void) => void
}