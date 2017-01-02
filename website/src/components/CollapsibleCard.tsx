import * as React from "react"
import { Component } from "react"

import { Collapse } from "./bootstrap/Collapse"

interface Props {
  header: string
}

interface State {
  expanded: boolean
}

export class CollapsibleCard extends Component<Props, State> {
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
            {this.props.header}
          </h5>
        </div>
        <Collapse expanded={this.state.expanded}>
          <div className="row">
            {this.props.children}
          </div>
        </Collapse>
      </div>
    )
  }
}