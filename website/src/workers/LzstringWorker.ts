import * as LZString from "lz-string"

import { ApiData } from "../main/model/api-data/ApiData"
import { LzstringWorkerMessage } from "./LzstringWorkerMessage"
import { TimestampedData } from "../main/model/TimestampedData"
import { TypedMessageEvent } from "./TypedMessageEvent"

class LzstringWorker {
  public handleMessage(message: LzstringWorkerMessage) {
    switch (message.type) {
      case "compressTimestampedDataToString":
        const compressedData = LzstringWorker.compressTimestampedDataToString(message.payload)
        this.sendMessageBack(compressedData)
        break

      case "decompressStringToSerializableData":
        const serializableData = LzstringWorker.decompressStringToSerializedData(message.payload)
        this.sendMessageBack(serializableData)
        break

      default:
        throw new Error(`The message type '${message.type} is not supported.`)
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

  public static decompressStringToSerializedData(compressedSerializableData: string): ApiData {
    const decompressedSerializableData = LZString.decompressFromBase64(compressedSerializableData)
    const serializableDataJson = JSON.parse(decompressedSerializableData) as ApiData
    return serializableDataJson
  }
}

const lzstringWorker = new LzstringWorker()
self.addEventListener(
  "message",
  (e: TypedMessageEvent<LzstringWorkerMessage>) => lzstringWorker.handleMessage(e.data),
  false
)