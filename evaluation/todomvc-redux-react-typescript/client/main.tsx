import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Store, createStore } from 'redux'
import { Provider } from 'react-redux'

import { ConnectedApp } from './App'
import { rootReducer } from './rootReducer'
import { Todo } from './todos/model'

import 'todomvc-app-css/index.css'

export type GlobalReduxState = {
  todos?: Array<Todo>
}

const initialState: GlobalReduxState = {}

const store: Store<GlobalReduxState> = createStore<GlobalReduxState>(rootReducer, initialState)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app')
)