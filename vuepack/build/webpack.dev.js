'use strict'

const config = require('./webpack.base')
const merge = require('webpack-merge')
const webpack = require('webpack')

config.entry.client = [
  'webpack-hot-middleware/client',
  config.entry.client
]

module.exports = merge(config, {
  output: {
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'source-map'
})