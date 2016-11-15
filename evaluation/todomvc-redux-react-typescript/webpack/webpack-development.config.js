module.exports = [
  require("./make-webpack-config")({
    separateStylesheet: true,
    minimize: false,
    devtool: "source-map"
  })
]