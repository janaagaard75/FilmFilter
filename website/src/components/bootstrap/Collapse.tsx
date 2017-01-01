import * as classNames from 'classnames'
import * as React from 'react'
import { Component } from 'react'

interface Props {
  expanded: boolean
}

export class Collapse extends Component<Props, void> {
  constructor(props: void, context?: any) {
    super(props, context)
  }

  public render() {
    const cssClasses = classNames({
      collapse: true,
      in: this.props.expanded
    })

    return (
      <div className={cssClasses}>
        <div className="card-block">
          <div className="row">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

// TODO: Add animation, see https://github.com/reactstrap/reactstrap/blob/master/src/Collapse.js.