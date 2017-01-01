import * as React from 'react'
import { Component } from 'react'

import { Collapse } from './bootstrap/Collapse'
import { Movie } from '../model/Movie'
import { MovieBox } from './MovieBox'

interface Props {
  movies: Array<Movie>
  selectedMovies: Array<Movie>
  toggleMovieSelection: (movie: Movie) => void
}

interface State {
  expanded: boolean
}

// TODO: Rename to MoviesCard
export class MovieCard extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      expanded: false
    }
  }

  private toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  public render() {
    // TODO: Figure out how to avoid the <br> tag
    return (
      <div className="card">
        <div className="card-header clickable" onClick={() => this.toggleExpanded()}>
          <h5 className="mb-0">
            {this.props.selectedMovies.length === 0
              ? 'Vælg Film'
              : 'Film: TODO: List selected movies'}
          </h5>
        </div>
        <Collapse expanded={this.state.expanded}>
          <div className="row">
            {this.props.movies.map(movie =>
              <MovieBox
                key={movie.movieUrl}
                movie={movie}
                toggleMovieSelection={() => this.props.toggleMovieSelection(movie)}
              />
            )}
          </div>
        </Collapse>
      </div>
    )
  }
}