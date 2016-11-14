import { expect } from 'chai'

import { reducer } from '../reducer'
import { IState, Todo } from '../model'

import {
  addTodo,
  deleteTodo,
  editTodo,
  completeTodo,
  completeAll,
  clearCompleted
} from '../actions'

describe('todo reducer', () => {
  it('handles add', () => {
    const beforeState: IState = [{
      id: 0,
      text: '',
      completed: true
    }]

    const afterState = reducer(beforeState, addTodo('hello'))

    expect(afterState[0]).to.equal({
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

    expect(afterState).to.equal([])
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

    expect(afterState1[0]).to.equal({
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

    const state2 = reducer(state1, completeTodo(1))

    expect(state2[0]).to.equal({
      id: 1,
      text: '',
      completed: true
    })

    const state3 = reducer(state2, completeTodo(1))

    expect(state3[0]).to.equal({
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

    const state2 = reducer(state1, completeAll())

    expect(state2).to.equal([
      { id: 1, text: '', completed: true },
      { id: 2, text: '', completed: true },
      { id: 3, text: '', completed: true }
    ])

    const state3 = reducer(state2, completeAll())

    expect(state3).to.equal([
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

    const afterState = reducer(beforeState, clearCompleted())

    expect(afterState).to.equal([{
      id: 1,
      text: '',
      completed: false
    }])
  })
})