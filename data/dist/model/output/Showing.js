"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShowingFlags_1 = require("./ShowingFlags");
const UrlUtil_1 = require("./UrlUtil");
class Showing {
    constructor(line, lineIndex, movies, theaters) {
        if (line.movieUrl === "NO_MOVIE_URL") {
            this.movieId = -1;
            // TODO: Use the movieTitle property. Add a new movie, or add a movieTitle property to Showing?
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
        this.setFlag(ShowingFlags_1.ShowingFlags.SpecialShowing, line.version.includes("Særvisning"));
        this.setFlag(ShowingFlags_1.ShowingFlags.Dubbed, line.version.includes("dansk tale"));
        this.setFlag(ShowingFlags_1.ShowingFlags.Imax, line.version.includes("IMAX 2D") || line.version.includes("IMAX 3D"));
        this.setFlag(ShowingFlags_1.ShowingFlags.ThreeD, line.version.includes("3D") || line.version.includes("IMAX 3D"));
    }
    setFlag(flag, value) {
        if (value) {
            this.flags |= flag;
        }
        else {
            this.flags &= ~flag;
        }
    }
}
exports.Showing = Showing;
//# sourceMappingURL=Showing.js.map