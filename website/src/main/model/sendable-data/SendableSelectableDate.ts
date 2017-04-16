import { SendableImmutableDate } from "./SendableImmutableDate"
import { SendableShowing } from "./SendableShowing"

export interface SendableSelectableDate {
  date: SendableImmutableDate
  selected: boolean
  showings: Set<SendableShowing>
}