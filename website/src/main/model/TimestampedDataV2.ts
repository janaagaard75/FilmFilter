import { SerializableData } from "./serializable-data/SerializableData"

export interface TimestampedDataV2 {
  buildTimestamp: number,
  data: SerializableData,
  storeTimestamp: number
}