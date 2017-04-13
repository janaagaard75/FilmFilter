import "whatwg-fetch"
import * as LZString from "lz-string"

import { ApiData } from "./data/ApiData"
import { Logger } from "../utilities/Logger"
import { LzstringWorkerCaller } from "./LzstringWorkerCaller";

export class DataFetcher {
  private static readonly dataUrl = "https://film-filter-data.herokuapp.com/compressed"

  public static async fetchData(): Promise<ApiData | undefined> {
    try {
      Logger.log("Fetching data from API using worker.")
      const response = await window.fetch(this.dataUrl, { mode: "cors" })
      const compressedString = await response.text()
      const apiData = await LzstringWorkerCaller.decompressStringToApiData(compressedString)
      return apiData
    }
    catch (error) {
      console.error(error)
      return undefined
    }
  }
}