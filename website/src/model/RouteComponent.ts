import { Component } from "react"
import { ComponentClass } from "react"
import { RouterContext } from "react-router"

interface RouteComponentProps extends RouterContext.RouterContextProps { }

export class RouteComponent<State> extends Component<RouteComponentProps, State> { }
export type RouteComponentClass = ComponentClass<RouteComponentProps>