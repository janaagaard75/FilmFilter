import { WorkerMessage } from "./WorkerMessage"

type LzstringWorkerMessageType = "compressTimestampedDataToString" | "decompressStringToSerializableData"

export type LzstringWorkerMessage = WorkerMessage<LzstringWorkerMessageType>