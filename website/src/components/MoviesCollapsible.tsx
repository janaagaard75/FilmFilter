import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Movie } from "../model/Movie"
import { MoviesPicker } from "./MoviesPicker"
import { ToggleableCollapsibleCard } from "./bootstrap/ToggleableCollapsibleCard"

interface Props {
  movies: Array<Movie>
  selectedMovies: Array<Movie>
  setMovieNameFilter: (filter: string) => void
}

interface State {
  expanded: boolean
}

@observer
export class MoviesCollapsible extends Component<Props, State> {
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
    movie.toggleSelection()

    // This works as intented, but unintentionally. The selectedMovies array isn't up to date when making the comparison. The length should have been compared to 1.
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
      <ToggleableCollapsibleCard
        expanded={this.state.expanded}
        header={header}
        onToggleExpanded={() => this.handleToggleExpanded()}
      >
        <MoviesPicker
          movies={this.props.movies}
          setMovieNameFilter={this.props.setMovieNameFilter}
          handleToggleMovieSelection={movie => this.handleToggleMovieSelection(movie)}
        />
      </ToggleableCollapsibleCard>
    )
  }
}
