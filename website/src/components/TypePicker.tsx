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
            checked={this.props.filters.filmType.standardFilm}
            onClick={() => this.props.filters.filmType.standardFilm = !this.props.filters.filmType.standardFilm}
          >
            Almindeligt lærred
          </Checkbox>
          <Checkbox
            checked={this.props.filters.filmType.imax}
            onClick={() => this.props.filters.filmType.imax = !this.props.filters.filmType.imax}
          >
            IMAX
          </Checkbox>
        </div>
        <div className="col-sm-6 col-md-3 mb-4">
          <Checkbox
            checked={this.props.filters.language.originalLanguage}
            onClick={() => this.props.filters.language.originalLanguage = !this.props.filters.language.originalLanguage}
          >
            Originalt sprog
          </Checkbox>
          <Checkbox
            checked={this.props.filters.language.dubbedToDanish}
            onClick={() => this.props.filters.language.dubbedToDanish = !this.props.filters.language.dubbedToDanish}
          >
            Oversat til dansk
          </Checkbox>
        </div>
        <div className="col-sm-6 col-md-3 mb-4">
          <Checkbox
            checked={this.props.filters.showingType.normalShowings}
            onClick={() => this.props.filters.showingType.normalShowings = !this.props.filters.showingType.normalShowings}
          >
            Almindelig visning
          </Checkbox>
          <Checkbox
            checked={this.props.filters.showingType.specialShowings}
            onClick={() => this.props.filters.showingType.specialShowings = !this.props.filters.showingType.specialShowings}
          >
            Særvisning
          </Checkbox>
        </div>
      </div>
    )
  }
}