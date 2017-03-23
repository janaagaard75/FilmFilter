import { ShowingFlags } from "./ShowingFlags"

export interface ShowingData {
  readonly flags: ShowingFlags
  readonly movieId: number
  readonly seatingInfo: Array<string>
  readonly showingUrl: string
  readonly start: string
  readonly theaterId: number
}