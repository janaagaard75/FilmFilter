import { observable } from "mobx"

export class FilmType {
  @observable public imax = true
  @observable public standardFilm = true
}