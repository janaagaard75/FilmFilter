import { SendableShowing } from "./SendableShowing"

export interface SendableMovie {
  danishTitle?: string
  movieUrl: string
  originalTitle: string
  posterUrl: string
  selected: boolean
  showings: Array<SendableShowing>
}