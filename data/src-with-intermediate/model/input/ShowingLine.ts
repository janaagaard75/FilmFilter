import { VersionFlag } from "./VersionFlag"

export interface ShowingLine {
  /** An empty string unless `movieUrl` is `"NO_MOVIE_URL"`. */
  movieTitle: string
  /** Full URL, starts with the standard prefix. */
  movieUrl: string | "NO_MOVIE_URL"
  seatingInfo: Array<string>
  /** Full URL, starts with the standard prefix. */
  showingUrl: string
  start: string
  /** Full URL, starts with the standard prefix. */
  theaterUrl: string
  version: Array<VersionFlag>
}