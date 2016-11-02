'use strict'
const path = require('path')

const _ = module.exports = {}
const cssModules = true

_.cssLoader = 'style-loader!css-loader?-autoprefixer!postcss-loader'

_.outputPath = path.join(__dirname, '../dist')

_.outputIndexPath = path.join(__dirname, '../dist/index.html')

_.target = 'web'
