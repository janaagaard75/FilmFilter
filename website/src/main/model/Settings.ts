import { FiltersJson } from "./filters/FiltersJson"

export interface Settings {
  favoritedTheaterIds: Array<string> | undefined
  filters: FiltersJson | undefined
  selectedTheaterIds: Array<string> | undefined
}