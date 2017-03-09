import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

interface Props {
  checked: boolean
  onClick: () => void
}

@observer
export class Checkbox extends Component<Props, void> {
  public render() {
    return (
      <div className="form-check">
        <label className="form-check-label">
          <input
            type="checkbox"
            checked={this.props.checked}
            className="form-check-input"
            onClick={this.props.onClick}
          />
          {" "}{this.props.children}
        </label>
      </div>
    )
  }
}