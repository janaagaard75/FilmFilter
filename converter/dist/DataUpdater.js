"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const Movie_1 = require("./model/output/Movie");
const Showing_1 = require("./model/output/Showing");
const Theater_1 = require("./model/output/Theater");
class DataUpdater {
    static getData(apiKey, host, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const protocolKeyAndHost = `https://${apiKey}:@${host}/`;
            const jobInfos = yield DataUpdater.fetchJobInfos(protocolKeyAndHost, jobId);
            const typedJsonls = yield DataUpdater.fetchJsonls(protocolKeyAndHost, jobInfos);
            const data = DataUpdater.parseAndMergeJsonl(typedJsonls);
            return data;
        });
    }
    static fetchJobInfos(protocolKeyAndHost, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobsResponse = yield node_fetch_1.default(`${protocolKeyAndHost}jobq/${jobId}/list`);
            const jobList = yield jobsResponse.text();
            const jobInfos = jobList
                .split("\n")
                .slice(0, 3) // TODO: This will probably not be correct if the jobs are currently running.
                .map(jobInfoString => {
                const jobInfo = JSON.parse(jobInfoString);
                return jobInfo;
            });
            return jobInfos;
        });
    }
    static fetchJsonls(protocolKeyAndHost, jobInfos) {
        const dataFetchers = jobInfos.map((jobInfo) => __awaiter(this, void 0, void 0, function* () {
            const itemsUrl = `${protocolKeyAndHost}items/${jobInfo.key}`;
            const itemsResponse = yield node_fetch_1.default(itemsUrl);
            const itemLines = yield itemsResponse.text();
            const typedJsonl = {
                lines: itemLines,
                type: jobInfo.spider
            };
            return typedJsonl;
        }));
        return Promise.all(dataFetchers);
    }
    static parseAndMergeJsonl(typedJsonls) {
        const movieLines = DataUpdater.parseLines(typedJsonls, "movies");
        const showingLines = DataUpdater.parseLines(typedJsonls, "showings");
        const theaterLines = DataUpdater.parseLines(typedJsonls, "theaters");
        const movies = movieLines.map(line => new Movie_1.Movie(line));
        const theaters = theaterLines.map(line => new Theater_1.Theater(line));
        const showings = showingLines.map((line, index) => new Showing_1.Showing(line, index, movies, theaters));
        const data = {
            movies: movies,
            showings: showings,
            theaters: theaters
        };
        return data;
    }
    static parseLines(typedJsonl, type) {
        const matchingTypedJsonl = typedJsonl
            .find(tl => tl.type === type);
        if (matchingTypedJsonl === undefined) {
            throw new Error(`Did not find a typed JSONL with the type ${type}.`);
        }
        const parsed = matchingTypedJsonl
            .lines
            .trim()
            .split("\n")
            .filter(line => line.length >= 1)
            .map(line => JSON.parse(line));
        return parsed;
    }
}
exports.DataUpdater = DataUpdater;
//# sourceMappingURL=DataUpdater.js.map