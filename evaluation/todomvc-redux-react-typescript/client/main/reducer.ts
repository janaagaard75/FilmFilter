import { combineReducers } from 'redux'

import { todos } from '../todos/todos'

export const rootReducer = combineReducers({
  todos
})