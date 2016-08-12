//var path = require("path")

module.exports = {
  entry: "./src/Main.tsx",
  output: {
    //path: path.resolve(__dirname, ""),
    filename: "./js/bundle.js",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"]
  },

  module: {
    loaders: [
      // TODO: Might want to remove the json-loader - it's not used any longer.
      { test: /\.json$/, loader: "json-loader" },
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      // TODO: Try naming the loader simply "ts".
      { test: /\.tsx?$/, loader: "ts-loader" }
    ],

    preLoaders: [
      // TODO: Try adding TSLint in here. See https://github.com/keokilee/react-typescript-boilerplate/blob/master/config/webpack.dev.js.
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  }
}
