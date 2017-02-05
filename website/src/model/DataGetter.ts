import { Data } from "./data/Data"
import { DataFetcher } from "./DataFetcher"
import { DataStorer } from "./DataStorer"

export class DataGetter {
  public static async getData(): Promise<Data> {
    const storedData = DataStorer.loadData()

    if (storedData === undefined
      || DataGetter.isWrongVersion(storedData.buildTimestamp)
      || DataGetter.isOutdated(storedData.storeTimestamp)
    ) {
      const fetchedData = await DataGetter.fetchAndUpdateStoredData()
      return fetchedData
    }

    return storedData.data
  }

  public static async fetchAndUpdateStoredData(): Promise<Data> {
    const fetchedData = await DataFetcher.fetchData()

    if (fetchedData === undefined) {
      throw new Error("Could not fetch data.")
    }

    DataStorer.saveData(fetchedData)
    return fetchedData
  }

  private static isWrongVersion(buildTimestamp: number) {
    const timestampMatches = buildTimestamp === __BUILD_TIMESTAMP__
    return !timestampMatches
  }

  private static isOutdated(storeTimestamp: Date) {
    const now = new Date()
    // tslint:disable-next-line prefer-const
    let latestDataFetch = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 0, 0)
    if (latestDataFetch.valueOf() > now.valueOf()) {
      latestDataFetch.setDate(latestDataFetch.getDate() - 1)
    }

    const millisecondsIn24Hours = 24 * 60 * 60 * 1000
    const millisecondsSinceLatestFetch = latestDataFetch.valueOf() - storeTimestamp.valueOf()
    const isOutdated = millisecondsSinceLatestFetch > millisecondsIn24Hours
    return isOutdated
  }
}