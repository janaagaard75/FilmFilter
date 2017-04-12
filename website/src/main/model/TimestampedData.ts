import { ApiData } from "./data/ApiData"

export interface TimestampedData {
  buildTimestamp: number,
  data: ApiData,
  storeTimestamp: number
}