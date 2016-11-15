const jsdom = require('jsdom')
require('babel-polyfill')

// Don't know why it's necessary to define these in a variable.
const extensions = ['.wav', '.css', 'sass', '.scss']
extensions.forEach(ext => {
  require.extensions[ext] = function (module, filename) {
  }
})

// Setup browser environment so that we can test React components.
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.parentWindow
global.navigator = {
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
}

// NodeJS does not have console.debug, but React uses it.
global.console.debug = function () {};