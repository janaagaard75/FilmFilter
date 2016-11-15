const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path")
const webpack = require('webpack')

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const outputDir = path.join(__dirname, 'dist')

const plugins = [
  new HtmlWebpackPlugin({
    template: "client/index.ejs"
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  })
]

if (isProduction) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        comparisons: true,
        conditionals: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        unused: true,
        warnings: false,
      },
      output: {
        comments: false
      },
    })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = {
  devServer: {
    contentBase: outputDir,
    compress: true,
    port: 9000
  },
  devtool: "source-map",
  entry: {
    "client": "./client/main.tsx"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  output: {
    filename: "[name].[hash:8].js",
    path: outputDir
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  }
}