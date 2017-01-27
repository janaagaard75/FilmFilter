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

interface UpdateDataOptions {
  apiKey: string,
  host: string,
  jobId: number,
  outputDir: string,
  outputFileName: string
}

export class DataUpdater {
  public static updateDataFile(options: UpdateDataOptions): Promise<void> {
    const protocolKeyAndHost = `https://${options.apiKey}:@${options.host}`

    return fetch(`${protocolKeyAndHost}/jobq/${options.jobId}/list`)
      .then(jobsResponse => jobsResponse.text())
      .then(jobList => {
        const dataFetchers = jobList
          .split("\n")
          .slice(0, 3) // TODO: This might not be correct if the jobs are currently running.
          .map(jobInfoString => {
            const jobInfo = JSON.parse(jobInfoString) as JobInfo
            const itemsUrl = `${protocolKeyAndHost}/items/${jobInfo.key}`
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

        return Promise.all(dataFetchers)
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
        if (!fs.existsSync(options.outputDir)) {
          fs.mkdirSync(options.outputDir)
        }

        fs.writeFileSync(`${options.outputDir}/${options.outputFileName}`, JSON.stringify(data))
      })
  }
}