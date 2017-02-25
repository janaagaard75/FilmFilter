import * as React from "react"
import { Component } from "react"
import { KeyboardEvent } from "react"
import { observer } from "mobx-react"

import { Movie } from "../model/Movie"
import { MovieItem } from "./MovieItem"
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
export class MoviesSelecter extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      expanded: false
    }
  }

  private handleKeyUp(formEvent: KeyboardEvent<HTMLInputElement>) {
    if (formEvent.key === "Escape") {
      formEvent.currentTarget.value = ""
    }

    const filter = formEvent.currentTarget.value.trim()
    this.props.setMovieNameFilter(filter)
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
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Søg efter film"
          onKeyUp={e => this.handleKeyUp(e)}
        />
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
