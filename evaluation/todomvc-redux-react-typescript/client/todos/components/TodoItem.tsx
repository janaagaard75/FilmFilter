import * as React from 'react'
import * as classNames from 'classnames'

import { Todo, TodoId } from '../model'
import { TodoTextInput } from './TodoTextInput'

interface TodoItemProps {
  todo: Todo
  key?: any
  completeTodo: (todoId: TodoId) => void
  deleteTodo: (todoId: TodoId) => void
  editTodo: (todoId: TodoId, newText: string) => void
}

interface TodoItemState {
  editing: boolean
}

export class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
  constructor(props, context) {
    super(props, context)
    this.state = {
      editing: false
    }
  }

  handleDoubleClick() {
    this.setState({ editing: true })
  }

  handleSave(todo: Todo, text: string) {
    if (text.length === 0) {
      this.props.deleteTodo(todo.id)
    } else {
      this.props.editTodo(todo.id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const {todo, completeTodo, deleteTodo} = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(todo, text)}
        />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)}
          />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text}
          </label>
          <button className="destroy"
            onClick={() => deleteTodo(todo.id)}
          />
        </div>
      )
    }

    return (
      <li className={classNames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}