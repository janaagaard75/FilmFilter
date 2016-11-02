'use strict'
const path = require('path')

const _ = module.exports = {}
const cssModules = true

_.outputPath = path.join(__dirname, '../dist')

_.outputIndexPath = path.join(__dirname, '../dist/index.html')

_.target = 'web'
