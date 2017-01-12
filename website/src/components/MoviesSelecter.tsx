import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Movie } from "../model/Movie"
import { MovieItem } from "./MovieItem"
import { ToggleableCollapsibleCard } from "./bootstrap/ToggleableCollapsibleCard"

interface Props {
  movies: Array<Movie>
  selectedMovies: Array<Movie>
  toggleMovieSelection: (movie: Movie) => void
}

interface State {
  expanded: boolean
}

@observer
export class MoviesSelecter extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      expanded: false
    }
  }

  private handleToggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  private handleToggleMovieSelection(movie: Movie) {
    this.props.toggleMovieSelection(movie)

    // TODO: This works as intented, but unintentionally. The selectedMovies array isn't up to date when making the comparison. The length should have been compared to 1.
    if (this.props.selectedMovies.length === 0) {
      this.setState({
        expanded: false
      })
    }
  }

  public render() {
    const header: string = this.props.selectedMovies.length === 0
      ? "Vælg film"
      : "Film: " + this.props.selectedMovies.map(movie => movie.originalTitle).join(", ")

    return (
      <ToggleableCollapsibleCard header={header} expanded={this.state.expanded} onToggleExpanded={() => this.handleToggleExpanded()}>
        <div className="row">
          {this.props.movies.map(movie =>
            <MovieItem
              key={movie.movieUrl}
              movie={movie}
              toggleMovieSelection={() => this.handleToggleMovieSelection(movie)}
            />
          )}
        </div>
      </ToggleableCollapsibleCard>
    )
  }
}

// TODO: Selecting a movie should close the collapsible.