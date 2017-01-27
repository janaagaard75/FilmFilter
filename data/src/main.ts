// tslint:disable no-console
import * as express from "express"

import { DataUpdater } from "./DataUpdater"

const app = express()

const apiKey = "a706cc2fdb8e4ce89f00aed30a6fc2a0"
const host = "storage.scrapinghub.com"
const jobId = 142200
const port = 5000

app.set("port", (process.env.PORT || port))
app.use(express.static(__dirname + "/public"))

// tslint:disable-next-line no-unused-variable
app.get("/", (request, response) => {
  console.info("Fetching and parting data.")

  DataUpdater.getData(apiKey, host, jobId)
    .then(data => {
      console.info("Done fetching and parsing. Responding.")
      // TODO: Set the correct content type.
      response.send(data)
    })
})

app.listen(app.get("port"), () => {
  console.info(`Node app is running on port ${app.get("port")}.`)
})