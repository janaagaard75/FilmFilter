import * as moment from "moment"
import * as React from "react"
import { render } from "react-dom"

import { ConnectedApp } from "./ConnectedApp"

import "./styles/main.scss"

moment.locale("da")

render(
  <ConnectedApp/>,
  document.getElementById("app")
)