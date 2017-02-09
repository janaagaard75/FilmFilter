import { Component } from "react"
import { ComponentClass } from "react"
import { RouteComponentProps } from "react-router"

export class RouteComponent<Params, RouteParams, State> extends Component<RouteComponentProps<Params, RouteParams>, State> { }
export type RouteComponentClass<Params, RouteParams> = ComponentClass<RouteComponentProps<Params, RouteParams>>