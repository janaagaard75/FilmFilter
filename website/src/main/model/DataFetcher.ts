import "whatwg-fetch"
import * as LZString from "lz-string"

import { ApiData } from "./data/Data"
import { Logger } from "../utilities/Logger"

export class DataFetcher {
  private static readonly dataUrl = "https://film-filter-data.herokuapp.com/compressed"

  public static async fetchData(): Promise<ApiData | undefined> {
    try {
      Logger.log("Fetching data from API.")
      const response = await window.fetch(this.dataUrl, { mode: "cors" })
      const compressedString = await response.text()
      Logger.log("Done fetching. Decompressing Base64.")
      const dataString = LZString.decompressFromBase64(compressedString)
      Logger.log("Done decompressing. Parse JSON string.")
      const data = JSON.parse(dataString) as ApiData
      Logger.log("Done parsing. Fetching data done.")
      return data
    }
    catch (error) {
      console.error(error)
      return undefined
    }
  }
}