import * as express from "express"
import * as fs from "fs"
import fetch from "node-fetch"

import { JobInfo } from "./JobInfo"
import { JsonlParser } from "./JsonlParser"
import { Movie } from "./Movie"
import { MovieLine } from "./MovieLine"
import { OutputData } from "./OutputData"
import { Showing } from "./Showing"
import { ShowingLine } from "./ShowingLine"
import { Theater } from "./Theater"
import { TheaterLine } from "./TheaterLine"
import { TypedLines } from "./TypedLines"

const app = express()

const apiKey = "a706cc2fdb8e4ce89f00aed30a6fc2a0"
const host = "storage.scrapinghub.com"
const jobId = 142200
const outputDir = "output"
const outputFileName = "data.json"
const port = 5000

app.set("port", (process.env.PORT || port))
app.use(express.static(__dirname + "/public"))

app.get("/", (request, response) => {
  const data = JSON.parse(fs.readFileSync(`${outputDir}/${outputFileName}`, "utf8"))
  // TODO: Set the correct content type.
  response.send(data)
})

// TODO: Make the system updateData automatically based on how old data.json is.
app.get("/update", (request, response) => {
  updateData()
  console.log(`Data fetched and saved.`)
})

app.listen(app.get("port"), () => {
  console.log(`Node app is running on port ${app.get("port")}.`)
})

// TODO: Write this code much prettier. Split it up into classes and functions. Put it in separate files.
const updateData = () => {
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
      const movieLines = JsonlParser.parseLines<MovieLine>(typedLinesArray, "movies")
      const showingLines = JsonlParser.parseLines<ShowingLine>(typedLinesArray, "showings")
      const theaterLines = JsonlParser.parseLines<TheaterLine>(typedLinesArray, "theaters")

      const movies = movieLines.map(line => new Movie(line))
      const theaters = theaterLines.map(line => new Theater(line))
      const showings = showingLines.map((line, index) => new Showing(line, index, movies, theaters))

      const data: OutputData = {
        movies: movies,
        showings: showings,
        theaters: theaters
      }

      return data
    })
    .then(data => {
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir)
      }

      fs.writeFileSync(`${outputDir}/${outputFileName}`, JSON.stringify(data))
    })
}