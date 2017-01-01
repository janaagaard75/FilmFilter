import * as React from 'react'
import { Component } from 'react'

import { Collapse } from './bootstrap/Collapse'
import { Movie } from '../model/Movie'

interface Props {
  movies: Array<Movie>
}

interface State {
  expanded: boolean
}

export class MovieCard extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      expanded: false
    }
  }

  private handleToggle() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  public render() {
    // TODO: Figure out how to avoid the <br> tag
    return (
      <div className="card">
        <div className="card-header clickable" onClick={e => this.handleToggle()}>
          <h5 className="mb-0">
            Vælg film
          </h5>
        </div>
        <Collapse expanded={this.state.expanded}>
          <div className="row">
            {this.props.movies.map(movie =>
              <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2" key={movie.movieUrl}>
                <img src={movie.posterUrl} alt={movie.originalTitle} className="img-fluid"/>
                {movie.originalTitle}
                {movie.danishTitle !== undefined
                  ? <i><br/>{movie.danishTitle}</i>
                  : ''}
              </div>
            )}
          </div>
        </Collapse>
      </div>
    )
  }
}