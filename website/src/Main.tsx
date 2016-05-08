// TODO: Try using react-global instead. See https://github.com/palantir/tslint/issues/589.
/* tslint:disable:no-unused-variable */
import * as React from "react";
/* tslint:enable:no-unused-variable */
import * as ReactDOM from "react-dom"
import FilmFilterApp from "./FilmFilterApp"
import { IShowing } from "./Showing"

const showings: Array<IShowing> = require("./showings-demo-data.json")

ReactDOM.render(
  <FilmFilterApp showings={showings}/>,
  document.getElementById("filmFilterApp")
)
