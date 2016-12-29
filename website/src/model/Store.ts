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
    const matching = this.data.showings
      // TODO: Support movies that don't have a separate move page.
      .filter(showing => showing.movieId !== -1)
      .slice(0, 100)
    return matching
  }
}