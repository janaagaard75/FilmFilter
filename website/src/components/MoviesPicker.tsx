import * as React from "react"
import { Component } from "react"
import { KeyboardEvent } from "react"
import { observer } from "mobx-react"

import { Movie } from "../model/Movie"
import { MoviePicker } from "./MoviePicker"

interface Props {
  movies: Array<Movie>
  setMovieNameFilter: (filter: string) => void
}

@observer
export class MoviesPicker extends Component<Props, void> {
  private handleKeyUp(formEvent: KeyboardEvent<HTMLInputElement>) {
    if (formEvent.key === "Escape") {
      formEvent.currentTarget.value = ""
    }

    const filter = formEvent.currentTarget.value.trim()
    this.props.setMovieNameFilter(filter)
  }

  public render() {
    return (
      <div>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Søg efter film"
          onKeyUp={e => this.handleKeyUp(e)}
        />
        <div className="row">
          {this.props.movies.map(movie =>
            <MoviePicker
              key={movie.movieUrl}
              movie={movie}
            />
          )}
        </div>
      </div>
    )
  }
}