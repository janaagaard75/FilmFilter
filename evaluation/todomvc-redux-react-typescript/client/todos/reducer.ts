import { assign } from 'lodash'
import { Action as ReduxAction } from 'redux'
import { isType, Action } from 'redux-typescript-actions'
// import { handleActions, Action } from 'redux-actions'

import { Todo, IState } from './model'
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
  toggleAllTodos,
  clearCompletedTodos
} from './actions'

const initialState: IState = [<Todo>{
  text: 'Use Redux with TypeScript',
  completed: false,
  id: 0
}]

// TODO: Consider renaming to reduce.
export const reducer = (state: IState = initialState, action: ReduxAction): IState => {
  if (isType(action, addTodo)) {
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: action.payload
    }, ...state]
  }

  if (isType(action, deleteTodo)) {
    return state.filter(todo =>
      todo.id !== action.payload
    )
  }

  if (isType(action, editTodo)) {
    return <IState>state.map(todo =>
      todo.id === action.payload.todoId
        ? assign(<Todo>{}, todo, { text: action.payload.newText })
        : todo
    )
  }

  if (isType(action, toggleTodo)) {
    return <IState>state.map(todo =>
      todo.id === action.payload
        ? assign({}, todo, { completed: !todo.completed })
        : todo
    )
  }

  if (isType(action, toggleAllTodos)) {
    const areAllMarked = state.every(todo => todo.completed);
    return <IState>state.map(todo => assign({}, todo, {
      completed: !areAllMarked
    }))
  }

  if (isType(action, clearCompletedTodos)) {
    return state.filter(todo => todo.completed === false)
  }

  return state
}