import { Aurelia } from 'aurelia-framework'
import { bootstrap } from 'aurelia-bootstrapper-webpack'
// We want font-awesome to load as soon as possible to show the fa-spinner.
import '../styles/main.scss'

bootstrap(async (aurelia: Aurelia) => {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // If the css animator is enabled, add swap-order="after" to all router-view elements.

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')

  await aurelia.start()
  aurelia.setRoot('app', document.body)

  // If you would like your website to work offline (Service Worker), install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code.
  // const offline = await System.import('offline-plugin/runtime');
  // offline.install();
})