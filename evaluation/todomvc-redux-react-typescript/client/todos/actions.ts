// TODO: Replace redux-actions with redux-typescript-actions, https://github.com/aikoven/redux-typescript-actions.
import actionCreatorFactory from 'redux-typescript-actions'
import { assign } from 'lodash'

import { TodoId, Todo } from './model'

export const ADD_TODO = 'ADD_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const COMPLETE_ALL = 'COMPLETE_ALL'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'

const actionCreator = actionCreatorFactory()

// TODO: These action creators should be named differently. E.g. createAddTodo or todoCreated.
const addTodo = actionCreator<string>(ADD_TODO)

const deleteTodo = actionCreator<TodoId>(DELETE_TODO)

const editTodo = actionCreator<{todoId: TodoId, newText: string}>(EDIT_TODO)

// TODO: Rename to toggleTodo.
const completeTodo = actionCreator<TodoId>(COMPLETE_TODO)

const completeAll = actionCreator(COMPLETE_ALL)

const clearCompleted = actionCreator(CLEAR_COMPLETED)

export {
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAll,
  clearCompleted
}