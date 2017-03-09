import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Checkbox } from "./bootstrap/Checkbox"
import { Filters } from "../model/filters/Filters"

interface Props {
  filters: Filters
}

@observer
export class TypePicker extends Component<Props, void> {
  public render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-md-3 mb-4">
          <Checkbox
            checked={this.props.filters.dimensions.twoD}
            onClick={() => { this.props.filters.dimensions.twoD = !this.props.filters.dimensions.twoD }}
          >
            2D
          </Checkbox>
          <Checkbox
            checked={this.props.filters.dimensions.threeD}
            onClick={() => { this.props.filters.dimensions.threeD = !this.props.filters.dimensions.threeD }}
          >
            3D
          </Checkbox>
        </div>
        <div className="col-sm-6 col-md-3 mb-4">
          <Checkbox
            checked={false}
            onClick={() => undefined}
          >
            Almindeligt lærred
          </Checkbox>
          <Checkbox
            checked={false}
            onClick={() => undefined}
          >
            IMAX
          </Checkbox>
        </div>
        <div className="col-sm-6 col-md-3 mb-4">
          <Checkbox
            checked={false}
            onClick={() => undefined}
          >
            Originalt sprog
          </Checkbox>
          <Checkbox
            checked={false}
            onClick={() => undefined}
          >
            Oversat til dansk
          </Checkbox>
        </div>
        <div className="col-sm-6 col-md-3 mb-4">
          <Checkbox
            checked={false}
            onClick={() => undefined}
          >
            Almindelig visning
          </Checkbox>
          <Checkbox
            checked={false}
            onClick={() => undefined}
          >
            Særvisning
          </Checkbox>
        </div>
      </div>
    )
  }
}