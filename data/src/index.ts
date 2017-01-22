import * as express from "express"
import fetch from "node-fetch"
import * as fs from "fs"

const app = express()

app.set("port", (process.env.PORT || 5000))
app.use(express.static(__dirname + "/public"))

const apiKey = "a706cc2fdb8e4ce89f00aed30a6fc2a0"
const host = "storage.scrapinghub.com"
const jobId = 142200
const outputDir = "output"

interface JobInfo {
  close_reason: string,
  elapsed: number,
  finished_time: number,
  items: number,
  key: string,
  logs: number,
  pages: number,
  pending_time: number,
  running_time: number,
  spider: string,
  state: string,
  ts: number,
  version: string
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

fetch(`https://${apiKey}:@${host}/jobq/${jobId}/list`)
  .then(jobsResponse => jobsResponse.text())
  .then(jobList => {
    jobList.split("\n")
      .slice(0, 3) // TODO: This is only correct if the three jobs are all done.
      .forEach(jobInfoString => {
        const jobInfo = JSON.parse(jobInfoString) as JobInfo
        const itemsUrl = `https://${apiKey}:@${host}/items/${jobInfo.key}`
        fetch(itemsUrl)
          .then(itemsResponse => itemsResponse.text())
          .then(itemLines => {
            fs.writeFileSync(`${outputDir}/${jobInfo.spider}.jsonl`, itemLines)
          })
      })
  })