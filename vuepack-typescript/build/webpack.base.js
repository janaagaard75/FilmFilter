'use strict'

// Help about Vue2 + TypeScript2: https://herringtondarkholme.github.io/2016/10/03/vue2-ts2/.

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack');

const postcss = [
  require('autoprefixer')({
    browsers: ['last 2 versions', 'ie > 8']
  })
]

module.exports = {
  entry: {
    client: './client/index.ts'
  },
  output: {
    path: path.join(__dirname, '../dist/assets'),
    filename: '[name].js',
    publicPath: './assets'
  },
  resolve: {
    extensions: ['.css', '.js', '.json', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // Instruct vue-loader to load TypeScript.
          loaders: {
            js: 'vue-ts-loader'
          },
          // Make TypeScript generated code cooperate with vue-loader.
          esModule: true
        }
      },
      {
        test: /\.ts$/,
        loader: 'vue-ts-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query:
        {
          limit: 10000,
          name: 'img/[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      }/*,
      {
        test: /\.sass$/,
        loader: 'sass-loader'
      }*/
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss,
        vue: {
          postcss
        },
        // sassLoader: {
        //   includePaths: [path.resolve(__dirname)]
        // },
        context: '/',
        resolve: {} // Required by vue-ts-loader, see https://github.com/TypeStrong/ts-loader/issues/283.
      }
    }),
    new HtmlWebpackPlugin({
      title: 'TeaMeow',
      template: __dirname + '/index.html',
      filename: '../index.html'
    }),
    new ExtractTextPlugin("[name].css")
  ]
}