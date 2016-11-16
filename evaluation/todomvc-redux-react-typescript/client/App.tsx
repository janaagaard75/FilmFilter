import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as React from 'react'

import {
  createAddTodo,
  createClearCompletedTodos,
  createDeleteTodo,
  createEditTodo,
  createToggleAllTodos,
  createToggleTodo
} from './todos/actions'

import { Header } from './todos/components/Header'
import { MainSection } from './todos/components/MainSection'
import { Todos, Todo } from './todos/model'
import { GlobalReduxState } from './main'

interface AppStateProps {
  todos: Array<Todo>
}

interface AppDispatchProps {
  dispatch: Dispatch<Todos>
}

interface AppProps extends AppStateProps, AppDispatchProps { }

class App extends React.Component<AppProps, void> {
  render() {
    const { todos, dispatch } = this.props

    return (
      <div className="todoapp">
        <Header addTodo={(text: string) => dispatch(createAddTodo(text))} />
        <MainSection
          todos={todos}
          clearCompleted={() => dispatch(createClearCompletedTodos())}
          completeAll={() => dispatch(createToggleAllTodos())}
          completeTodo={(todoId) => dispatch(createToggleTodo(todoId))}
          deleteTodo={(todoId) => dispatch(createDeleteTodo(todoId))}
          editTodo={(todoId, newText) => dispatch(createEditTodo({ todoId: todoId, newText: newText }))}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: GlobalReduxState): AppStateProps => {
  return  {
    todos: state.todos
  }
}

export const ConnectedApp = connect(mapStateToProps)(App)