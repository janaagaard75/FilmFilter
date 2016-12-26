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

interface MovieLine {
  danishTitle: string
  movieUrl: string
  originalTitle: string
  posterUrl: string
}

type VersionFlag = '2D' | '3D' | 'IMAX 2D' | 'IMAX 3D' | 'dansk tale' | 'S\u00e6rvisning'

interface ShowingLine {
  movieUrl: string
  showingUrl: string
  start: string
  theatherUrl: string
  versionFlags: Array<VersionFlag>
}

interface TheaterLine {
  name: string
  theaterUrl: string
}

const movieLines = readScraperOutput('movies.jsonl')
const showingLines = readScraperOutput('showings.jsonl')
const theaterLines = readScraperOutput('theaters.jsonl')

console.info(`${movieLines.length} movies.`)
console.info(`${showingLines.length} showings.`)
console.info(`${theaterLines.length} theathers.`)