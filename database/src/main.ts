import * as fs from 'fs'

import { MovieLine } from './MovieLine'
import { ScraperReader } from './ScraperReader'
import { ShowingLine } from './ShowingLine'
import { TheaterLine } from './TheaterLine'
import { Theater } from './Theater'

const theaterLines = ScraperReader.readData<TheaterLine>('theaters.jsonl')
const theaters: Array<Theater> = theaterLines.map(line => {
  return {
    name: line.name,
    theaterUrl: line.theaterUrl
  }
})

if (!fs.existsSync('output')) {
  fs.mkdirSync('output')
}

const outputData = {
  theaters: theaters
}

fs.writeFileSync(
  'output/data.json',
  JSON.stringify(outputData, undefined, 2),
  {
    encoding: 'utf8'
  }
)

const movies = ScraperReader.readData<MovieLine>('movies.jsonl')
const showings = ScraperReader.readData<ShowingLine>('showings.jsonl')

console.info(`${theaterLines.length} theathers.`)
console.info(`${movies.length} movies.`)
console.info(`${showings.length} showings.`)