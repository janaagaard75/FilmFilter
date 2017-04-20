import { ShowingFlags } from "./ShowingFlags"

export interface ApiShowing {
  readonly flags: ShowingFlags
  readonly freeSeats: number
  readonly movieIndex: number
  readonly showingId: number
  readonly start: number
  readonly theaterIndex: number
  readonly totalSeats: number
}