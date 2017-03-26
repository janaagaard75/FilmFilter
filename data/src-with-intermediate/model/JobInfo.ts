export interface JobInfo {
  close_reason: string,
  elapsed: number,
  finished_time: number,
  items: number,
  key: string,
  logs: number,
  pages: number,
  pending_time: number,
  running_time: number,
  spider: "movies" | "showings" | "theaters",
  state: string,
  ts: number,
  version: string
}