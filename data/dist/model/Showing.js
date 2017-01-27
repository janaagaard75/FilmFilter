"use strict";
const UrlUtil_1 = require("./UrlUtil");
class Showing {
    constructor(line, lineIndex, movies, theaters) {
        this.dubbed = (line.version.find(flag => flag === "dansk tale") !== undefined);
        this.imax = (line.version.find(flag => flag === "IMAX 2D" || flag === "IMAX 3D") !== undefined);
        if (line.movieUrl === "NO_MOVIE_URL") {
            this.movieId = -1;
        }
        else {
            const movieUrl = UrlUtil_1.UrlUtil.removeStandardPrefix(line.movieUrl);
            const movie = movies.find(m => m.movieUrl === movieUrl);
            if (movie === undefined) {
                this.movieId = -1;
            }
            else {
                this.movieId = movies.indexOf(movie);
            }
        }
        this.seatingInfo = line.seatingInfo;
        this.showingUrl = UrlUtil_1.UrlUtil.removeStandardPrefix(line.showingUrl);
        this.specialShowing = (line.version.find(flag => flag === "Særvisning") !== undefined);
        this.start = line.start;
        const theaterUrl = UrlUtil_1.UrlUtil.removeStandardPrefix(line.theaterUrl);
        const theater = theaters.find(t => t.theatherUrl === theaterUrl);
        if (theater === undefined) {
            console.error(`Theater with url '${theaterUrl}' was not found, line number ${lineIndex + 1}.`);
            this.theaterId = -1;
        }
        else {
            this.theaterId = theaters.indexOf(theater);
        }
        this.threeD = (line.version.find(flag => flag === "3D" || flag === "IMAX 3D") !== undefined);
    }
}
exports.Showing = Showing;
// TODO: Consider the includes polyfill: http://stackoverflow.com/questions/37640785/how-do-you-add-polyfills-to-globals-in-typescript-modules 
//# sourceMappingURL=Showing.js.map