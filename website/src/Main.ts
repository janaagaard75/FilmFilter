import * as ReactDOM from "react-dom"
import FilmFilterApp from "FilmFilterApp"
import { ShowingProps } from "Showing"

const showings: Array<ShowingProps> = require("./showings-demo-data.json")

ReactDOM.render(
  <FilmFilterApp showings={showings}/>,
  document.getElementById("filmFilterApp")
)
