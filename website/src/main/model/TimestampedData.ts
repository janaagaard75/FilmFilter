import { ApiData } from "./serializable-data/SerializableData"

export interface TimestampedData {
  buildTimestamp: number,
  data: ApiData,
  storeTimestamp: number
}