// import { ApiData } from "./api-data/ApiData"
import { SerializableData } from "./serializable-data/SerializableData"
// import { TimestampedData } from "./TimestampedData"
import { TimestampedDataV2 } from "./TimestampedDataV2"
import { TypedMessageEvent } from "../../workers/TypedMessageEvent"
import { LzstringWorkerMessage } from "../../workers/LzstringWorkerMessage"

export class LzstringWorkerCaller {
  private static readonly LzstringWorker = require("../../workers/LzstringWorker") as any

  private static getWorker(): Worker {
    const lzstringWorker = new this.LzstringWorker() as Worker
    return lzstringWorker
  }

  // public static compressTimestampedDataToString(timestampedData: TimestampedData): Promise<string> {
  //   const lzstringWorker = this.getWorker()

  //   const promise = new Promise<string>(resolve => {
  //     lzstringWorker.addEventListener("message", (e: TypedMessageEvent<string>) => {
  //       resolve(e.data)
  //     })
  //   })

  //   const message: WorkerMessage<TimestampedData> = {
  //     payload: timestampedData,
  //     type: "compressTimestampedDataToString"
  //   }

  //   lzstringWorker.postMessage(message)

  //   return promise
  // }

  public static compressTimestampedDataV2ToString(timestampedData: TimestampedDataV2): Promise<string> {
    const lzstringWorker = this.getWorker()

    const promise = new Promise<string>(resolve => {
      lzstringWorker.addEventListener("message", (e: TypedMessageEvent<string>) => {
        resolve(e.data)
      })
    })

    const message: LzstringWorkerMessage = {
      payload: timestampedData,
      type: "compressTimestampedDataToStringV2"
    }

    lzstringWorker.postMessage(message)

    return promise
  }

  // public static decompressStringToApiData(compressedData: string): Promise<ApiData> {
  //   const lzstringWorker = this.getWorker()

  //   const promise = new Promise<ApiData>(resolve => {
  //     lzstringWorker.addEventListener("message", (e: TypedMessageEvent<ApiData>) => {
  //       resolve(e.data)
  //     })
  //   })

  //   const message: WorkerMessage<string> = {
  //     payload: compressedData,
  //     type: "decompressStringToApiData"
  //   }

  //   lzstringWorker.postMessage(message)

  //   return promise
  // }

  public static decompressStringToSerializableData(compressedData: string): Promise<SerializableData> {
    const lzstringWorker = this.getWorker()

    const promise = new Promise<SerializableData>(resolve => {
      lzstringWorker.addEventListener("message", (e: TypedMessageEvent<SerializableData>) => {
        resolve(e.data)
      })
    })

    const message: LzstringWorkerMessage = {
      payload: compressedData,
      type: "decompressStringToSerializableData"
    }

    lzstringWorker.postMessage(message)

    return promise
  }
}