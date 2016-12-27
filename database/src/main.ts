import * as fs from 'fs'

import { Movie } from './Movie'
import { MovieLine } from './MovieLine'
import { ScraperReader } from './ScraperReader'
import { Showing } from './Showing'
import { ShowingLine } from './ShowingLine'
import { Theater } from './Theater'
import { TheaterLine } from './TheaterLine'
import { Versions } from './Versions'

const theaterLines = ScraperReader.readData<TheaterLine>('theaters.jsonl')
const theaters: Array<Theater> = theaterLines.map(line => new Theater(line))

const movieLines = ScraperReader.readData<MovieLine>('movies.jsonl')
const movies: Array<Movie> = movieLines.map(line => new Movie(line))

const versions = new Versions()

const showingLines = ScraperReader.readData<ShowingLine>('showings.jsonl')
const showings = showingLines.map(line => new Showing(line, movies, theaters, versions))

const outputData = {
  movies: movies,
  showings: showings,
  theaters: theaters,
  versions: versions
}

if (!fs.existsSync('output')) {
  fs.mkdirSync('output')
}

fs.writeFileSync(
  'output/data.json',
  JSON.stringify(outputData, undefined, 1),
  {
    encoding: 'utf8'
  }
)