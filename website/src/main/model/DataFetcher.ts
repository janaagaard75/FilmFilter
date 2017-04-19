import "whatwg-fetch"

// import { ApiData } from "./api-data/ApiData"
import { LzstringWorkerCaller } from "./LzstringWorkerCaller"
import { SerializableData } from "./serializable-data/SerializableData"

export class DataFetcher {
  private static readonly dataUrl = "https://film-filter-data.herokuapp.com/v2/compressed"

  public static async fetchData(): Promise<SerializableData | undefined> {
    try {
      const response = await window.fetch(this.dataUrl, { mode: "cors" })
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