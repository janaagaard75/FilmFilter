import { MovieLine } from './MovieLine'
import { ScraperOutputReader } from './ScraperOutputReader'
import { ShowingLine } from './ShowingLine'
import { TheaterLine } from './TheaterLine'

const movies = ScraperOutputReader.readData<MovieLine>('movies.jsonl')
const theaters = ScraperOutputReader.readData<TheaterLine>('theaters.jsonl')
const showings = ScraperOutputReader.readData<ShowingLine>('showings.jsonl')

console.info(`${movies.length} movies.`)
console.info(`${theaters.length} theathers.`)
console.info(`${showings.length} showings.`)