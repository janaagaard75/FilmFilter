export type TodoId = number

export type Todo = {
  completed: boolean
  id: TodoId
  text: string
}

export type IState = Array<Todo>