import { expect } from 'chai'

import { todos } from '../todos'
import { IState, Todo } from '../model'

import {
  createAddTodo,
  createClearCompletedTodos,
  createDeleteTodo,
  createEditTodo,
  createToggleAllTodos,
  createToggleTodo
} from '../actions'

describe('todos reducer', () => {
  it('handles add', () => {
    const beforeState: IState = [{
      id: 0,
      text: '',
      completed: true
    }]

    const afterState = todos(beforeState, createAddTodo('hello'))

    expect(afterState[0]).to.deep.equal({
      id: 1,
      text: 'hello',
      completed: false
    })
  })

  it('handles delete', () => {
    const beforeState: IState = [{
      id: 1,
      text: '', completed: false
    }]

    const afterState = todos(beforeState, createDeleteTodo(1))

    expect(afterState).to.deep.equal([])
  })

  it('handles edit', () => {
    const beforeState: IState = [{
      id: 1,
      text: '',
      completed: false
    }]

    const afterState1 = todos(beforeState, createEditTodo({
      todoId: 1,
      newText: 'hello'
    }))

    expect(afterState1[0]).to.deep.equal({
      id: 1,
      text: 'hello',
      completed: false
    })
  })

  it('handles complete all', () => {
    const state1: IState = [{
      id: 1,
      text: '',
      completed: false
    }]

    const state2 = todos(state1, createToggleTodo(1))

    expect(state2[0]).to.deep.equal({
      id: 1,
      text: '',
      completed: true
    })

    const state3 = todos(state2, createToggleTodo(1))

    expect(state3[0]).to.deep.equal({
      id: 1,
      text: '',
      completed: false
    })
  })

  it('handles complete all', () => {
    const state1: IState = [
      { id: 1, text: '', completed: false },
      { id: 2, text: '', completed: true },
      { id: 3, text: '', completed: false }
    ]

    const state2 = todos(state1, createToggleAllTodos())

    expect(state2).to.deep.equal([
      { id: 1, text: '', completed: true },
      { id: 2, text: '', completed: true },
      { id: 3, text: '', completed: true }
    ])

    const state3 = todos(state2, createToggleAllTodos())

    expect(state3).to.deep.equal([
      { id: 1, text: '', completed: false },
      { id: 2, text: '', completed: false },
      { id: 3, text: '', completed: false }
    ])
  })

  it('handles clear completed', () => {
    let beforeState: IState = [
      { id: 1, text: '', completed: false },
      { id: 2, text: '', completed: true }
    ]

    const afterState = todos(beforeState, createClearCompletedTodos())

    expect(afterState).to.deep.equal([{
      id: 1,
      text: '',
      completed: false
    }])
  })
})