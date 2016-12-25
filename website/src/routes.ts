import { ConnectedApp } from "./ConnectedApp"
import { TypedRoute } from "./model/TypedRoute"

export const HomeRoute: TypedRoute<() => string> = new TypedRoute(
  ConnectedApp,
  "/",
  () => "/"
)

export const allRoutes = [
  HomeRoute
]