"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var radon_1 = require("../src/radon");
var structures_1 = require("../src/structures");
var types_1 = require("../src/types");
describe('AggregationTallyOperatorFilter', function () {
    describe('getMarkup', function () {
        it('without argument', function () {
            var mirOperator = types_1.AggregationTallyFilter.mode;
            var cache = new structures_1.Cache();
            var operator = new radon_1.AggregationTallyOperatorFilter(cache, mirOperator, 0);
            var result = operator.getMarkup();
            var expected = {
                hierarchicalType: 'operator',
                id: 1,
                label: 'mode',
                markupType: 'select',
                options: [
                    {
                        hierarchicalType: 'operatorOption',
                        label: 'deviationAbsolute',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        hierarchicalType: 'operatorOption',
                        label: 'deviationRelative',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        hierarchicalType: 'operatorOption',
                        label: 'deviationStandard',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        hierarchicalType: 'operatorOption',
                        label: 'mode',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                ],
                outputType: 'filterOutput',
                scriptId: 0,
                selected: {
                    arguments: [],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'mode',
                    markupType: 'option',
                    outputType: 'filterOutput',
                },
            };
            expect(result).toStrictEqual(expected);
        });
        it('with argument', function () {
            var mirOperator = [
                types_1.AggregationTallyFilter.deviationAbsolute,
                3,
            ];
            var cache = new structures_1.Cache();
            var operator = new radon_1.AggregationTallyOperatorFilter(cache, mirOperator, 0);
            var result = operator.getMarkup();
            var expected = {
                hierarchicalType: 'operator',
                id: 1,
                label: 'deviationAbsolute',
                markupType: 'select',
                options: [
                    {
                        hierarchicalType: 'operatorOption',
                        label: 'deviationAbsolute',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        hierarchicalType: 'operatorOption',
                        label: 'deviationRelative',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        hierarchicalType: 'operatorOption',
                        label: 'deviationStandard',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        hierarchicalType: 'operatorOption',
                        label: 'mode',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                ],
                outputType: 'filterOutput',
                scriptId: 0,
                selected: {
                    arguments: [
                        {
                            hierarchicalType: 'argument',
                            id: 2,
                            label: 'by',
                            markupType: 'input',
                            value: 3,
                        },
                    ],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'deviationAbsolute',
                    markupType: 'option',
                    outputType: 'filterOutput',
                },
            };
            expect(result).toStrictEqual(expected);
        });
    });
    describe('getMir', function () {
        it('without argument', function () {
            var mirOperator = types_1.AggregationTallyFilter.mode;
            var cache = new structures_1.Cache();
            var operator = new radon_1.AggregationTallyOperatorFilter(cache, mirOperator, 0);
            var result = operator.getMir();
            expect(result).toStrictEqual(mirOperator);
        });
        it('with argument', function () {
            var mirOperator = [
                types_1.AggregationTallyFilter.deviationAbsolute,
                3,
            ];
            var cache = new structures_1.Cache();
            var operator = new radon_1.AggregationTallyOperatorFilter(cache, mirOperator, 0);
            var result = operator.getMir();
            expect(result).toStrictEqual(mirOperator);
        });
    });
    describe('update', function () {
        it('without argument', function () {
            var mirOperator = types_1.AggregationTallyFilter.mode;
            var cache = new structures_1.Cache();
            var operator = new radon_1.AggregationTallyOperatorFilter(cache, mirOperator, 0);
            operator.update(types_1.AggregationTallyFilter.deviationAbsolute);
            expect(operator.code).toStrictEqual(types_1.AggregationTallyFilter.deviationAbsolute);
            expect(operator.argument).toBeTruthy();
        });
        it('with argument', function () {
            var mirOperator = [
                types_1.AggregationTallyFilter.deviationAbsolute,
                3,
            ];
            var cache = new structures_1.Cache();
            var operator = new radon_1.AggregationTallyOperatorFilter(cache, mirOperator, 0);
            operator.update(types_1.AggregationTallyFilter.deviationStandard);
            expect(operator.code).toStrictEqual(types_1.AggregationTallyFilter.deviationStandard);
            expect(operator.argument).toBeTruthy();
        });
    });
});
