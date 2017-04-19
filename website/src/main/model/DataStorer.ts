import * as LZString from "lz-string"

import { Logger } from "../utilities/Logger"
import { LzstringWorkerCaller } from "./LzstringWorkerCaller"
import { SerializableData } from "./serializable-data/SerializableData"
import { TimestampedDataV2 } from "./TimestampedDataV2"

export class DataStorer {
  private static readonly dataKeyV2 = "dataV2"

  public static dataIsOkayV2(storedData: TimestampedDataV2 | undefined): storedData is TimestampedDataV2 {
    const isUpToDate = storedData !== undefined
      && DataStorer.isCorrectVersion(storedData.buildTimestamp)
      && DataStorer.isRecentEnough(storedData.storeTimestamp)

    if (isUpToDate) {
      Logger.log("The stored data is from the coorect build and recent enough.")
    }

    return isUpToDate
  }

  public static loadDataV2(): TimestampedDataV2 | undefined {
    const compressedData = localStorage.getItem(DataStorer.dataKeyV2)
    // tslint:disable-next-line:no-null-keyword
    if (compressedData === null) {
      return undefined
    }

    const dataString = LZString.decompressFromUTF16(compressedData)

    try {
      return JSON.parse(dataString) as TimestampedDataV2
    }
    catch (error) {
      console.error(error)
      return undefined
    }
  }

  public static async saveDataV2(data: SerializableData): Promise<void> {
    const timestampedData: TimestampedDataV2 = {
      buildTimestamp: __BUILD_TIMESTAMP__,
      data: data,
      storeTimestamp: new Date().valueOf()
    }

    const compressedString = await LzstringWorkerCaller.compressTimestampedDataV2ToString(timestampedData)

    localStorage.setItem(DataStorer.dataKeyV2, compressedString)
  }

  private static isCorrectVersion(storedBuildTimestamp: number) {
    const timestampMatches = storedBuildTimestamp === __BUILD_TIMESTAMP__
    return timestampMatches
  }

  private static isRecentEnough(storeTimestamp: number) {
    const now = new Date()
    // tslint:disable-next-line:prefer-const
    let latestDataCrawl = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 0, 0)
    if (latestDataCrawl.valueOf() > now.valueOf()) {
      latestDataCrawl.setDate(latestDataCrawl.getDate() - 1)
    }

    const millisecondsIn24Hours = 24 * 60 * 60 * 1000
    const millisecondsSinceLatestFetch = latestDataCrawl.valueOf() - storeTimestamp
    const isRecentEnough = millisecondsSinceLatestFetch < millisecondsIn24Hours

    return isRecentEnough
  }
}