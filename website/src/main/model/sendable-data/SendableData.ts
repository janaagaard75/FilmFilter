import { SendableMovie } from "./SendableMovie"
import { SendableSelectableDate } from "./SendableSelectableDate"
import { SendableShowing } from "./SendableShowing"
import { SendableTheater } from "./SendableTheater"

export interface SendableData {
  readonly dates: Array<SendableSelectableDate>
  readonly movies: Array<SendableMovie>
  readonly showings: Array<SendableShowing>
  readonly theaters: Array<SendableTheater>
}