"use strict";
class UrlUtil {
    static removeStandardPrefix(url) {
        const standardUrlPrefix = "http://www.kino.dk/";
        const slicedUrl = url.slice(standardUrlPrefix.length);
        return slicedUrl;
    }
}
exports.UrlUtil = UrlUtil;
//# sourceMappingURL=UrlUtil.js.map