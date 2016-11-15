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
} from '../../todos/actions'

import { Header } from '../../todos/components/Header'
import { MainSection } from '../../todos/components/MainSection'
import { IState, Todo } from '../../todos/model'

interface AppProps {
  todos: Array<Todo>
  dispatch: Dispatch<IState>
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