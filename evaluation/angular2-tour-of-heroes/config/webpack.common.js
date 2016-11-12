const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const helpers = require('./helpers')

const loaders = []

module.exports = {
  entry: {
    'polyfills': './app/polyfills.ts',
    'vendor': './app/vendor.ts',
    'app': './app/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(eot|gif|ico|jpe?g|png|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        query: {
          name: 'assets/[name].[hash].[ext]'
        }
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loaders: [
          // ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap'),
          ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }),
          'to-string-loader',
          'css-loader'
        ]
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        loaders: [
          ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }),
          'to-string-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),

    // Fix "Critical dependency: the request of a dependency is an expression". See https://github.com/AngularClass/angular2-webpack-starter/issues/993.
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    )
  ]
}