"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBreakLine = exports.formatJsTest = void 0;
var utils_1 = require("../../src/utils");
function formatJsTest(source) {
    return removeBreakLine(utils_1.formatJs(source));
}
exports.formatJsTest = formatJsTest;
function removeBreakLine(source) {
    return source.replace(/(?:\r\n|\r|\n)/g, '');
}
exports.removeBreakLine = removeBreakLine;
