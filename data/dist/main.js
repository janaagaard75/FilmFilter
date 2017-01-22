"use strict";
const express = require("express");
const node_fetch_1 = require("node-fetch");
const fs = require("fs");
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
    const fetchDataPromises = jobList
        .split("\n")
        .slice(0, 3) // TODO: This might not be correct if the jobs are currently running.
        .map(jobInfoString => {
        const jobInfo = JSON.parse(jobInfoString);
        const itemsUrl = `https://${apiKey}:@${host}/items/${jobInfo.key}`;
        return node_fetch_1.default(itemsUrl)
            .then(itemsResponse => itemsResponse.text())
            .then(itemLines => {
            const dataLines = {
                lines: itemLines,
                type: jobInfo.spider
            };
            return dataLines;
            // switch (jobInfo.spider) {
            //   case "movies":
            //     return JsonlParser.parseLines<MovieLine>(itemLines)
            //   case "showings":
            //     return JsonlParser.parseLines<ShowingLine>(itemLines)
            //   case "theaters":
            //     return JsonlParser.parseLines<TheaterLine>(itemLines)
            // }
        });
    });
    return Promise.all(fetchDataPromises);
})
    .then(dataLinesArray => {
    console.log("First data length: " + dataLinesArray[0].lines.length);
    console.log("Second data length: " + dataLinesArray[1].lines.length);
    console.log("Thrid data length: " + dataLinesArray[2].lines.length);
});
