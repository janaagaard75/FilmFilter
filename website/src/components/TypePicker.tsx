import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Checkbox } from "./bootstrap/Checkbox"
import { Dimension } from "../model/Dimension"
import { Store } from "../model/Store"

interface Props {
  store: Store
}

@observer
export class TypePicker extends Component<Props, void> {
  public render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-md-3 mb-4">
          <Checkbox
            checked={this.props.store.selectedDimension === Dimension.TwoD}
            onClick={() => { this.props.store.selectedDimension = Dimension.TwoD }}
          >
            2D
          </Checkbox>
          <Checkbox
            checked={this.props.store.selectedDimension === Dimension.ThreeD}
            onClick={() => { this.props.store.selectedDimension = Dimension.ThreeD }}
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