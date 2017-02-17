import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { CollapsibleCard } from "./bootstrap/CollapsibleCard"
import { Theater } from "../model/Theater"
import { TheaterItem } from "./TheaterItem"

interface Props {
  theaters: Array<Theater>
  selectedTheaters: Array<Theater>
}

@observer
export class TheatersSelecter extends Component<Props, void> {
  public render() {
    const header = this.props.selectedTheaters.length === 0
      ? "Vælg biograf"
      : "Biograf: " + this.props.selectedTheaters.map(theater => theater.name).join(", ")

    const favoritedTheaters = this.props.theaters.filter(theater => theater.favorited)
    const notFavoritedTheaters = this.props.theaters.filter(theater => !theater.favorited)
    const bothTypes = favoritedTheaters.length >= 1 && notFavoritedTheaters.length >= 1

    return (
      <CollapsibleCard header={header}>
        <div className="row">
          {favoritedTheaters.map(theater =>
            <TheaterItem
              key={theater.theaterUrl}
              theater={theater}
            />
          )}
        </div>
        {bothTypes ? (
          <hr/>
        ) : (
           ""
        )}
        <div className="row">
          {notFavoritedTheaters.map(theater =>
            <TheaterItem
              key={theater.theaterUrl}
              theater={theater}
            />
          )}
        </div>
      </CollapsibleCard>
    )
  }
}