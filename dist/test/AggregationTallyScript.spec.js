"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var radon_1 = require("../src/radon");
var structures_1 = require("../src/structures");
var types_1 = require("../src/types");
describe('AggregationTallyScript', function () {
    describe('getMarkup', function () {
        it('with empty filters', function () {
            var mirScript = {
                filters: [],
                reducer: 0x02,
            };
            var cache = new structures_1.Cache();
            var script = new radon_1.AggregationTallyScript(cache, mirScript);
            var result = script.getMarkup();
            var expected = {
                filters: [],
                reducer: {
                    hierarchicalType: 'operator',
                    id: 2,
                    label: 'mode',
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
                        label: 'mode',
                        markupType: 'option',
                        outputType: 'reducerOutput',
                    },
                },
            };
            expect(result).toStrictEqual(expected);
        });
        it(' with non-empty filters', function () {
            var mirScript = {
                filters: [[types_1.AggregationTallyFilter.deviationAbsolute, 3]],
                reducer: 0x02,
            };
            var cache = new structures_1.Cache();
            var script = new radon_1.AggregationTallyScript(cache, mirScript);
            var result = script.getMarkup();
            var expected = {
                filters: [
                    {
                        hierarchicalType: 'operator',
                        id: 2,
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
                        scriptId: 1,
                        selected: {
                            arguments: [
                                {
                                    hierarchicalType: 'argument',
                                    id: 3,
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
                    },
                ],
                reducer: {
                    hierarchicalType: 'operator',
                    id: 4,
                    label: 'mode',
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
                        label: 'mode',
                        markupType: 'option',
                        outputType: 'reducerOutput',
                    },
                },
            };
            expect(result).toStrictEqual(expected);
        });
    });
    describe('getMir', function () {
        it('with non-empty-filters', function () {
            var mirScript = {
                filters: [[types_1.AggregationTallyFilter.deviationAbsolute, 3]],
                reducer: 0x02,
            };
            var cache = new structures_1.Cache();
            var script = new radon_1.AggregationTallyScript(cache, mirScript);
            var result = script.getMir();
            expect(result).toStrictEqual(mirScript);
        });
        it('with empty filters', function () {
            var mirScript = {
                filters: [[types_1.AggregationTallyFilter.deviationAbsolute, 3]],
                reducer: 0x02,
            };
            var cache = new structures_1.Cache();
            var script = new radon_1.AggregationTallyScript(cache, mirScript);
            var result = script.getMir();
            expect(result).toStrictEqual(mirScript);
        });
    });
    describe('addOperator', function () {
        it('without empty filters', function () {
            var mirScript = {
                filters: [[types_1.AggregationTallyFilter.deviationAbsolute, 3]],
                reducer: 0x02,
            };
            var cache = new structures_1.Cache();
            var script = new radon_1.AggregationTallyScript(cache, mirScript);
            script.addOperator();
            var expected = 2;
            expect(script.filters.length).toStrictEqual(expected);
            expect(script.filters[1].code).toStrictEqual(types_1.AggregationTallyFilter.deviationAbsolute);
        });
        it('with empty filters', function () {
            var mirScript = {
                filters: [],
                reducer: 0x02,
            };
            var cache = new structures_1.Cache();
            var script = new radon_1.AggregationTallyScript(cache, mirScript);
            script.addOperator();
            var expected = 1;
            expect(script.filters.length).toStrictEqual(expected);
            expect(script.filters[0].code).toStrictEqual(types_1.AggregationTallyFilter.deviationAbsolute);
        });
    });
    describe('push', function () {
        it('without empty filters', function () {
            var mirScript = {
                filters: [[types_1.AggregationTallyFilter.deviationAbsolute, 3]],
                reducer: 0x02,
            };
            var cache = new structures_1.Cache();
            var script = new radon_1.AggregationTallyScript(cache, mirScript);
            script.push(types_1.AggregationTallyFilter.deviationAbsolute);
            var expected = types_1.AggregationTallyFilter.deviationAbsolute;
            expect(script.filters[1].code).toStrictEqual(expected);
        });
        it('with empty filters', function () {
            var mirScript = {
                filters: [],
                reducer: 0x02,
            };
            var cache = new structures_1.Cache();
            var script = new radon_1.AggregationTallyScript(cache, mirScript);
            script.push(types_1.AggregationTallyFilter.deviationAbsolute);
            var expected = types_1.AggregationTallyFilter.deviationAbsolute;
            expect(script.filters[0].code).toStrictEqual(expected);
        });
    });
});
