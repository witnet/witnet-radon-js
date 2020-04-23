"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var radon_1 = require("../src/radon");
var structures_1 = require("../src/structures");
var types_1 = require("../src/types");
describe('AggregationTallyOperatorReducer', function () {
    it('getMarkup', function () {
        var mirOperator = types_1.AggregationTallyReducer.averageMean;
        var cache = new structures_1.Cache();
        var operator = new radon_1.AggregationTallyOperatorReducer(cache, mirOperator, 1);
        var result = operator.getMarkup();
        var expected = {
            hierarchicalType: 'operator',
            id: 1,
            label: 'averageMean',
            markupType: 'select',
            options: [
                {
                    hierarchicalType: 'operatorOption',
                    label: 'mode',
                    markupType: 'option',
                    outputType: 'filterOutput',
                },
                {
                    hierarchicalType: 'operatorOption',
                    label: 'averageMean',
                    markupType: 'option',
                    outputType: 'filterOutput',
                },
                {
                    hierarchicalType: 'operatorOption',
                    label: 'averageMeanWeighted',
                    markupType: 'option',
                    outputType: 'filterOutput',
                },
                {
                    hierarchicalType: 'operatorOption',
                    label: 'averageMedian',
                    markupType: 'option',
                    outputType: 'filterOutput',
                },
                {
                    hierarchicalType: 'operatorOption',
                    label: 'averageMedianWeighted',
                    markupType: 'option',
                    outputType: 'filterOutput',
                },
            ],
            outputType: 'filterOutput',
            scriptId: 1,
            selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'averageMean',
                markupType: 'option',
                outputType: 'reducerOutput',
            },
        };
        expect(result).toStrictEqual(expected);
    });
    it('getMir', function () {
        var mirOperator = types_1.AggregationTallyReducer.averageMean;
        var cache = new structures_1.Cache();
        var operator = new radon_1.AggregationTallyOperatorReducer(cache, mirOperator, 1);
        var result = operator.getMir();
        expect(result).toStrictEqual(mirOperator);
    });
    it('update', function () {
        var mirOperator = types_1.AggregationTallyReducer.mode;
        var cache = new structures_1.Cache();
        var operator = new radon_1.AggregationTallyOperatorReducer(cache, mirOperator, 1);
        operator.update(types_1.AggregationTallyReducer.averageMean);
        expect(operator.code).toStrictEqual(types_1.AggregationTallyReducer.averageMean);
    });
});
