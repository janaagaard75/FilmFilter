import { computed } from 'mobx'
import { observable } from 'mobx'

import { Data } from './Data'
import { Showing } from './Data'

export class Store {
  constructor() {
    this.data = require<Data>('../data.json')
  }

  @observable
  public data: Data

  @computed
  public get first100Showings(): Array<Showing> {
    const first100 = this.data.showings.slice(0, 100)
    return first100
  }
}