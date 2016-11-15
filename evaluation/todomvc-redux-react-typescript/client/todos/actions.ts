import actionCreatorFactory from 'redux-typescript-actions'
import { assign } from 'lodash'

import { TodoId, Todo } from './model'

const actionCreator = actionCreatorFactory()

// TODO: These action creators should be named differently. E.g. createAddTodo or todoCreated.
export const addTodo = actionCreator<string>('ADD_TODO')
export const clearCompletedTodos = actionCreator('CLEAR_COMPLETED_TODOS')
export const deleteTodo = actionCreator<TodoId>('DELETE_TODO')
export const editTodo = actionCreator<{todoId: TodoId, newText: string}>('EDIT_TODO')
export const toggleAllTodos = actionCreator('COMPLETE_ALL_TODOS')
export const toggleTodo = actionCreator<TodoId>('COMPLETE_TODO')