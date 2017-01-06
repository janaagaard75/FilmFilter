import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Card } from "./bootstrap/Card"
import { Showing } from "../model/Showing"
import { ShowingsTable } from "./ShowingsTable"

interface Props {
  matchingShowings: Array<Showing>
}

@observer
export class MatchingShowings extends Component<Props, void> {
  public render() {
    const header: string = this.props.matchingShowings.length === 0
      ? "Ingen matchende visninger"
      : "Matchende visninger: " + this.props.matchingShowings.length

    return (
      <Card header={header}>
        <ShowingsTable showings={this.props.matchingShowings.slice(0, 25)}/>
      </Card>
    )
  }
}