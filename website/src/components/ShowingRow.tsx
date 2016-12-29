import * as moment from 'moment'
import * as React from 'react'
import { Component } from 'react'

import { ShowingData } from '../model/Data'
import { Store } from '../model/Store'

interface Props {
  showing: ShowingData,
  store: Store
}

export class ShowingRow extends Component<Props, void> {
  public render() {
    const date = moment(this.props.showing.start)

    return (
      <tr>
        <td>{this.props.showing.movieId === -1
          ? ''
          : <a href={'http://www.kino.dk/' + this.props.store.data.movies[this.props.showing.movieId].movieUrl}>
              {this.props.store.data.movies[this.props.showing.movieId].originalTitle}
            </a>}</td>
        <td>
          <a href={'http://www.kino.dk/' + this.props.store.data.theaters[this.props.showing.theaterId].theatherUrl}>
            {this.props.store.data.theaters[this.props.showing.theaterId].name}
          </a>
        </td>
        <td>
          <a href={'http://www.kino.dk/' + this.props.showing.showingUrl}>
            {date.format('dd D/M HH:mm')}
          </a>
        </td>
      </tr>
    )
  }
}