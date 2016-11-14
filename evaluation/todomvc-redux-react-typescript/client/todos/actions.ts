import actionCreatorFactory from 'redux-typescript-actions'
import { assign } from 'lodash'

import { TodoId, Todo } from './model'

export const ADD_TODO = 'ADD_TODO'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
export const COMPLETE_ALL = 'COMPLETE_ALL'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT_TODO = 'EDIT_TODO'

const actionCreator = actionCreatorFactory()

// TODO: These action creators should be named differently. E.g. createAddTodo or todoCreated.
export const addTodo = actionCreator<string>(ADD_TODO)
export const clearCompletedTodos = actionCreator(CLEAR_COMPLETED)
export const deleteTodo = actionCreator<TodoId>(DELETE_TODO)
export const editTodo = actionCreator<{todoId: TodoId, newText: string}>(EDIT_TODO)
export const toggleAllTodos = actionCreator(COMPLETE_ALL)
export const toggleTodo = actionCreator<TodoId>(COMPLETE_TODO)