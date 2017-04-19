import { WorkerMessage } from "./WorkerMessage"

type LzstringWorkerMessageType = "compressTimestampedDataToStringV2" | "decompressStringToSerializableData"

export type LzstringWorkerMessage = WorkerMessage<LzstringWorkerMessageType>