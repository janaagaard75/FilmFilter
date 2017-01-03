import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { CollapsibleCard } from "./CollapsibleCard"
import { Theater } from "../model/Theater"
import { TheaterItem } from "./TheaterItem"

interface Props {
  theaters: Array<Theater>
  selectedTheaters: Array<Theater>
  toggleTheaterSelection: (theater: Theater) => void
}

@observer
export class TheatersSelecter extends Component<Props, void> {
  public render() {
    const header = this.props.selectedTheaters.length === 0
      ? "Vælg biograf"
      : "Biograf: " + this.props.selectedTheaters.map(theater => theater.name).join(", ")

    return (
      <CollapsibleCard header={header}>
        <div className="row">
          {this.props.theaters.map(theater =>
            <TheaterItem
              key={theater.theatherUrl}
              theater={theater}
              toggleTheaterSelection={() => this.props.toggleTheaterSelection(theater)}
            />
          )}
        </div>
      </CollapsibleCard>
    )
  }
}