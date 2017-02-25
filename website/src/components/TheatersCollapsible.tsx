import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { CollapsibleCard } from "./bootstrap/CollapsibleCard"
import { Theater } from "../model/Theater"
import { TheatersPicker } from "./TheatersPicker"

interface Props {
  theaters: Array<Theater>
  selectedTheaters: Array<Theater>
}

@observer
export class TheatersCollapsible extends Component<Props, void> {
  public render() {
    const header = this.props.selectedTheaters.length === 0
      ? "Vælg biograf"
      : "Biograf: " + this.props.selectedTheaters.map(theater => theater.name).join(", ")

    return (
      <CollapsibleCard header={header}>
        <TheatersPicker theaters={this.props.theaters}/>
      </CollapsibleCard>
    )
  }
}