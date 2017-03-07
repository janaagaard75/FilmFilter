import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

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
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                onClick={() => { this.props.store.selectedDimension = Dimension.TwoD }}
                checked={this.props.store.selectedDimension === Dimension.TwoD}
              />
              {" "}2D
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                onClick={() => { this.props.store.selectedDimension = Dimension.ThreeD }}
                checked={this.props.store.selectedDimension === Dimension.ThreeD}
              />
              {" "}3D
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                onClick={() => { this.props.store.selectedDimension = Dimension.Both }}
                checked={this.props.store.selectedDimension === Dimension.Both}
              />
              {" "}Ligegyldigt
            </label>
          </div>
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