import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Collapse } from "./Collapse"

interface Props {
  expanded: boolean
  header: string
  onToggleExpanded: () => void
}

@observer
export class ToggleableCollapsibleCard extends Component<Props, void> {
  public render() {
    return (
      <div className="card">
        <div className="card-header clickable" onClick={this.props.onToggleExpanded}>
          <h5 className="mb-0">
            {this.props.header}
          </h5>
        </div>
        <Collapse expanded={this.props.expanded}>
          {this.props.children}
        </Collapse>
      </div>
    )
  }
}