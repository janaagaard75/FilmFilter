"use strict";
const UrlUtil_1 = require("./UrlUtil");
class Theater {
    constructor(line) {
        this.name = line.name;
        this.theatherUrl = UrlUtil_1.UrlUtil.removeStandardPrefix(line.theaterUrl);
    }
}
exports.Theater = Theater;
//# sourceMappingURL=Theater.js.map