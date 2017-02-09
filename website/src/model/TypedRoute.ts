import { RouteComponentClass } from "./RouteComponent"

export class TypedRoute<LinkPath extends (...args: Array<any>) => string> {
  constructor(
    public component: RouteComponentClass<void, void>,
    public routePath: string,
    public getLinkPath: LinkPath
  ) { }
}