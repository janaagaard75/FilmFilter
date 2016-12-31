import * as React from 'react'
import { Component } from 'react'

import { Movie } from '../model/Movie'

interface Props {
  movies: Array<Movie>
}

export class MovieCard extends Component<Props, void> {
  public render() {
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
            Her kommer der en liste af film&hellip;
          </div>
        </div>
      </div>
    )
  }
}