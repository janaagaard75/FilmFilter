'use strict'
const exec = require('child_process').execSync
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const baseConfig = require('./webpack.base')
const pkg = require('../package')
const _ = require('./utils')
const webpackMerge = require('webpack-merge')

// TODO: Consider using rimraf instead.
// Remove dist folder in web app mode.
exec('rm -rf dist/')

module.exports = webpackMerge.smart(baseConfig, {
  // Use source-map in web app mode.
  devtool: 'source-map',
  entry: {
    // A white list to add dependencies to vendor chunk.
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    // Use hash filename to support long-term caching.
    filename: '[name].[chunkhash:8].js'
  },
  plugins: [
    new ProgressBarPlugin(),
    new ExtractTextPlugin('styles.[contenthash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // TODO: Uglyfy doesn't support ES6. See https://github.com/mishoo/UglifyJS2/issues/448.
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   },
    //   output: {
    //     comments: false
    //   }
    // }),
    // Extract vendor chunks.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash:8].js'
    })
  ],
  module: {
    rules: [
      {
        // Extrac css in standalone .css files.
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
      },
      {
        test: /\.vue$/,
        options: {
          loaders: ExtractTextPlugin.extract({
            fallbackLoader: 'vue-style-loader',
            loader: [
              {
                loader: 'css-loader',
                options: {
                  'autoprefixer': false
                }
              }
            ]
          })
        }
      }
    ]
  }
})
