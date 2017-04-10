import { ShowingFlags } from "./ShowingFlags"

export interface ShowingData {
  readonly flags: ShowingFlags
  readonly movieIndex: number
  readonly seatingInfo: Array<string>
  readonly showingId: number
  readonly start: string
  readonly theaterIndex: number
}