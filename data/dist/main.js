"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// tslint:disable no-console
const express = require("express");
const DataUpdater_1 = require("./DataUpdater");
const app = express();
const apiKey = "a706cc2fdb8e4ce89f00aed30a6fc2a0";
const host = "storage.scrapinghub.com";
const jobId = 142200;
const port = 5000;
app.set("port", (process.env.PORT || port));
app.use(express.static(__dirname + "/public"));
// tslint:disable-next-line no-unused-variable
app.get("/", (request, response) => __awaiter(this, void 0, void 0, function* () {
    console.info("Fetching and parting data.");
    const data = yield DataUpdater_1.DataUpdater.getData(apiKey, host, jobId);
    console.info("Done fetching and parsing. Responding.");
    // TODO: Set the correct content type.
    response.send(data);
}));
app.listen(app.get("port"), () => {
    console.info(`Node app is running on port ${app.get("port")}.`);
});
//# sourceMappingURL=main.js.map