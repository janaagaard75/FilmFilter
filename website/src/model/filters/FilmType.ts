import { observable } from "mobx"

import { FilmTypeJson } from "./FilmTypeJson"

export class FilmType implements FilmTypeJson {
  @observable public imax = true
  @observable public standardFilm = true
}