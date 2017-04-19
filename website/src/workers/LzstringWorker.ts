import * as LZString from "lz-string"

import { LzstringWorkerMessage } from "./LzstringWorkerMessage"
import { SerializableData } from "../main/model/serializable-data/SerializableData"
import { TimestampedDataV2 } from "../main/model/TimestampedDataV2"
import { TypedMessageEvent } from "./TypedMessageEvent"

class LzstringWorker {
  public handleMessage(message: LzstringWorkerMessage) {
    switch (message.type) {
      case "compressTimestampedDataToStringV2":
        const compressedDataV2 = LzstringWorker.compressTimestampedDataToStringV2(message.payload)
        this.sendMessageBack(compressedDataV2)
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

  private static compressTimestampedDataToStringV2(timestampedData: TimestampedDataV2): string {
    const dataString = JSON.stringify(timestampedData)
    const compressedData = LZString.compressToUTF16(dataString)
    return compressedData
  }

  public static decompressStringToSerializedData(compressedSerializableData: string): SerializableData {
    const decompressedSerializableData = LZString.decompressFromBase64(compressedSerializableData)
    const serializableDataJson = JSON.parse(decompressedSerializableData) as SerializableData
    return serializableDataJson
  }
}

const lzstringWorker = new LzstringWorker()
self.addEventListener(
  "message",
  (e: TypedMessageEvent<LzstringWorkerMessage>) => lzstringWorker.handleMessage(e.data),
  false
)