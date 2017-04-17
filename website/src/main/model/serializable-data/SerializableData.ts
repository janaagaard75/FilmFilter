
import { SerializableMovie } from "./SerializableMovie"
import { SerializableShowing } from "./SerializableShowing"
import { SerializableTheater } from "./SerializableTheater"

export interface SerializableData {
  readonly movies: Array<SerializableMovie>
  readonly showings: Array<SerializableShowing>
  readonly theaters: Array<SerializableTheater>
}