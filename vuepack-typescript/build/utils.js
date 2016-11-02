'use strict'
const path = require('path')

const _ = module.exports = {}
const cssModules = true
const useElectron = false

_.cssLoader = cssModules ?
  'style-loader!css-loader?-autoprefixer&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' :
  'style-loader!css-loader?-autoprefixer!postcss-loader'

_.outputPath = useElectron ?
  path.join(__dirname, '../app/dist') :
  path.join(__dirname, '../dist')

_.outputIndexPath = useElectron ?
  path.join(__dirname, '../app/dist/index.html') :
  path.join(__dirname, '../dist/index.html')

_.target = useElectron ?
  'electron-renderer' :
  'web'
