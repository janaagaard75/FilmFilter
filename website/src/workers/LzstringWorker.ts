import * as LZString from "lz-string"

import { ApiData } from "../main/model/api-data/ApiData"
import { TimestampedData } from "../main/model/TimestampedData"
import { TypedMessageEvent } from "./TypedMessageEvent"
import { WorkerMessage } from "./WorkerMessage"

class LzstringWorker {
  public handleMessage(message: WorkerMessage<any>) {
    switch (message.type) {
      case "compressTimestampedDataToString":
        const compressedData = LzstringWorker.compressTimestampedDataToString(message.payload)
        this.sendMessageBack(compressedData)
        break

      case "decompressStringToApiData":
        const apiData = LzstringWorker.decompressStringToApiData(message.payload)
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

const lzstringWorker = new LzstringWorker()
self.addEventListener(
  "message",
  (e: TypedMessageEvent<WorkerMessage<any>>) => lzstringWorker.handleMessage(e.data),
  false
)