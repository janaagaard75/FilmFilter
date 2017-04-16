import { SendableImmutableDateTime } from "./SendableImmutableDateTime"
import { SendableMovie } from "./SendableMovie"
import { SendableSelectableDate } from "./SendableSelectableDate"
import { SendableTheater } from "./SendableTheater"

export interface SendableShowing {
  date: SendableSelectableDate
  dubbed: boolean
  freeSeats: number
  imax: boolean
  movie: SendableMovie
  showingUrl: string
  specialShowing: boolean
  start: SendableImmutableDateTime
  theater: SendableTheater
  threeD: boolean
  totalSeats: number
}