"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../src/utils");
var types_1 = require("../src/types");
describe('structures', function () {
    it('generate codes map correctly', function () {
        var expected = types_1.OperatorCode.ArrayCount;
        var result = utils_1.getOperatorCodeFromOperatorName('ArrayCount');
        expect(result).toBe(expected);
    });
});
