import { assign } from 'lodash'
import { Action as ReduxAction } from 'redux'
import { isType, Action } from 'redux-typescript-actions'

import { Todo, IState } from './model'
import {
  createAddTodo,
  createClearCompletedTodos,
  createDeleteTodo,
  createEditTodo,
  createToggleAllTodos,
  createToggleTodo
} from './actions'

const initialState: IState = [<Todo>{
  text: 'Use Redux with TypeScript',
  completed: false,
  id: 0
}]

export const todosReducer = (state: IState = initialState, action: ReduxAction): IState => {
  if (isType(action, createAddTodo)) {
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: action.payload
    }, ...state]
  }

  if (isType(action, createDeleteTodo)) {
    return state.filter(todo =>
      todo.id !== action.payload
    )
  }

  if (isType(action, createEditTodo)) {
    return <IState>state.map(todo =>
      todo.id === action.payload.todoId
        ? assign(<Todo>{}, todo, { text: action.payload.newText })
        : todo
    )
  }

  if (isType(action, createToggleTodo)) {
    return <IState>state.map(todo =>
      todo.id === action.payload
        ? assign({}, todo, { completed: !todo.completed })
        : todo
    )
  }

  if (isType(action, createToggleAllTodos)) {
    const areAllMarked = state.every(todo => todo.completed);
    return <IState>state.map(todo => assign({}, todo, {
      completed: !areAllMarked
    }))
  }

  if (isType(action, createClearCompletedTodos)) {
    return state.filter(todo => todo.completed === false)
  }

  return state
}