// TODO: Figure out how to strongly type the payload.
export interface WorkerMessage<TType> {
  payload: any
  type: TType
}