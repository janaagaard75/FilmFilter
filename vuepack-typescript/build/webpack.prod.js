'use strict'
const exec = require('child_process').execSync
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const base = require('./webpack.base')
const pkg = require('../package')
const _ = require('./utils')
const useElectron = false

if (useElectron) {
  // remove dist folder in electron mode
  exec('rm -rf app/assets/')
} else {
  // remove dist folder in web app mode
  exec('rm -rf dist/')
  // use source-map in web app mode
  base.devtool = 'source-map'
}

// TODO: Use webpack-merge instead of this base syntax. See https://github.com/AngularClass/angular2-webpack-starter/blob/master/config/webpack.prod.js

// a white list to add dependencies to vendor chunk
base.entry.vendor = Object.keys(pkg.dependencies)
// use hash filename to support long-term caching
base.output.filename = '[name].[chunkhash:8].js'
// add webpack plugins
base.plugins.push(
  new ProgressBarPlugin(),
  new ExtractTextPlugin('styles.[contenthash:8].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }),
  // extract vendor chunks
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.[chunkhash:8].js'
  })
)

// extrac css in standalone .css files
base.module.rules.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    loader: _.cssLoader,
    fallbackLoader: 'style-loader'
  })
})

// extract css in single-file components
// TODO: Figure out how to write this.
// base.vue.loaders.css = ExtractTextPlugin.extract({
//   loader: 'css-loader?-autoprefixer',
//   fallbackLoader: 'vue-style-loader'
// })

module.exports = base
