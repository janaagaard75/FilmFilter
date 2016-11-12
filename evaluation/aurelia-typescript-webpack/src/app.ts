import { Aurelia } from 'aurelia-framework'
import { Router, RouterConfiguration } from 'aurelia-router'

// TODO: Consider using inject, see http://tutaurelia.net/2016/07/02/getting-started-with-aurelia-and-typescript-in-visual-studio-2015-update-3/.
export class App {
  router: Router

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia'
    config.options.pushState = true
    config.options.root = '/'
    config.map([
      {
        route: ['', 'welcome'],
        name: 'welcome',
        moduleId: './welcome',
        nav: true,
        title: 'Welcome'
      },
      {
        route: 'users',
        name: 'users',
        moduleId: './users',
        nav: true,
        title: 'Github Users'
      },
      {
        route:
        'child-router',
        name: 'child-router',
        moduleId: './child-router',
        nav: true,
        title: 'Child Router'
      }
    ])

    this.router = router
  }
}