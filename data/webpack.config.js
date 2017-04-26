const BabiliPlugin = require("babili-webpack-plugin")
const path = require('path');

const nodeEnv = process.env.NODE_ENV || "development"
const isProduction = nodeEnv === "production"

const plugins = []
if (isProduction) {
  plugins.push(
    new BabiliPlugin()
  )
}

module.exports = {
  devtool: "source-map",
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  plugins: plugins,
  resolve: {
    extensions: [
      ".ts", ".js"
    ]
  },
  target: "node"
}