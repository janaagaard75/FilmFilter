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

  private getMovieCssClass(index: number): string {
    // Only show the 25th movie in LG screen size.
    return index === 24
      ? "hidden-md-down hidden-xl-up"
      : ""
  }

  public render() {
    const firstMovies = this.props.movies.slice(0, 25)

    return (
      <div>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Søg efter film"
          onKeyUp={e => this.handleKeyUp(e)}
        />
        <div className="row pl-3 pr-3">
          {firstMovies.map((movie, index) =>
            <MoviePicker
              key={movie.key}
              cssClass={this.getMovieCssClass(index)}
              movie={movie}
            />
          )}
        </div>
      </div>
    )
  }
}