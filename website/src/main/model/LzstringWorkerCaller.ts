import { ApiData } from "./interface/ApiData"
import { TimestampedData } from "./TimestampedData"
import { TypedMessageEvent } from "../../workers/TypedMessageEvent"
import { LzstringWorkerMessage } from "../../workers/LzstringWorkerMessage"

export class LzstringWorkerCaller {
  private static readonly LzstringWorker = require("../../workers/LzstringWorker") as any

  private static getWorker(): Worker {
    const lzstringWorker = new this.LzstringWorker() as Worker
    return lzstringWorker
  }

  public static compressTimestampedDataToString(timestampedData: TimestampedData): Promise<string> {
    const lzstringWorker = this.getWorker()

    const promise = new Promise<string>(resolve => {
      lzstringWorker.addEventListener("message", (e: TypedMessageEvent<string>) => {
        resolve(e.data)
      })
    })

    const message: LzstringWorkerMessage = {
      payload: timestampedData,
      type: "compressTimestampedDataToString"
    }

    lzstringWorker.postMessage(message)

    return promise
  }

  public static decompressStringToSerializableData(compressedData: string): Promise<ApiData> {
    const lzstringWorker = this.getWorker()

    const promise = new Promise<ApiData>(resolve => {
      lzstringWorker.addEventListener("message", (e: TypedMessageEvent<ApiData>) => {
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