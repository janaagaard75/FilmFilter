import { VersionFlag } from "./VersionFlag"

export interface ShowingLine {
  /** An empty string unless `movieUrl` is `"NO_MOVIE_URL"`. */
  movieTitle: string
  movieUrl: string | "NO_MOVIE_URL"
  seatingInfo: Array<string>
  showingUrl: string
  start: string
  theaterUrl: string
  version: Array<VersionFlag>
}