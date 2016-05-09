import * as React from "react"

interface ShowingProps {
  "key": string
  "movieUrl": string
  "start": string
}

interface ShowingState {
}

export default class ShowingRow extends React.Component<ShowingProps, ShowingState> {
  constructor(props: ShowingProps) {
    super(props)
  }

  render() {
    return (
      <li>{this.props.start}: {this.props.movieUrl}</li>
    )
  }
}
