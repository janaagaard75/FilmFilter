"use strict";
const express = require("express");
const node_fetch_1 = require("node-fetch");
const fs = require("fs");
const Movie_1 = require("./Movie");
const Showing_1 = require("./Showing");
const Theater_1 = require("./Theater");
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
            const typedLines = {
                lines: itemLines.trim().split("\n"),
                type: jobInfo.spider
            };
            return typedLines;
        });
    });
    return Promise.all(fetchDataPromises);
})
    .then(typedLinesArray => {
    const movieLines = typedLinesArray
        .find(tl => tl.type === "movies").lines
        .map(line => JSON.parse(line));
    const showingLines = typedLinesArray
        .find(tl => tl.type === "showings").lines
        .map(line => JSON.parse(line));
    const theaterLines = typedLinesArray
        .find(tl => tl.type === "theaters").lines
        .map(line => JSON.parse(line));
    const movies = movieLines.map(line => new Movie_1.Movie(line));
    const theaters = theaterLines.map(line => new Theater_1.Theater(line));
    const showings = showingLines.map((line, index) => new Showing_1.Showing(line, index, movies, theaters));
    const data = {
        movies: movies,
        showings: showings,
        theaters: theaters
    };
    console.log("Movies: " + data.movies.length);
    console.log("Showings: " + data.showings.length);
    console.log("Theaters: " + data.theaters.length);
    return data;
});
//# sourceMappingURL=main.js.map