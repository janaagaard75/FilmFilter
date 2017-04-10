// tslint:disable object-literal-sort-keys
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack")

const nodeEnv = process.env.NODE_ENV || "development"
const isProduction = nodeEnv === "production"

const outputDir = path.join(__dirname, "dist")

const plugins = [
  new CopyWebpackPlugin([
    {
      from: "src/main/favicon.ico"
    }
  ]),
  new ExtractTextPlugin("bundle.[contenthash:8].css"),
  new HtmlWebpackPlugin({
    minify: {
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      minifyCSS: true,
      removeComments: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    },
    template: "src/main/index.html"
  }),
  new webpack.DefinePlugin({
    "__BUILD_TIMESTAMP__": JSON.stringify(Date.now()),
    "process.env.NODE_ENV": JSON.stringify(nodeEnv)
  })
]

if (isProduction) {
  plugins.push(
    new UglifyJSPlugin({
      sourceMap: true
    })
  )
}
else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = {
  devServer: {
    compress: true,
    contentBase: outputDir,
    historyApiFallback: true,
    host: "0.0.0.0",
    port: 9000
  },
  devtool: "source-map",
  entry: {
    "client": "./src/main/Main.tsx"
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              query: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              query: {
                sourceMap: true,
              }
            }
          ]
        })
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          mimetype: "application/font-woff"
        }
      },
    ]
  },
  output: {
    filename: "[name].[hash:8].js",
    path: outputDir
  },
  performance: {
    hints: isProduction ? "warning" : false
  },
  plugins: plugins,
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules"]
  }
}