import { RouteComponentClass } from "./RouteComponent"

export class TypedRoute<LinkPath extends (...args: Array<any>) => string> {
  constructor(
    public component: RouteComponentClass,
    public routePath: string,
    public getLinkPath: LinkPath
  ) { }
}