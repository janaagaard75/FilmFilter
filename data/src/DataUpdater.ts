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

export class DataUpdater {
  public static getData(apiKey: string, host: string, jobId: number): Promise<OutputData> {
    const protocolKeyAndHost = `https://${apiKey}:@${host}/`

    return DataUpdater.fetchJobInfos(protocolKeyAndHost, jobId)
      .then(jobInfos => DataUpdater.fetchJsonls(protocolKeyAndHost, jobInfos))
      .then(typedJsonls => DataUpdater.parseAndMergeJsonl(typedJsonls))
  }

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

  private static fetchJsonls(protocolKeyAndHost: string, jobInfos: Array<JobInfo>): Promise<Array<TypedJsonl>> {
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
  }

  private static parseAndMergeJsonl(typedJsonls: Array<TypedJsonl>): OutputData {
    const movieLines = JsonlParser.parseLines<MovieLine>(typedJsonls, "movies")
    const showingLines = JsonlParser.parseLines<ShowingLine>(typedJsonls, "showings")
    const theaterLines = JsonlParser.parseLines<TheaterLine>(typedJsonls, "theaters")

    const movies = movieLines.map(line => new Movie(line))
    const theaters = theaterLines.map(line => new Theater(line))
    const showings = showingLines.map((line, index) => new Showing(line, index, movies, theaters))

    const data: OutputData = {
      movies: movies,
      showings: showings,
      theaters: theaters
    }

    return data
  }
}