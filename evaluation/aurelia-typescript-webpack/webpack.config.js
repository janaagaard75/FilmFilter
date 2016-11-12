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

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: {
    'app': ['./src/main'] // Filled by aurelia-webpack-plugin.
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
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: [
                [
                  'es2015',
                  {
                    loose: true, // This helps simplify javascript transformation.
                    module: false // This helps enable tree shaking for Webpack 2.
                  }
                ],
                'stage-1'
              ],
              plugins: ['transform-decorators-legacy']
            }
          },
          {
            loader: 'awesome-typescript-loader'
          }
        ]
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
          name: debug ? 'assets/[name].[ext]' : 'assets/[name].[hash:8].[ext]'
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
      metadata: {
        baseUrl: baseUrl,
        NODE_ENV: process.env.NODE_ENV,
        HMR: false
      },
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
        removeScriptTypeAttributes: true
      },
      template: 'src/index.ejs'
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
    new webpack.ProvidePlugin({
      regeneratorRuntime: 'regenerator-runtime', // Add support for await/async syntax.
    })
  ].concat(debug ? [
    // No extra plugins for development mode.
  ] : [
    // Extra plugins for production mode.

    // TODO: Not sure this is necessary, since there's only one bundle.
    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      dead_code: true,
      unused: true,
      comments: true,
      compress: {
        screw_ie8: true,
        keep_fnames: true,
        drop_debugger: false,
        dead_code: false,
        unused: false,
        warnings: false
      }
    })
  ]),
  devServer: {
    host: 'localhost',
    port: 3000,
    progress: true,
    outputPath: outDir
  }
}