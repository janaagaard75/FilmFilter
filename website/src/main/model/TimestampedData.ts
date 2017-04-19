import { SerializableData } from "./serializable-data/SerializableData"

export interface TimestampedData {
  buildTimestamp: number,
  data: SerializableData,
  storeTimestamp: number
}