import { Filters } from "./filters/Filters"

export interface Settings {
  favoritedTheaterIds: Array<string> | undefined
  filters: Filters | undefined
  selectedTheaterIds: Array<string> | undefined
}