import { observable } from "mobx"

import { ShowingTypeJson } from "./ShowingTypeJson"

export class ShowingType implements ShowingTypeJson {
  @observable public normalShowings = true
  @observable public specialShowings = true
}