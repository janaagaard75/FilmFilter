// Based on https://github.com/aurelia/skeleton-navigation/issues/688.
// More options here and here: https://github.com/aurelia/framework/blob/master/doc/article/drafts/manual-webpack-configuration.md and https://github.com/aurelia/framework/blob/master/doc/article/drafts/manual-webpack-configuration.md.
const AureliaWebpackPlugin = require('aurelia-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageJson = require('./package.json')
const path = require('path')
const ProvidePlugin = require('webpack/lib/ProvidePlugin')
const webpack = require('webpack')

const baseUrl = '/'
const debug = (process.env.NODE_ENV !== 'production')
const outDir = path.resolve('dist')
const rootDir = path.resolve()
const srcDir = path.resolve('src')


const aureliaBootstrap = [
  'aurelia-bootstrapper-webpack',
  'aurelia-polyfills',
  'aurelia-pal-browser'
]

const aureliaModules = Object.keys(packageJson.dependencies).filter(dep => dep.startsWith('aurelia-'))

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: {
    'app': ['./src/main'], // Filled by aurelia-webpack-plugin.
    'aurelia-bootstrap': aureliaBootstrap,
    'aurelia-modules': aureliaModules.filter(pkg => aureliaBootstrap.indexOf(pkg) === -1)
  },
  output: {
    filename: '[name].bundle.js',
    path: outDir
  },
  output: {
    chunkFilename: debug ? '[id].chunk.js' : '[id].[chunkhash:8].chunk.js',
    filename: debug ? '[name].bundle.js' : '[name].[chunkhash:8].bundle.js',
    path: outDir,
    sourceMapFilename: debug ? '[name].bundle.map' : '[name].[chunkhash:8].bundle.map'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-1'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css?$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // TODO: Consider adding https://github.com/vieron/stylelint-webpack-plugin.
      {
        test: /\.(css|scss)?$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: !debug
            }
          },
          {
            loader: 'css-loader',
            query: {
              minimize: !debug
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(eot|jpe?g|gif|png|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new AureliaWebpackPlugin({
      root: rootDir,
      src: srcDir
    }),
    new CopyWebpackPlugin([{
      from: 'src/favicon.ico',
      to: 'favicon.ico'
    }]),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      metadata: {
        baseUrl: baseUrl,
        NODE_ENV: process.env.NODE_ENV,
        HMR: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: debug,
      devtool: 'source-map',
      options: {
        context: __dirname,
        'html-minifier-loader': {
          collapseBooleanAttributes: true,
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: false,
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: [
        'aurelia-bootstrap',
        'aurelia-modules'
      ]
    })
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    progress: true,
    outputPath: outDir
  }
}