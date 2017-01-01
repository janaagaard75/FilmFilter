import * as React from "react"
import { Component } from "react"

import { Collapse } from "./bootstrap/Collapse"
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

  private toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  public render() {
    return (
      <div className="card">
        <div className="card-header clickable" onClick={() => this.toggleExpanded()}>
          <h5 className="mb-0">
            {this.props.selectedTheaters.length === 0
              ? "Vælg biograf"
              : "Biograf: " + this.props.selectedTheaters.map(theater => theater.name).join(", ")}
          </h5>
        </div>
        <Collapse expanded={this.state.expanded}>
          <div className="row">
            {this.props.theaters.map(theater =>
              <TheaterItem
                key={theater.theatherUrl}
                theater={theater}
                toggleTheaterSelection={() => this.props.toggleTheaterSelection(theater)}
              />
            )}
          </div>
        </Collapse>
      </div>
    )
  }
}