import * as LZString from "lz-string"

import { ApiData } from "../main/model/data/ApiData"
import { TimestampedData } from "../main/model/TimestampedData"
import { TypedMessageEvent } from "./TypedMessageEvent"

class LzstringWorker {
  public handleMessage(message: LzstringMessage) {
    switch (message.command) {
      case "compressTimestampedDataToString":
        const compressedData = lzstringWorker.compressTimestampedDataToString(message.value)
        this.sendMessageBack(compressedData)
        break

      case "decompressStringToApiData":
        const apiDatan = LzstringWorker.decompressStringToApiData(message.value)
        this.sendMessageBack(apiData)
        break
    }
  }

  private sendMessageBack(data: any): void {
    postMessage(data)
  }

  private static compressTimestampedDataToString(timestampedData: TimestampedData): string {
    const dataString = JSON.stringify(timestampedData)
    const compressedData = LZString.compressToUTF16(dataString)
    return compressedData
  }

  private static decompressStringToApiData(compressedApiData: string): ApiData {
    const decompressed = LZString.decompressFromBase64(compressedApiData)
    const json = JSON.parse(decompressed) as ApiData
    return json
  }
}

// TODO: Would it be better to let each worker handle a single thing, in order to simplify the API for workers?
interface LzstringMessage {
  command: "compressTimestampedDataToString" | "decompressStringToApiData"
  value: string | TimestampedData
}

type LzstringMessageEvent = TypedMessageEvent<LzstringMessage>

const lzstringWorker = new LzstringWorker()
self.addEventListener(
  "message",
  (e: LzstringMessageEvent) => lzstringWorker.handleMessage(e.data),
  false
)