"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Movie_1 = require("./Movie");
const ShowingFlags_1 = require("./ShowingFlags");
const UrlUtil_1 = require("./UrlUtil");
class Showing {
    constructor(line, lineIndex, movies, theaters) {
        if (line.movieUrl === "NO_MOVIE_URL") {
            const newMovie = new Movie_1.Movie({
                danishTitle: "",
                movieUrl: "",
                originalTitle: line.movieTitle,
                posterUrl: "http://cdn01.kino.dk/sites/default/files/imagecache/k_poster_small/imagefield_default_images/movie-default-poster.jpg"
            });
            movies.push(newMovie);
            this.movieId = movies.length - 1;
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