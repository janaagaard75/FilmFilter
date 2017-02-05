import { Data } from "./data/Data"

interface TimestampedData {
  buildTimestamp: number,
  data: Data,
  storeTimestamp: Date
}

// TODO: Add a date to the data being stored.
export class DataStorer {
  private static readonly dataKey = "data"

  public static loadData(): TimestampedData | undefined {
    const dataString = localStorage.getItem(this.dataKey)

    // tslint:disable-next-line no-null-keyword
    if (dataString === null) {
      return undefined
    }

    return JSON.parse(dataString) as TimestampedData
  }

  public static saveData(data: Data) {
    const storedData: TimestampedData = {
      buildTimestamp: __BUILD_TIMESTAMP__,
      data: data,
      storeTimestamp: new Date()
    }

    const dataString = JSON.stringify(storedData)
    localStorage.setItem(this.dataKey, dataString)
  }
}