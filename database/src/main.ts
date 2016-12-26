import { ScraperOutputReader } from './ScraperOutputReader'

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

const movies = ScraperOutputReader.readData<MovieLine>('movies.jsonl')
const theaters = ScraperOutputReader.readData<TheaterLine>('theaters.jsonl')
const showings = ScraperOutputReader.readData<ShowingLine>('showings.jsonl')

console.info(`${movies.length} movies.`)
console.info(`${theaters.length} theathers.`)
console.info(`${showings.length} showings.`)
