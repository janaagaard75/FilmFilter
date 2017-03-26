// tslint:disable no-console
import * as express from "express"
import * as cors from "cors"

import { DataUpdater } from "./DataUpdater"

const app = express()

const apiKey = "a706cc2fdb8e4ce89f00aed30a6fc2a0"
const host = "storage.scrapinghub.com"
const jobId = 142200
const port = 5000

app.set("port", (process.env.PORT || port))
// app.use(express.static(__dirname + "/public"))
app.use(cors())

// tslint:disable-next-line no-unused-variable
app.get("/", async (request, response) => {
  console.info("Fetching and parting data.")

  const data = await DataUpdater.getData(apiKey, host, jobId)
  console.info("Done fetching and parsing. Responding.")
  response.json(data)
})

app.listen(app.get("port"), () => {
  console.info(`Node app is running on port ${app.get("port")}. Run start-client or open http://localhost:${app.get("port")}/ to fetch and parse.`)
})