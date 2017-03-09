import { observable } from "mobx"

export class ShowingType {
  @observable public normalShowings = true
  @observable public specialShowings = true
}