"use strict";
class JsonlParser {
    static parseLines(lines) {
        const parsed = lines
            .split("\n")
            .filter(line => line.length >= 1)
            .map(line => JSON.parse(line));
        return parsed;
    }
}
exports.JsonlParser = JsonlParser;
//# sourceMappingURL=JsonlParser.js.map