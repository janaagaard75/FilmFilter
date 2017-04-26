import { ApiData } from "./interface/ApiData"

export interface TimestampedData {
  buildTimestamp: number,
  data: ApiData,
  storeTimestamp: number
}