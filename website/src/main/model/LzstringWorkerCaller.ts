import { Logger } from "../utilities/Logger"
import { TimestampedData } from "./TimestampedData"
import { TypedMessageEvent } from "../../workers/TypedMessageEvent"
import { WorkerMessage } from "../../workers/WorkerMessage"

export class LzstringWorkerCaller {
  private static readonly LzstringWorker = require("../../workers/LzstringWorker") as any
  private static readonly lzstringWorker = new LzstringWorkerCaller.LzstringWorker() as Worker

  public static compressTimestampedDataToString(timestampedData: TimestampedData): Promise<string> {
    const promise = new Promise<string>(resolve => {
      LzstringWorkerCaller.lzstringWorker.addEventListener("message", (e: TypedMessageEvent<string>) => {
        Logger.log("Worker done stringifying and compressing timestamped data to string.")
        resolve(e.data)
      })
    })

    const message: WorkerMessage<TimestampedData> = {
      payload: timestampedData,
      type: "compressTimestampedDataToString"
    }

    Logger.log("Calling worker to stringify and compress timestamped data.")
    LzstringWorkerCaller.lzstringWorker.postMessage(message)

    return promise
  }
}