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
  lines: string
  type: "movies" | "showings" | "theaters"
}

interface InputData {
  movieLines: Array<MovieLine>,
  showingLines: Array<ShowingLine>,
  theaterLines: Array<TheaterLine>
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
              lines: itemLines,
              type: jobInfo.spider
            }

            return typedLines
          })
      })

    return Promise.all(fetchDataPromises)
  })
  .then(typedLinesArray => {
    const inputData: InputData = {
      movieLines: [],
      showingLines: [],
      theaterLines: []
    }

    typedLinesArray.forEach(typedLines => {
      switch (typedLines.type) {
        case "movies":
          inputData.movieLines = JsonlParser.parseLines<MovieLine>(typedLines.lines)
          break

        case "showings":
          inputData.showingLines = JsonlParser.parseLines<ShowingLine>(typedLines.lines)
          break

        case "theaters":
          inputData.theaterLines = JsonlParser.parseLines<TheaterLine>(typedLines.lines)
          break
      }
    })

    console.log("Movies: " + inputData.movieLines.length)
    console.log("Showings: " + inputData.showingLines.length)
    console.log("Theaters: " + inputData.theaterLines.length)
  })