import { computed } from 'mobx'
import { observable } from 'mobx'

import { Data } from './Data'
import { ShowingData } from './Data'

export class Store {
  constructor() {
    this.data = require<Data>('../data.json')
  }

  @observable
  public data: Data

  @computed
  public get matchingShowings(): Array<ShowingData> {
    const first100 = this.data.showings.slice(0, 100)
    return first100
  }
}