import * as React from "react"
import { Component } from "react"

import { CollapsibleCard } from "./CollapsibleCard"
import { Movie } from "../model/Movie"
import { MovieItem } from "./MovieItem"

interface Props {
  movies: Array<Movie>
  selectedMovies: Array<Movie>
  toggleMovieSelection: (movie: Movie) => void
}

interface State {
  expanded: boolean
}

export class MoviesSelecter extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      expanded: false
    }
  }

  public render() {
    const header: string = this.props.selectedMovies.length === 0
      ? "Vælg film"
      : "Film: " + this.props.selectedMovies.map(movie => movie.originalTitle).join(", ")

    return (
      <CollapsibleCard header={header}>
        {this.props.movies.map(movie =>
          <MovieItem
            key={movie.movieUrl}
            movie={movie}
            toggleMovieSelection={() => this.props.toggleMovieSelection(movie)}
          />
        )}
      </CollapsibleCard>
    )
  }
}