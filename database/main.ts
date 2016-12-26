const fs = require('fs')

const outputFolder = '../scraper/output/'

const movies = fs.readFileSync(outputFolder + 'movies.jsonl', 'utf8').split('\n')
const showings = fs.readFileSync(outputFolder + 'showings.jsonl', 'utf8').split('\n')
const theaters = fs.readFileSync(outputFolder + 'theaters.jsonl', 'utf8').split('\n')

console.info(`${movies.length} movies.`)
console.info(`${showings.length} showings.`)
console.info(`${theaters.length} theathers.`)