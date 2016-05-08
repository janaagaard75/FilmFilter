import * as React from "react"

export interface IShowing {
  "danish_title": string
  "movie_url": string
  "name": string
  "original_title": string
  "poster_url": string
  "showing_url": string
  "start": string
  "theater_url": string
  "version": string
}

interface ShowingProps {
  "key": string
  "original_title": string
  "start": string
}

interface ShowingState {
}

export default class Showing extends React.Component<ShowingProps, ShowingState> {
  constructor(props: ShowingProps) {
    super(props)
  }

  render() {
    return (
      <li>{this.props.original_title}, {this.props.start}</li>
    )
  }
}
