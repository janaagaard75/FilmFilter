import "whatwg-fetch"

import { Data } from "./data/Data"

export class DataFetcher {
  private static readonly dataUrl = "https://film-filter-data.herokuapp.com/"

  public static async fetchData(): Promise<Data | undefined> {
    try {
      const response = await window.fetch(this.dataUrl)
      const data = await response.json() as Data
      return data
    }
    catch (error) {
      console.error(error)
      return undefined
    }
  }
}