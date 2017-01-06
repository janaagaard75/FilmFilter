import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

interface Props {
  header: string
}

@observer
export class Card extends Component<Props, void> {
  public render() {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            {this.props.header}
          </h5>
        </div>
        <div className="card-block">
          {this.props.children}
        </div>
      </div>
    )
  }
}