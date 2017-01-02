import * as React from "react"
import { Component } from "react"

import { CollapsibleCard } from "./CollapsibleCard"
import { Theater } from "../model/Theater"
import { TheaterItem } from "./TheaterItem"

interface Props {
  theaters: Array<Theater>
  selectedTheaters: Array<Theater>
  toggleTheaterSelection: (theater: Theater) => void
}

interface State {
  expanded: boolean
}

export class TheatersSelecter extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      expanded: false
    }
  }

  public render() {
    const header = this.props.selectedTheaters.length === 0
      ? "Vælg biograf"
      : "Biograf: " + this.props.selectedTheaters.map(theater => theater.name).join(", ")

    return (
      <CollapsibleCard header={header}>
        {this.props.theaters.map(theater =>
          <TheaterItem
            key={theater.theatherUrl}
            theater={theater}
            toggleTheaterSelection={() => this.props.toggleTheaterSelection(theater)}
          />
        )}
      </CollapsibleCard>
    )
  }
}