import * as React from 'react'
import { Component } from 'react'

import { Theater } from '../model/Theater'

interface Props {
  theaters: Array<Theater>
}

export class TheaterForm extends Component<Props, void> {
  public render() {
    return (
      <div>
        {this.props.theaters.map(theater =>
          <div className="form-check" key={theater.theatherUrl}>
            <label className="form-check-label">
              <input type="checkbox" className="form-check-input" value=""/>
              {' ' + theater.name}
            </label>
          </div>
        )}
      </div>
    )
  }
}