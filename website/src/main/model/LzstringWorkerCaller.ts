import { ApiData } from "./data/ApiData"
import { Logger } from "../utilities/Logger"
import { TimestampedData } from "./TimestampedData"
import { TypedMessageEvent } from "../../workers/TypedMessageEvent"
import { WorkerMessage } from "../../workers/WorkerMessage"

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
        Logger.log("Worker done compressing timestamped data to string.")
        resolve(e.data)
      })
    })

    const message: WorkerMessage<TimestampedData> = {
      payload: timestampedData,
      type: "compressTimestampedDataToString"
    }

    Logger.log("Calling worker compress timestamped data.")
    lzstringWorker.postMessage(message)

    return promise
  }

  public static decompressStringToApiData(compressedData: string): Promise<ApiData> {
    const lzstringWorker = this.getWorker()

    const promise = new Promise<ApiData>(resolve => {
      lzstringWorker.addEventListener("message", (e: TypedMessageEvent<ApiData>) => {
        Logger.log("Worker done decompressing string to API data.")
        resolve(e.data)
      })
    })

    const message: WorkerMessage<string> = {
      payload: compressedData,
      type: "decompressStringToApiData"
    }

    Logger.log("Calling worker to decompress to API data.")
    lzstringWorker.postMessage(message)

    return promise
  }
}