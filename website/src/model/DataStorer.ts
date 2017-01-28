import { Data } from "./data/Data"

// TODO: Add a date to the data being stored.
export class DataStorer {
  private static readonly dataKey = "data"

  public static loadData(): Data | undefined {
    const dataString = localStorage.getItem(this.dataKey)

    if (dataString === null) {
      return undefined
    }

    return JSON.parse(dataString)
  }

  public static saveData(data: Data) {
    const dataString = JSON.stringify(data)
    localStorage.setItem(this.dataKey, dataString)
  }
}