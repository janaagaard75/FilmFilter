import { ApiData } from "./api-data/ApiData"

export interface TimestampedData {
  buildTimestamp: number,
  data: ApiData,
  storeTimestamp: number
}