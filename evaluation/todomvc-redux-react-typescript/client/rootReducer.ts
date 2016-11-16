import { combineReducers } from 'redux'

import { todosReducer } from './todos/todosReducer'
import { GlobalReduxState } from './main'

export const rootReducer = combineReducers<GlobalReduxState>({
  todos: todosReducer
})