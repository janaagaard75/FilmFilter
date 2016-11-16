import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Store, createStore } from 'redux'
import { Provider } from 'react-redux'

import { ConnectedApp } from './main/components/App'
import { rootReducer } from './main/rootReducer'
import { Todo } from './todos/model'

import 'todomvc-app-css/index.css'

export type GlobalReduxState = {
  todos?: Array<Todo>
}

// TODO: If initialState is initialized with todos being an empty array, then the initial state is todosReducer is ignored.
const initialState: GlobalReduxState = {}

const store: Store<GlobalReduxState> = createStore<GlobalReduxState>(rootReducer, initialState)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app')
)