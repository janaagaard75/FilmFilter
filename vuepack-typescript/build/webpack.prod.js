'use strict'
const exec = require('child_process').execSync
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const base = require('./webpack.base')
const pkg = require('../package')
const _ = require('./utils')

// Remove dist folder in web app mode.
exec('rm -rf dist/')
// Use source-map in web app mode.
base.devtool = 'source-map'

// TODO: Use webpack-merge instead of this base syntax. See https://github.com/AngularClass/angular2-webpack-starter/blob/master/config/webpack.prod.js

// A white list to add dependencies to vendor chunk.
base.entry.vendor = Object.keys(pkg.dependencies)
// Use hash filename to support long-term caching.
base.output.filename = '[name].[chunkhash:8].js'
// Add webpack plugins.
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
  // Extract vendor chunks.
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.[chunkhash:8].js'
  })
)

// Extrac css in standalone .css files.
base.module.rules.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    // TODO: Loaders is repeated in both dev and prod.
    loader: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          autoprefixer: false
        }
      },
      {
        loader:'postcss-loader'
      }
    ]
  })
})

// TODO: Figure out how to write this. The issue is adding this to the correct loader with the new Webpack 2 syntax.
// extract css in single-file components
// base.vue.loaders.css = ExtractTextPlugin.extract({
//   loader: 'css-loader?-autoprefixer',
//   fallbackLoader: 'vue-style-loader'
// })

module.exports = base
