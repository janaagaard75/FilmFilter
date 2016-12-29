import { observable } from 'mobx'

import { Data } from './Data'


export class Store {
  constructor() {
    this.data = require<Data>('../data.json')
  }

  @observable
  public data: Data
}