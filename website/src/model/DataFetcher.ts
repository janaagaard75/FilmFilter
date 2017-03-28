import "whatwg-fetch"
import * as LZString from "lz-string"

import { Data } from "./data/Data"
import { Logger } from "../utilities/Logger"

export class DataFetcher {
  private static readonly dataUrl = "https://film-filter-data.herokuapp.com/compressed"

  public static async fetchData(): Promise<Data | undefined> {
    Logger.log("Fetching data.")

    try {
      const response = await window.fetch(this.dataUrl, { mode: "cors" })
      const compressedString = await response.text()
      const dataString = LZString.decompressFromBase64(compressedString)
      const data = JSON.parse(dataString) as Data
      return data
    }
    catch (error) {
      console.error(error)
      return undefined
    }
    finally {
      Logger.log("Done fetching data.")
    }
  }
}