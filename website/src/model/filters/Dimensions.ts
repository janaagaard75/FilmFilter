import { observable } from "mobx"

import { DimensionsJson } from "./DimensionsJson"

export class Dimensions implements DimensionsJson {
  @observable public threeD = true
  @observable public twoD = true
}