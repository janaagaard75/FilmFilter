import * as fs from "fs"
import fetch from "node-fetch"

import { JobInfo } from "./model/JobInfo"
import { JsonlParser } from "./JsonlParser"
import { Movie } from "./model/Movie"
import { MovieLine } from "./model/MovieLine"
import { OutputData } from "./model/OutputData"
import { Showing } from "./model/Showing"
import { ShowingLine } from "./model/ShowingLine"
import { Theater } from "./model/Theater"
import { TheaterLine } from "./model/TheaterLine"
import { TypedJsonl } from "./model/TypedJsonl"

interface UpdateDataOptions {
  apiKey: string,
  host: string,
  jobId: number,
  outputDir: string,
  outputFileName: string
}

export class DataUpdater {
  private static fetchJobInfos(protocolKeyAndHost: string, jobId: number): Promise<Array<JobInfo>> {
    return fetch(`${protocolKeyAndHost}jobq/${jobId}/list`)
      .then(jobsResponse => jobsResponse.text())
      .then(jobList => jobList
          .split("\n")
          .slice(0, 3) // TODO: This will probably not be correct if the jobs are currently running.
          .map(jobInfoString => {
            const jobInfo = JSON.parse(jobInfoString) as JobInfo
            return jobInfo
          })
      )
  }

  public static updateDataFile(options: UpdateDataOptions): Promise<void> {
    const protocolKeyAndHost = `https://${options.apiKey}:@${options.host}/`

    return DataUpdater.fetchJobInfos(protocolKeyAndHost, options.jobId)
      .then(jobInfos => {
        const dataFetchers = jobInfos.map(jobInfo => {
          const itemsUrl = `${protocolKeyAndHost}items/${jobInfo.key}`
          return fetch(itemsUrl)
            .then(itemsResponse => itemsResponse.text())
            .then(itemLines => {
              const typedLines: TypedJsonl = {
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