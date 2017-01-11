import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { CollapsibleCard } from "./bootstrap/CollapsibleCard"
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

@observer
export class TheatersSelecter extends Component<Props, State> {
  constructor(props: Props, context?: any) {
    super(props, context)

    this.state = {
      expanded: false
    }
  }

  private handleToggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  public render() {
    const header = this.props.selectedTheaters.length === 0
      ? "Vælg biograf"
      : "Biograf: " + this.props.selectedTheaters.map(theater => theater.name).join(", ")

    return (
    <CollapsibleCard header={header} expanded={this.state.expanded} onToggleExpanded={() => this.handleToggleExpanded()}>
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