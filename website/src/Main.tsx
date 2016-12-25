import * as React from "react"
import { browserHistory } from "react-router"
import { render } from "react-dom"
import { Route } from "react-router"
import { Router } from "react-router"

import { allRoutes } from "./routes"

import "./main.scss"

render(
  <Router history={browserHistory}>
    {allRoutes.map(route =>
      <Route key={route.routePath} component={route.component} path={route.routePath}/>
    )}
  </Router>,
  document.getElementById("app")
)