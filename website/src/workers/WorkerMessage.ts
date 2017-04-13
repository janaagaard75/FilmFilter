export interface WorkerMessage<TPayload> {
  payload: TPayload
  type: string
}