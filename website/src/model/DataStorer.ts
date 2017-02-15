import * as LZString from "lz-string"

import { Data } from "./data/Data"

interface TimestampedData {
  buildTimestamp: number,
  data: Data,
  storeTimestamp: number
}

export class DataStorer {
  private static readonly dataKey = "data"

  public static dataIsOkay(storedData: TimestampedData | undefined): storedData is TimestampedData {
    const isUpToDate = storedData !== undefined
      && DataStorer.isCorrectVersion(storedData.buildTimestamp)
      && DataStorer.isRecentEnough(storedData.storeTimestamp)
    return isUpToDate
  }

  public static loadData(): TimestampedData | undefined {
    const compressedData = localStorage.getItem(this.dataKey)
    // tslint:disable-next-line no-null-keyword
    if (compressedData === null) {
      return undefined
    }

    const dataString = LZString.decompressFromUTF16(compressedData)
    try {
      return JSON.parse(dataString) as TimestampedData
    }
    catch (ex) {
      return undefined
    }
  }

  public static saveData(data: Data) {
    const storedData: TimestampedData = {
      buildTimestamp: __BUILD_TIMESTAMP__,
      data: data,
      storeTimestamp: new Date().valueOf()
    }

    const dataString = JSON.stringify(storedData)
    const compressedData = LZString.compressToUTF16(dataString)
    localStorage.setItem(this.dataKey, compressedData)
  }

  private static isCorrectVersion(storedBuildTimestamp: number) {
    const timestampMatches = storedBuildTimestamp === __BUILD_TIMESTAMP__
    return timestampMatches
  }

  private static isRecentEnough(storeTimestamp: number) {
    const now = new Date()
    // tslint:disable-next-line prefer-const
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