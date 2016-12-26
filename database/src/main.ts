import { MovieLine } from './MovieLine'
import { ScraperReader } from './ScraperReader'
import { ShowingLine } from './ShowingLine'
import { TheaterLine } from './TheaterLine'

const movies = ScraperReader.readData<MovieLine>('movies.jsonl')
const theaters = ScraperReader.readData<TheaterLine>('theaters.jsonl')
const showings = ScraperReader.readData<ShowingLine>('showings.jsonl')

console.info(`${movies.length} movies.`)
console.info(`${theaters.length} theathers.`)
console.info(`${showings.length} showings.`)