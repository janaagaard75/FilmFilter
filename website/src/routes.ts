import { ConnectedApp } from "./ConnectedApp"
import { TypedRoute } from "./model/TypedRoute"

export const homeRoute: TypedRoute<() => string> = new TypedRoute(
  ConnectedApp,
  "/",
  () => "/"
)

export const allRoutes = [
  homeRoute
]