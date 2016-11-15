import { combineReducers } from 'redux'

import { todosReducer } from '../todos/todos'

export const rootReducer = combineReducers({
  todosReducer
})