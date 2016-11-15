const express = require('express')
const http = require('http')
const path = require('path')
const serveStatic = require('serve-static')

const config = require('./config')

module.exports = function (options) {
  console.info("Starting web server.")

  const Renderer = require("../config/SimpleRenderer.js")

  // Load bundle information from stats.
  const stats = options.devServer ? require("../build/stats-dev.json") : require("../build/stats.json")

  const publicPath = stats.publicPath

  const renderer = new Renderer({
    styleUrl: options.separateStylesheet && (publicPath + "todos.css?" + stats.hash),
    scriptUrl: publicPath + [].concat(stats.assetsByChunkName.todos)[0]
  })

  const app = express()

  // Serve the static assets.
  app.use("/_assets", express.static(path.join(__dirname, "..", "build", "public"), {
    maxAge: "200d" // We can cache them as they include hashes.
  }))
  app.use("/", express.static(path.join(__dirname, "..", "public"), {
  }))

  app.get("/*", function (req, res) {
    renderer.render(
      req.path,
      function (err, html) {
        if (err) {
          res.statusCode = 500
          res.contentType = "text; charset=utf8"
          res.end(err.message)
          return
        }
        res.contentType = "text/html; charset=utf8"
        res.end(html)
      }
    )
  })

  //app.use(serveStatic(config.publicPath, {'index': ['index.html']}))

  const server = http.createServer(app)

  server.listen(config.port, function () {
    console.log('listening on http://localhost:' + config.port)
  })
}