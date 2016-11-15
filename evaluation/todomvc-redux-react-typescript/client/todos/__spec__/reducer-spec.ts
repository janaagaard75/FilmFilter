import { expect } from 'chai'

import { reducer } from '../reducer'
import { IState, Todo } from '../model'

import {
  addTodo,
  clearCompletedTodos,
  deleteTodo,
  editTodo,
  toggleAllTodos,
  toggleTodo
} from '../actions'

describe('todo reducer', () => {
  it('handles add', () => {
    const beforeState: IState = [{
      id: 0,
      text: '',
      completed: true
    }]

    const afterState = reducer(beforeState, addTodo('hello'))

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

    const afterState = reducer(beforeState, deleteTodo(1))

    expect(afterState).to.deep.equal([])
  })

  it('handles edit', () => {
    const beforeState: IState = [{
      id: 1,
      text: '',
      completed: false
    }]

    const afterState1 = reducer(beforeState, editTodo({
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

    const state2 = reducer(state1, toggleTodo(1))

    expect(state2[0]).to.deep.equal({
      id: 1,
      text: '',
      completed: true
    })

    const state3 = reducer(state2, toggleTodo(1))

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

    const state2 = reducer(state1, toggleAllTodos())

    expect(state2).to.deep.equal([
      { id: 1, text: '', completed: true },
      { id: 2, text: '', completed: true },
      { id: 3, text: '', completed: true }
    ])

    const state3 = reducer(state2, toggleAllTodos())

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

    const afterState = reducer(beforeState, clearCompletedTodos())

    expect(afterState).to.deep.equal([{
      id: 1,
      text: '',
      completed: false
    }])
  })
})