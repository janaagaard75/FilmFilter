import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as React from 'react'

import {
  createAddTodo,
  createClearCompletedTodos,
  createDeleteTodo,
  createEditTodo,
  createToggleAllTodos,
  createToggleTodo,
  Header,
  MainSection,
  model
} from '../../todos'

interface AppProps {
  todos: Array<model.Todo>
  dispatch: Dispatch<model.IState>
}

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

const mapStateToProps = state => ({
  todos: state.todos
})

export const ConnectedApp = connect(mapStateToProps)(App)