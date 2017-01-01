import * as classNames from 'classnames'
import * as React from 'react'
import { Component } from 'react'

import { Movie } from '../model/Movie'

interface Props {
  movie: Movie
  toggleMovieSelection: () => void
}

export class MovieBox extends Component<Props, void> {
  public render() {
    const cssClasses = classNames(
      'col-xs-6 col-sm-4 col-md-3 col-lg-2 clickable',
      {
        'selected-box': this.props.movie.selected
      }
    )

    return (
      // TODO: Consider removing the <br> element, or simply removing the Danish title altogether.
      <div className={cssClasses} onClick={this.props.toggleMovieSelection}>
        <img src={this.props.movie.posterUrl} alt={this.props.movie.originalTitle} className="img-fluid"/>
        {this.props.movie.originalTitle}
        {this.props.movie.danishTitle !== undefined
          ? <span><br/><i>{this.props.movie.danishTitle}</i></span>
          : ''}
      </div>
    )
  }
}