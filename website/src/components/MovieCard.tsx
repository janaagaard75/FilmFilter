import * as React from 'react'
import { Component } from 'react'

import { Movie } from '../model/Movie'

interface Props {
  movies: Array<Movie>
}

export class MovieCard extends Component<Props, void> {
  public render() {
    // TODO: Figure out how to avoid the <br> tag
    return (
      <div className="card">
        <div className="card-header" role="tab" id="headingOne">
          <h5 className="mb-0">
            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Vælg film
            </a>
          </h5>
        </div>
        <div id="collapseOne" className="collapse in" role="tabpanel" aria-labelledby="headingOne">
          <div className="card-block">
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
          </div>
        </div>
      </div>
    )
  }
}