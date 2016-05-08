import * as React from "react"
import Showing, { IShowing } from "./Showing"

export interface FilmFilterAppProps {
  showings: Array<IShowing>
}

export interface FilmFilterAppState {
}

export default class FilmFilterApp extends React.Component<FilmFilterAppProps, FilmFilterAppState> {
  constructor(props: FilmFilterAppProps) {
    super(props)
  }

  public render() {
    return (
      <div className="container">
        <h1>Film Filter</h1>
        <ul>
          {this.props.showings.map(showing => {
            return <Showing
              key={showing.showing_url}
              original_title={showing.original_title}
              start={showing.start}/>
          })}
        </ul>
      </div>)
  }
}
