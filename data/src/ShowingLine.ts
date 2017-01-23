import { VersionFlag } from "./VersionFlag"

export interface ShowingLine {
  movieUrl: string
  seatingInfo: Array<string>
  showingUrl: string
  start: string
  theaterUrl: string
  version: Array<VersionFlag>
}