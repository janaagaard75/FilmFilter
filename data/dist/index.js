"use strict";
const express = require("express");
const node_fetch_1 = require("node-fetch");
const fs = require("fs");
const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
const apiKey = 'a706cc2fdb8e4ce89f00aed30a6fc2a0';
const host = 'storage.scrapinghub.com';
const jobId = 142200;
const outputDir = 'output';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}
node_fetch_1.default(`https://${apiKey}:@${host}/jobq/${jobId}/list`)
    .then(jobsResponse => jobsResponse.text())
    .then(jobList => {
    jobList.split('\n')
        .slice(0, 3) // TODO: This is only correct if the three jobs are all done.
        .forEach(jobInfoString => {
        const jobInfo = JSON.parse(jobInfoString);
        const itemsUrl = `https://${apiKey}:@${host}/items/${jobInfo.key}`;
        node_fetch_1.default(itemsUrl)
            .then(itemsResponse => itemsResponse.text())
            .then(itemLines => {
            fs.writeFileSync(`${outputDir}/${jobInfo.spider}.jsonl`, itemLines);
        });
    });
});
// fetch('https://a706cc2fdb8e4ce89f00aed30a6fc2a0:@storage.scrapinghub.com/items/142200/45')
//   .then(response => response.text())
//   .then(body => {
//     fs.writeFileSync('output.jsonl', body)
//   }) 
