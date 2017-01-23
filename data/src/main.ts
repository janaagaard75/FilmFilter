import * as express from "express"
import fetch from "node-fetch"
import * as fs from "fs"

import { JobInfo } from "./JobInfo"
import { JsonlParser } from "./JsonlParser"
import { Movie } from './Movie'
import { MovieLine } from "./MovieLine"
import { Showing } from './Showing'
import { ShowingLine } from "./ShowingLine"
import { Theater } from './Theater'
import { TheaterLine } from "./TheaterLine"

const app = express()

const apiKey = "a706cc2fdb8e4ce89f00aed30a6fc2a0"
const host = "storage.scrapinghub.com"
const jobId = 142200
const outputDir = "output"
const port = 5000

app.set("port", (process.env.PORT || port))
app.use(express.static(__dirname + "/public"))

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

interface TypedLines {
  lines: Array<string>
  type: "movies" | "showings" | "theaters"
}

interface OutputData {
  movies: Array<Movie>
  showings: Array<Showing>
  theaters: Array<Theater>
}

fetch(`https://${apiKey}:@${host}/jobq/${jobId}/list`)
  .then(jobsResponse => jobsResponse.text())
  .then(jobList => {
    const fetchDataPromises = jobList
      .split("\n")
      .slice(0, 3) // TODO: This might not be correct if the jobs are currently running.
      .map(jobInfoString => {
        const jobInfo = JSON.parse(jobInfoString) as JobInfo
        const itemsUrl = `https://${apiKey}:@${host}/items/${jobInfo.key}`
        return fetch(itemsUrl)
          .then(itemsResponse => itemsResponse.text())
          .then(itemLines => {
            const typedLines: TypedLines = {
              lines: itemLines.trim().split("\n"),
              type: jobInfo.spider
            }

            return typedLines
          })
      })

    return Promise.all(fetchDataPromises)
  })
  .then(typedLinesArray => {
    const movieLines = typedLinesArray
      .find(tl => tl.type === "movies").lines
      .map(line => JSON.parse(line) as MovieLine)

    const showingLines = typedLinesArray
      .find(tl => tl.type === "showings").lines
      .map(line => JSON.parse(line) as ShowingLine)

    const theaterLines = typedLinesArray
      .find(tl => tl.type === "theaters").lines
      .map(line => JSON.parse(line) as TheaterLine)

    const movies: Array<Movie> = movieLines.map(line => new Movie(line))
    const theaters: Array<Theater> = theaterLines.map(line => new Theater(line))

    const showings = showingLines.map((line, index) => new Showing(line, index, movies, theaters))

    const data: OutputData = {
      movies: movies,
      showings: showings,
      theaters: theaters
    }

    console.log("Movies: " + data.movies.length)
    console.log("Showings: " + data.showings.length)
    console.log("Theaters: " + data.theaters.length)

    return data
  })