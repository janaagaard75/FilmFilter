import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { CollapsibleCard } from "./CollapsibleCard"
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
      <CollapsibleCard header={header}>
        <div className="col-xs-12">
          <ShowingsTable showings={this.props.matchingShowings.slice(0, 25)}/>
        </div>
      </CollapsibleCard>
    )
  }
}