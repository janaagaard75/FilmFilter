const AureliaWebpackPlugin = require('aurelia-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    host: 'localhost',
    port: 3000
  },
  entry: {
    main: [
      './src/main'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new AureliaWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.ejs",
      metadata:
      {
        baseUrl: "/",
        ENV: "development",
        HMR: false,
        host: "localhost",
        port: 3000,
        title: "Aurelia in TypeScript with Webpack (webpack.config.js)"
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css?$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      // TODO: Consider adding https://github.com/vieron/stylelint-webpack-plugin.
      {
        test: /\.scss?$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // {
      //   test: /\.scss$/,
      //   loaders: [
      //     ExtractTextPlugin.extract({
      //       fallbackLoader: 'style-loader',
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true
      //       }
      //     }),
      //     'to-string-loader',
      //     'css-loader',
      //     'sass-loader'
      //   ]
      // },
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
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2)$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000
      //   }
      // }
      // {
      //   test: /\.(eot|svg|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: 'file-loader'
      // },
      // {
      //   test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: '10000',
      //     mimetype: 'application/font-woff'
      //   }
      // },
      // {
      //   test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: '10000',
      //     mimetype: 'application/font-woff2'
      //   }
      // }
    ]
  }
};