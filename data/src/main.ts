import * as express from "express"
import fetch from "node-fetch"
import * as fs from "fs"

import { JobInfo } from "./JobInfo"
import { JsonlParser } from './JsonlParser';
import { MovieLine } from "./MovieLine"
import { ShowingLine } from "./ShowingLine"
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

interface InputData {
  movieLines: Array<MovieLine>,
  showingLines: Array<ShowingLine>,
  theaterLines: Array<TheaterLine>
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
            switch (jobInfo.spider) {
              case "movies":
                return JsonlParser.parseLines<MovieLine>(itemLines)

              case "showings":
                return JsonlParser.parseLines<ShowingLine>(itemLines)

              case "theaters":
                return JsonlParser.parseLines<TheaterLine>(itemLines)
            }
          })
      })

      return Promise.all(fetchDataPromises)
  })
  .then(inputData => {
    console.log("First array length: " + inputData[0].length)
    console.log("Second array length: " + inputData[1].length)
    console.log("Thrid array length: " + inputData[2].length)
  })