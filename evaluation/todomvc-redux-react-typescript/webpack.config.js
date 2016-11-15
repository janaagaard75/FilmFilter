const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path")
const webpack = require('webpack')

const outputDir = path.join(__dirname, "dist")

module.exports = {
  devServer: {
    contentBase: outputDir,
    compress: true,
    port: 9000
  },
  devtool: "source-map",
  entry: {
    "client": "./client/index.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "css-loader"
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  output: {
    filename: "[name].[chunkhash:8].js",
    path: outputDir
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "TodoMVC"
      // TODO: Add a template with <div id="app"></div>.
    })
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },
  target: "web"
}