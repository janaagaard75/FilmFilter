import { observable } from 'mobx'

import { Data } from './Data'

export class Store {
  constructor(data: Data) {
    this.data = data
  }

  @observable
  public data: Data
}