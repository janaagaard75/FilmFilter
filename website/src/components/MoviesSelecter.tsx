import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { CollapsibleCard } from "./CollapsibleCard"
import { Movie } from "../model/Movie"
import { MovieItem } from "./MovieItem"

interface Props {
  movies: Array<Movie>
  selectedMovies: Array<Movie>
  toggleMovieSelection: (movie: Movie) => void
}

@observer
export class MoviesSelecter extends Component<Props, void> {
  public render() {
    const header: string = this.props.selectedMovies.length === 0
      ? "Vælg film"
      : "Film: " + this.props.selectedMovies.map(movie => movie.originalTitle).join(", ")

    return (
      <CollapsibleCard header={header}>
        <div className="row">
          {this.props.movies.map(movie =>
            <MovieItem
              key={movie.movieUrl}
              movie={movie}
              toggleMovieSelection={() => this.props.toggleMovieSelection(movie)}
            />
          )}
        </div>
      </CollapsibleCard>
    )
  }
}