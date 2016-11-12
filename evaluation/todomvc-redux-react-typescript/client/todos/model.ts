export type Todo = {
  // TOOD: Make the ID required.
  id?: number
  text: string
  completed: boolean
}

export type IState = Array<Todo>