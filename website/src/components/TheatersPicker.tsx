import * as React from "react"
import { Component } from "react"
import { observer } from "mobx-react"

import { Theater } from "../model/Theater"
import { TheaterPicker } from "./TheaterPicker"

interface Props {
  theaters: Array<Theater>
}

@observer
export class TheatersPicker extends Component<Props, void> {
  public render() {
    const favoritedTheaters = this.props.theaters.filter(theater => theater.favorited)
    const notFavoritedTheaters = this.props.theaters.filter(theater => !theater.favorited)
    const bothTypes = favoritedTheaters.length >= 1 && notFavoritedTheaters.length >= 1

    return (
      <div>
        <div className="row pl-3 pr-3">
          {favoritedTheaters.map(theater =>
            <TheaterPicker
              key={theater.theaterId}
              theater={theater}
            />
          )}
        </div>
        {bothTypes ? (
          <hr/>
        ) : (
            undefined
        )}
        <div className="row pl-3 pr-3">
          {notFavoritedTheaters.map(theater =>
            <TheaterPicker
              key={theater.theaterId}
              theater={theater}
            />
          )}
        </div>
      </div>
    )
  }
}