import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

interface Props {
  checked: boolean
  onChange: () => void
}

@observer
export class Checkbox extends Component<Props> {
  public render() {
    return (
      <div className="form-check">
        <label className="form-check-label">
          <input
            type="checkbox"
            checked={this.props.checked}
            className="form-check-input"
            onChange={this.props.onChange}
          />
          {" "}{this.props.children}
        </label>
      </div>
    )
  }
}