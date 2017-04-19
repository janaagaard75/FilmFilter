
import { SerializableMovie } from "./SerializableMovie"
import { SerializableShowing } from "./SerializableShowing"
import { SerializableTheater } from "./SerializableTheater"

// TODO: Prefix these interfaces with Api instead of Serializable once the old Api classes have been removed from the code.
// TODO: Share these interfaces with the Data project.
export interface SerializableData {
  readonly movies: Array<SerializableMovie>
  readonly showings: Array<SerializableShowing>
  readonly theaters: Array<SerializableTheater>
}