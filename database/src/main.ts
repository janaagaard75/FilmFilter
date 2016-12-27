import * as fs from 'fs'

import { Movie } from './Movie'
import { MovieLine } from './MovieLine'
import { ScraperReader } from './ScraperReader'
import { ShowingLine } from './ShowingLine'
import { Theater } from './Theater'
import { TheaterLine } from './TheaterLine'

const theaterLines = ScraperReader.readData<TheaterLine>('theaters.jsonl')
const theaters: Array<Theater> = theaterLines.map(line => new Theater(line))

const movieLines = ScraperReader.readData<MovieLine>('movies.jsonl')
const movies: Array<Movie> = movieLines.map(line => new Movie(line))

const showingLines = ScraperReader.readData<ShowingLine>('showings.jsonl')

const outputData = {
  movie: movies,
  theaters: theaters
}

if (!fs.existsSync('output')) {
  fs.mkdirSync('output')
}

fs.writeFileSync(
  'output/data.json',
  JSON.stringify(outputData, undefined, 2),
  {
    encoding: 'utf8'
  }
)