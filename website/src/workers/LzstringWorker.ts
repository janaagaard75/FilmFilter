import * as LZString from "lz-string"

// import { ApiData } from "../main/model/api-data/ApiData"
import { LzstringWorkerMessage } from "./LzstringWorkerMessage"
import { SerializableData } from "../main/model/serializable-data/SerializableData"
// import { TimestampedData } from "../main/model/TimestampedData"
import { TimestampedDataV2 } from "../main/model/TimestampedDataV2"
import { TypedMessageEvent } from "./TypedMessageEvent"

class LzstringWorker {
  public handleMessage(message: LzstringWorkerMessage) {
    switch (message.type) {
      // case "compressTimestampedDataToString":
      //   const compressedData = LzstringWorker.compressTimestampedDataToString(message.payload)
      //   this.sendMessageBack(compressedData)
      //   break

      case "compressTimestampedDataToStringV2":
        const compressedDataV2 = LzstringWorker.compressTimestampedDataToStringV2(message.payload)
        this.sendMessageBack(compressedDataV2)
        break

      // case "decompressStringToApiData":
      //   const apiData = LzstringWorker.decompressStringToApiData(message.payload)
      //   this.sendMessageBack(apiData)
      //   break

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

  // private static compressTimestampedDataToString(timestampedData: TimestampedData): string {
  //   const dataString = JSON.stringify(timestampedData)
  //   const compressedData = LZString.compressToUTF16(dataString)
  //   return compressedData
  // }

  private static compressTimestampedDataToStringV2(timestampedData: TimestampedDataV2): string {
    const dataString = JSON.stringify(timestampedData)
    const compressedData = LZString.compressToUTF16(dataString)
    return compressedData
  }

  // private static decompressStringToApiData(compressedApiData: string): ApiData {
  //   const decompressedApiData = LZString.decompressFromBase64(compressedApiData)
  //   const apiDataJson = JSON.parse(decompressedApiData) as ApiData
  //   return apiDataJson
  // }

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