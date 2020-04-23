"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var radon_1 = require("../src/radon");
var structures_1 = require("../src/structures");
describe('AggregationTallyFilterArgument', function () {
    it('getMarkup', function () {
        var mirArgument = 3;
        var cache = new structures_1.Cache();
        var operator = new radon_1.AggregationTallyFilterArgument(cache, mirArgument);
        var result = operator.getMarkup();
        var expected = {
            hierarchicalType: 'argument',
            id: 1,
            label: 'by',
            markupType: 'input',
            value: 3,
        };
        expect(result).toStrictEqual(expected);
    });
    it('getMir', function () {
        var mirArgument = 3;
        var cache = new structures_1.Cache();
        var operator = new radon_1.AggregationTallyFilterArgument(cache, mirArgument);
        var result = operator.getMir();
        expect(result).toStrictEqual(mirArgument);
    });
    it('update', function () {
        var mirArgument = 3;
        var cache = new structures_1.Cache();
        var operator = new radon_1.AggregationTallyFilterArgument(cache, mirArgument);
        operator.update(7);
        expect(operator.value).toStrictEqual(7);
    });
});
