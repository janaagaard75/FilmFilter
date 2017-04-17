// tslint:disable no-console
import * as cors from "cors"
import * as express from "express"
import * as LZString from "lz-string"

import { DataUpdater } from "./DataUpdater"

const app = express()

const apiKey = "a706cc2fdb8e4ce89f00aed30a6fc2a0"
const host = "storage.scrapinghub.com"
const jobId = 142200
const port = 5000

app.set("port", (process.env.PORT || port))
app.use(cors())

app.get("/", async (_request, response) => {
  console.info("Fetching and parting data.")
  const data = await DataUpdater.getData(apiKey, host, jobId)
  console.info("Done fetching and parsing. Responding.")
  response.json(data)
})

app.get("/compressed", async (_request, response) => {
  console.info("Fetching, parsing and compressing data.")
  const data = await DataUpdater.getData(apiKey, host, jobId)
  const compressedData = LZString.compressToBase64(JSON.stringify(data))
  console.info("Done fetching, parsing and compressing. Responding.")
  response.setHeader("Content-Transfer-Encoding", "base64")
  response.contentType("text/plain")
  response.send(compressedData)
})

app.get("/v2", async(_requese, response) => {
  console.info("Fetch and parsing data v2.")
  const data = await DataUpdater.getDataV2(apiKey, host, jobId)
  console.info("Done fetching and parsing. Responding.")
  response.json(data)
})

app.get("/v2/compressed", async (_request, response) => {
  console.info("Fetching, parsing and compressing data.")
  const data = await DataUpdater.getDataV2(apiKey, host, jobId)
  const compressedData = LZString.compressToBase64(JSON.stringify(data))
  console.info("Done fetching, parsing and compressing. Responding.")
  response.setHeader("Content-Transfer-Encoding", "base64")
  response.contentType("text/plain")
  response.send(compressedData)
})

app.listen(app.get("port"), () => {
  console.info(`Node app is running on port ${app.get("port")}. Run start-client or open http://localhost:${app.get("port")}/ to fetch and parse.`)
})