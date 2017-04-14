const BabiliPlugin = require("babili-webpack-plugin");
const path = require('path');

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
  plugins: [
    new BabiliPlugin()
  ],
  resolve: {
    extensions: [
      ".ts", ".js"
    ]
  },
  target: "node"
}