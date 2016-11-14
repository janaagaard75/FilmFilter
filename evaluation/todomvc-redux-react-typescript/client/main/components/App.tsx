import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as React from 'react'

import {
  addTodo,
  clearCompletedTodos,
  deleteTodo,
  editTodo,
  Header,
  MainSection,
  model,
  toggleAllTodos,
  toggleTodo
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
        <Header addTodo={(text: string) => dispatch(addTodo(text))} />
        <MainSection
          todos={todos}
          clearCompleted={() => dispatch(clearCompletedTodos())}
          completeAll={() => dispatch(toggleAllTodos())}
          completeTodo={(todoId) => dispatch(toggleTodo(todoId))}
          deleteTodo={(todoId) => dispatch(deleteTodo(todoId))}
          editTodo={(todoId, newText) => dispatch(editTodo({ todoId: todoId, newText: newText }))}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos
})

export const ConnectedApp = connect(mapStateToProps)(App)