import { Data } from "./data/Data"
import { DataFetcher } from "./DataFetcher"

export class DataGetter {
  public static async getData(): Promise<Data> {
    const data = await DataFetcher.fetchData()

    if (data === undefined) {
      throw new Error("Could not fetch data.")
    }

    return data
  }
}