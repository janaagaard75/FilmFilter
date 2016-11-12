'use strict'
const base = require('./webpack.base')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

module.exports = webpackMerge.smart(base, {
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
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
      }
    ]
  }
})
