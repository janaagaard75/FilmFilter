import * as express from "express"
import fetch from "node-fetch"
import * as fs from "fs"

import { JobInfo } from "./JobInfo"

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