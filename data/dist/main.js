"use strict";
const express = require("express");
const node_fetch_1 = require("node-fetch");
const fs = require("fs");
const JsonlParser_1 = require("./JsonlParser");
const app = express();
const apiKey = "a706cc2fdb8e4ce89f00aed30a6fc2a0";
const host = "storage.scrapinghub.com";
const jobId = 142200;
const outputDir = "output";
const port = 5000;
app.set("port", (process.env.PORT || port));
app.use(express.static(__dirname + "/public"));
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}
node_fetch_1.default(`https://${apiKey}:@${host}/jobq/${jobId}/list`)
    .then(jobsResponse => jobsResponse.text())
    .then(jobList => {
    const inputData = {
        movieLines: [],
        showingLines: [],
        theaterLines: []
    };
    jobList.split("\n")
        .slice(0, 3) // TODO: This might not be correct if the jobs are currently running.
        .forEach(jobInfoString => {
        const jobInfo = JSON.parse(jobInfoString);
        const itemsUrl = `https://${apiKey}:@${host}/items/${jobInfo.key}`;
        node_fetch_1.default(itemsUrl)
            .then(itemsResponse => itemsResponse.text())
            .then(itemLines => {
            switch (jobInfo.spider) {
                case "movies":
                    inputData.movieLines = JsonlParser_1.JsonlParser.parseLines(itemLines);
                    break;
                case "showings":
                    inputData.showingLines = JsonlParser_1.JsonlParser.parseLines(itemLines);
                    break;
                case "theaters":
                    inputData.theaterLines = JsonlParser_1.JsonlParser.parseLines(itemLines);
                    break;
            }
        });
    });
    return inputData;
})
    .then(InputData => {
    console.log("Movies: " + InputData.movieLines.length);
});
