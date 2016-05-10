import * as React from "react"
import * as moment from "moment"

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
      <li>{moment(this.props.start).format("D/M HH:mm")} - {this.props.movieUrl}</li>
    )
  }
}
