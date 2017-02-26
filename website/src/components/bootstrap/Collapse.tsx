import * as classNames from "classnames"
import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

interface Props {
  expanded: boolean
}

@observer
export class Collapse extends Component<Props, void> {
  public render() {
    const cssClasses = classNames(
      "collapse",
      {
        // tslint:disable-next-line:object-literal-key-quotes
        "show": this.props.expanded
      }
    )

    return (
      <div className={cssClasses}>
        <div className="card-block">
          {this.props.children}
        </div>
      </div>
    )
  }
}

// TODO: Add animation, see https://github.com/reactstrap/reactstrap/blob/master/src/Collapse.js.