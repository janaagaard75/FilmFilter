const path = require("path")
const webpack = require('webpack')

module.exports = {
  devtool: "source-map",
  entry: {
    "client": "client/index.js"
  },
  extenions: ["", "js", "ts", "tsx"],
  loaders: {
    "css": {
      loaders: ["css-loader"]
    },
    "ts|tsx": {
      loaders: ['ts-loader']
    }
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
    sourceMapFilename: "[file].map"
  }
}