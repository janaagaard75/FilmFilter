'use strict'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    client: './client/index.js'
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.css', '.json'],
    alias: {
      root: path.join(__dirname, '../client'),
      components: path.join(__dirname, '../client/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {},
          postcss: [
            require('autoprefixer')({
              // Vue does not support IE 8 and below.
              browsers: ['last 2 versions', 'ie > 8']
            }),
            require('postcss-nested')
          ]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          babelrc: false,
          presets: [
            [
              'es2015',
              {
                modules: false
              }
            ],
            'stage-1'
          ],
          plugins: [
            'transform-vue-jsx'
          ]
        }
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vuepack-typescript',
      template: __dirname + '/index.html',
      filename: path.join(__dirname, '../dist/index.html')
    })
  ],
  target: 'web'
}
