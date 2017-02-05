import { Data } from "./data/Data"

interface TimestampedData {
  data: Data,
  timestamp: Date
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
      data: data,
      timestamp: new Date()
    }

    const dataString = JSON.stringify(storedData)
    localStorage.setItem(this.dataKey, dataString)
  }
}