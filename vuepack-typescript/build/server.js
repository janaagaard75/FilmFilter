'use strict'

const app = express()
const config = require('./webpack.dev')
const compiler = webpack(config)
const express = require('express')
const path = require('path')
const webpack = require('webpack')

const devMiddleWare = require('webpack-dev-middleware')(compiler,
  {
    publicPath: config.output.publicPath,
    stats:
    {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }
  })

app.use(devMiddleWare)
app.use(require('webpack-hot-middleware')(compiler))

app.get('*', (req, res) => {
  const fs = devMiddleWare.fileSystem

  devMiddleWare.waitUntilValid(() => {
    res.end(fs.readFileSync(path.join(config.output.path, '../index.html')))
  })
})

app.listen(8080, () => {
  console.log('Site available on http://localhost:8080/')
})