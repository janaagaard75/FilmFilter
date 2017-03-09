import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Radio } from "./bootstrap/Checkbox"
import { Dimension } from "../model/Dimension"
import { Store } from "../model/Store"

interface Props {
  store: Store
}

@observer
export class TypePicker extends Component<Props, void> {
  private toggleDimension(dimension: Dimension.TwoD | Dimension.ThreeD) {
    // tslint:disable-next-line:switch-default
    switch (this.props.store.selectedDimension) {
      case Dimension.TwoD:
        // tslint:disable-next-line:switch-default
        switch (dimension) {
          case Dimension.TwoD:
            this.props.store.selectedDimension = Dimension.ThreeD
            break

          case Dimension.ThreeD:
            this.props.store.selectedDimension = Dimension.Both
            break
        }
        break

      case Dimension.ThreeD:
        // tslint:disable-next-line:switch-default
        switch (dimension) {
          case Dimension.TwoD:
            this.props.store.selectedDimension = Dimension.Both
            break

          case Dimension.ThreeD:
            this.props.store.selectedDimension = Dimension.TwoD
            break
        }
        break

      case Dimension.Both:
        // tslint:disable-next-line:switch-default
        switch (dimension) {
          case Dimension.TwoD:
            this.props.store.selectedDimension = Dimension.ThreeD
            break

          case Dimension.ThreeD:
            this.props.store.selectedDimension = Dimension.TwoD
            break
        }
        break
    }
  }

  public render() {
    return (
      <div className="row">
        <div className="col-sm-6 col-md-3 mb-4">
          <Radio
            checked={this.props.store.selectedDimension === Dimension.Both}
            onClick={() => { this.props.store.selectedDimension = Dimension.Both }}
          >
            2D eller 3D
          </Radio>
          <Radio
            checked={this.props.store.selectedDimension === Dimension.TwoD}
            onClick={() => { this.props.store.selectedDimension = Dimension.TwoD }}
          >
            2D
          </Radio>
          <Radio
            checked={this.props.store.selectedDimension === Dimension.ThreeD}
            onClick={() => { this.props.store.selectedDimension = Dimension.ThreeD }}
          >
            3D
          </Radio>
        </div>
        <div className="col-sm-6 col-md-3 mb-4">
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" value="" disabled/>
              {" "}Almindeligt lærred
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" value="" disabled/>
              {" "}IMAX
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" value="" checked disabled/>
              {" "}Ligegyldigt
            </label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 mb-4">
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" value="" disabled/>
              {" "}Originalt sprog
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" value="" disabled/>
              {" "}Dansksproget
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" value="" checked disabled/>
              {" "}Ligegyldigt
            </label>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 mb-4">
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" value="" disabled/>
              {" "}Almindelige visning
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" value="" disabled/>
              {" "}Specialvisning
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" value="" checked disabled/>
              {" "}Ligegyldigt
            </label>
          </div>
        </div>
      </div>
    )
  }
}