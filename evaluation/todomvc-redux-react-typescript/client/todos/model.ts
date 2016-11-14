export type TodoId = number

export type Todo = {
  // TOOD: Make the ID required.
  id?: TodoId
  text: string
  completed: boolean
}

export type IState = Array<Todo>