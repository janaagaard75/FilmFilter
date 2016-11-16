import { Dispatch, bindActionCreators } from 'redux'
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

interface StateProps {
  todos: Array<Todo>
}

interface DispatchProps {
  dispatch: Dispatch<IState>
}

interface AppProps extends StateProps, DispatchProps { }

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

type ReduxState = {
  todos: Array<Todo>
}

const mapStateToProps/*: StateProps*/ = (state: ReduxState) => {
  const mapped = {
    todos: state.todos
  }
  return mapped
}

// const mapDispatchToProps = (dispatch) => {
//   const mapped = {
//     todoActions: bindActionCreators(actions, dispatch)
//   }
//   return
// }

export const ConnectedApp = connect(mapStateToProps)(App)