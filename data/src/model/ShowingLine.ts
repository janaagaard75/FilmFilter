import { VersionFlag } from "./VersionFlag"

export interface ShowingLine {
  /** An empty string unless `movieUrl` is `"NO_MOVIE_TITLE"`. */
  movieTitle: string
  movieUrl: string
  seatingInfo: Array<string>
  showingUrl: string
  start: string
  theaterUrl: string
  version: Array<VersionFlag>
}