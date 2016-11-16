export type TodoId = number

export type Todo = {
  completed: boolean
  id: TodoId
  text: string
}

export type Todos = Array<Todo>