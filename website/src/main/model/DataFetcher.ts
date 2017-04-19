import "whatwg-fetch"

// import { ApiData } from "./api-data/ApiData"
import { LzstringWorkerCaller } from "./LzstringWorkerCaller"
import { SerializableData } from "./serializable-data/SerializableData"

export class DataFetcher {
  // private static readonly dataUrl = "https://film-filter-data.herokuapp.com/compressed"
  private static readonly dataUrlV2 = "https://film-filter-data.herokuapp.com/v2/compressed"

  // public static async fetchData(): Promise<ApiData | undefined> {
  //   try {
  //     const response = await window.fetch(this.dataUrl, { mode: "cors" })
  //     const compressedString = await response.text()
  //     const apiData = await LzstringWorkerCaller.decompressStringToApiData(compressedString)
  //     return apiData
  //   }
  //   catch (error) {
  //     console.error(error)
  //     return undefined
  //   }
  // }

  public static async fetchDataV2(): Promise<SerializableData | undefined> {
    try {
      const response = await window.fetch(this.dataUrlV2, { mode: "cors" })
      const compressedString = await response.text()
      const serializableData = await LzstringWorkerCaller.decompressStringToSerializableData(compressedString)
      return serializableData
    }
    catch (error) {
      console.error(error)
      return undefined
    }
  }
}