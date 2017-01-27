import * as express from "express"
import * as fs from "fs"

import { DataUpdater } from "./DataUpdater"

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

// TODO: Make the system update data automatically based on how old data.json is.
app.get("/update", (request, response) => {
  console.info(`Fetching and saving data...`)

  DataUpdater.updateDataFile({
    apiKey: apiKey,
    host: host,
    jobId: jobId,
    outputDir: outputDir,
    outputFileName: outputFileName
  })
    .then(() => {
      console.info(`Data fetched and saved.`)
    })
})

app.listen(app.get("port"), () => {
  console.info(`Node app is running on port ${app.get("port")}.`)
})