import fetch from "node-fetch"

import { JobInfo } from "./model/JobInfo"
import { JsonlType } from "./model/JsonlType"
import { Movie } from "./model/Movie"
import { MovieLine } from "./model/MovieLine"
import { OutputData } from "./model/OutputData"
import { Showing } from "./model/Showing"
import { ShowingLine } from "./model/ShowingLine"
import { Theater } from "./model/Theater"
import { TheaterLine } from "./model/TheaterLine"
import { TypedJsonl } from "./model/TypedJsonl"

export class DataUpdater {
  public static async getData(apiKey: string, host: string, jobId: number): Promise<OutputData> {
    const protocolKeyAndHost = `https://${apiKey}:@${host}/`
    const jobInfos = await DataUpdater.fetchJobInfos(protocolKeyAndHost, jobId)
    const typedJsonls = await DataUpdater.fetchJsonls(protocolKeyAndHost, jobInfos)
    const data = DataUpdater.parseAndMergeJsonl(typedJsonls)
    return data
  }

  private static async fetchJobInfos(protocolKeyAndHost: string, jobId: number): Promise<Array<JobInfo>> {
    const jobsResponse = await fetch(`${protocolKeyAndHost}jobq/${jobId}/list`)
    const jobList = await jobsResponse.text()
    const jobInfos = jobList
      .split("\n")
      .slice(0, 3) // TODO: This will probably not be correct if the jobs are currently running.
      .map(jobInfoString => {
        const jobInfo = JSON.parse(jobInfoString) as JobInfo
        return jobInfo
      })

    return jobInfos
  }

  private static fetchJsonls(protocolKeyAndHost: string, jobInfos: Array<JobInfo>): Promise<Array<TypedJsonl>> {
    const dataFetchers = jobInfos.map(async jobInfo => {
      const itemsUrl = `${protocolKeyAndHost}items/${jobInfo.key}`
      const itemsResponse = await fetch(itemsUrl)
      const itemLines = await itemsResponse.text()
      const typedJsonl: TypedJsonl = {
        lines: itemLines,
        type: jobInfo.spider
      }

      return typedJsonl
    })

    return Promise.all(dataFetchers)
  }

  private static parseAndMergeJsonl(typedJsonls: Array<TypedJsonl>): OutputData {
    const movieLines = DataUpdater.parseLines<MovieLine>(typedJsonls, "movies")
    const showingLines = DataUpdater.parseLines<ShowingLine>(typedJsonls, "showings")
    const theaterLines = DataUpdater.parseLines<TheaterLine>(typedJsonls, "theaters")

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

  private static parseLines<TLine>(typedJsonl: Array<TypedJsonl>, type: JsonlType): Array<TLine> {
    const matchingTypedJsonl = typedJsonl
      .find(tl => tl.type === type)

    if (matchingTypedJsonl === undefined) {
      throw new Error(`Did not find a typed JSONL with the type ${type}.`)
    }

    const parsed = matchingTypedJsonl
      .lines
      .trim()
      .split("\n")
      .filter(line => line.length >= 1)
      .map(line => JSON.parse(line) as TLine)

    return parsed
  }
}