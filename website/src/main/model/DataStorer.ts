import * as LZString from "lz-string"

import { ApiData } from "./interface/ApiData"
import { Logger } from "../utilities/Logger"
import { LzstringWorkerCaller } from "./LzstringWorkerCaller"
import { TimestampedData } from "./TimestampedData"

export class DataStorer {
  private static readonly dataKey = "data"

  public static dataIsOkay(storedData: TimestampedData | undefined): storedData is TimestampedData {
    const isUpToDate = storedData !== undefined
      && DataStorer.isCorrectVersion(storedData.buildTimestamp)
      && DataStorer.isRecentEnough(storedData.storeTimestamp)

    if (isUpToDate) {
      Logger.log("The stored data is from the coorect build and recent enough.")
    }

    return isUpToDate
  }

  public static loadData(): TimestampedData | undefined {
    const compressedData = localStorage.getItem(DataStorer.dataKey)
    // tslint:disable-next-line:no-null-keyword
    if (compressedData === null) {
      return undefined
    }

    const dataString = LZString.decompressFromUTF16(compressedData)

    try {
      return JSON.parse(dataString) as TimestampedData
    }
    catch (error) {
      console.error(error)
      return undefined
    }
  }

  public static async saveData(data: ApiData): Promise<void> {
    const timestampedData: TimestampedData = {
      buildTimestamp: __BUILD_TIMESTAMP__,
      data: data,
      storeTimestamp: new Date().valueOf()
    }

    const compressedString = await LzstringWorkerCaller.compressTimestampedDataToString(timestampedData)

    localStorage.setItem(DataStorer.dataKey, compressedString)
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