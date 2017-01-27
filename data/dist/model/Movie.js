"use strict";
const UrlUtil_1 = require("./UrlUtil");
class Movie {
    constructor(line) {
        this.movieUrl = UrlUtil_1.UrlUtil.removeStandardPrefix(line.movieUrl);
        this.originalTitle = line.originalTitle;
        this.posterUrl = line.posterUrl;
        if (line.danishTitle !== line.originalTitle) {
            this.danishTitle = line.danishTitle;
        }
    }
}
exports.Movie = Movie;
//# sourceMappingURL=Movie.js.map