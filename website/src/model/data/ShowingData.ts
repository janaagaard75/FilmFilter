import { ShowingFlags } from "./ShowingFlags"

export interface ShowingData {
  readonly flags: ShowingFlags
  readonly movieIndex: number
  readonly seatingInfo: Array<string>
  readonly showingUrl: string
  readonly start: string
  readonly theaterIndex: number
}