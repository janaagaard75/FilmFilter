import { observable } from "mobx"

import { LanguageJson } from "./LanguageJson"

export class Language implements LanguageJson {
  @observable public dubbedToDanish = true
  @observable public originalLanguage = true
}