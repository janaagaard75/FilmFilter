import actionCreatorFactory from 'redux-typescript-actions'

import { TodoId } from './model'

const actionCreator = actionCreatorFactory()

export const createAddTodo = actionCreator<string>('ADD_TODO')
export const createClearCompletedTodos = actionCreator('CLEAR_COMPLETED_TODOS')
export const createDeleteTodo = actionCreator<TodoId>('DELETE_TODO')
export const createEditTodo = actionCreator<{todoId: TodoId, newText: string}>('EDIT_TODO')
export const createToggleAllTodos = actionCreator('COMPLETE_ALL_TODOS')
export const createToggleTodo = actionCreator<TodoId>('COMPLETE_TODO')