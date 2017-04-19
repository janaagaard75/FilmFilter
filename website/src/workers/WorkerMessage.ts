// TODO: Do something clever with these.
export interface WorkerMessage<TPayload, TType> {
  payload: TPayload
  type: TType
}