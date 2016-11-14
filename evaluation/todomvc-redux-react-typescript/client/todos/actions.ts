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

const toggleTodo = actionCreator<TodoId>(COMPLETE_TODO)

const toggleAllTodos = actionCreator(COMPLETE_ALL)

const clearCompletedTodos = actionCreator(CLEAR_COMPLETED)

export {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
  toggleAllTodos,
  clearCompletedTodos
}