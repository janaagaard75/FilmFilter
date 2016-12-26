const fs = require('fs')

const readJsonLines = (path: string): Array<string> => {
  const content = fs.readFileSync(path, 'utf8')
  const lines = content.split('\n')
  return lines
}

const readScraperOutput = (filename: string): Array<string> => {
  const lines = readJsonLines('../scraper/output/' + filename)
  return lines
}

const movies = readScraperOutput('movies.jsonl')
const showings = readScraperOutput('showings.jsonl')
const theaters = readScraperOutput('theaters.jsonl')

console.info(`${movies.length} movies.`)
console.info(`${showings.length} showings.`)
console.info(`${theaters.length} theathers.`)