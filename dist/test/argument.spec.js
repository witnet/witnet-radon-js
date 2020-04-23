"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var radon_1 = require("../src/radon");
var structures_1 = require("../src/structures");
var types_1 = require("../src/types");
var reducerOptions = radon_1.generateReducerArgumentOptions();
// const filterOptions = generateFilterArgumentOptions()
describe('Argument methods', function () {
    describe('getMarkup', function () {
        it('string', function () {
            var operator = [types_1.OperatorCode.MapGetMap, 'bpi'];
            var argumentInfo = structures_1.operatorInfos[operator[0]].arguments[0];
            var cache = new structures_1.Cache();
            var argument = new radon_1.Argument(cache, argumentInfo, 'bpi');
            var result = argument.getMarkup();
            var expected = {
                hierarchicalType: 'argument',
                id: 1,
                label: 'key',
                markupType: 'input',
                value: 'bpi',
                type: 'string',
            };
            expect(result).toStrictEqual(expected);
        });
        it('float', function () {
            var operator = [types_1.OperatorCode.FloatGraterThan, 1.1];
            var argumentInfo = structures_1.operatorInfos[operator[0]].arguments[0];
            var cache = new structures_1.Cache();
            var argument = new radon_1.Argument(cache, argumentInfo, operator[1]);
            var result = argument.getMarkup();
            var expected = {
                hierarchicalType: 'argument',
                id: 1,
                label: 'value',
                markupType: 'input',
                value: 1.1,
                type: 'number',
            };
            expect(result).toStrictEqual(expected);
        });
        it('boolean', function () {
            var operator = [types_1.OperatorCode.ArraySort, '', true];
            var argumentInfo = structures_1.operatorInfos[operator[0]].arguments[1];
            var cache = new structures_1.Cache();
            var argument = new radon_1.Argument(cache, argumentInfo, operator[2]);
            var result = argument.getMarkup();
            var expected = {
                hierarchicalType: 'argument',
                id: 1,
                label: 'ascending',
                markupType: 'input',
                value: true,
                type: 'boolean',
            };
            expect(result).toStrictEqual(expected);
        });
        it('subscript', function () {
            var operator = [
                types_1.OperatorCode.ArrayMap,
                [[types_1.OperatorCode.MapGetString, 'symbol'], types_1.OperatorCode.StringToLowerCase],
            ];
            var argumentInfo = structures_1.operatorInfos[operator[0]].arguments[0];
            var cache = new structures_1.Cache();
            var argument = new radon_1.Argument(cache, argumentInfo, operator[1]);
            var result = argument.getMarkup();
            var expected = {
                id: 1,
                label: 'script',
                markupType: 'script',
                outputType: 'subscriptOutput',
                hierarchicalType: 'argument',
                subscript: [
                    {
                        hierarchicalType: 'operator',
                        id: 3,
                        label: 'getString',
                        markupType: 'select',
                        options: [
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsBoolean',
                                markupType: 'option',
                                outputType: 'boolean',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsBytes',
                                markupType: 'option',
                                outputType: 'bytes',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsFloat',
                                markupType: 'option',
                                outputType: 'float',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsInteger',
                                markupType: 'option',
                                outputType: 'integer',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringLength',
                                markupType: 'option',
                                outputType: 'integer',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringMatch',
                                markupType: 'option',
                                outputType: 'matchOutput',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringParseJsonArray',
                                markupType: 'option',
                                outputType: 'array',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringParseJsonMap',
                                markupType: 'option',
                                outputType: 'map',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringParseXML',
                                markupType: 'option',
                                outputType: 'map',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringToLowerCase',
                                markupType: 'option',
                                outputType: 'string',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringToUpperCase',
                                markupType: 'option',
                                outputType: 'string',
                            },
                        ],
                        outputType: 'string',
                        scriptId: 2,
                        selected: {
                            arguments: [
                                {
                                    hierarchicalType: 'argument',
                                    id: 4,
                                    label: 'key',
                                    markupType: 'input',
                                    value: 'symbol',
                                    type: 'string',
                                },
                            ],
                            hierarchicalType: 'selectedOperatorOption',
                            label: 'getString',
                            markupType: 'option',
                            outputType: 'string',
                        },
                    },
                    {
                        hierarchicalType: 'operator',
                        id: 5,
                        label: 'toLowerCase',
                        markupType: 'select',
                        options: [
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsBoolean',
                                markupType: 'option',
                                outputType: 'boolean',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsBytes',
                                markupType: 'option',
                                outputType: 'bytes',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsFloat',
                                markupType: 'option',
                                outputType: 'float',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsInteger',
                                markupType: 'option',
                                outputType: 'integer',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringLength',
                                markupType: 'option',
                                outputType: 'integer',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringMatch',
                                markupType: 'option',
                                outputType: 'matchOutput',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringParseJsonArray',
                                markupType: 'option',
                                outputType: 'array',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringParseJsonMap',
                                markupType: 'option',
                                outputType: 'map',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringParseXML',
                                markupType: 'option',
                                outputType: 'map',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringToLowerCase',
                                markupType: 'option',
                                outputType: 'string',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringToUpperCase',
                                markupType: 'option',
                                outputType: 'string',
                            },
                        ],
                        outputType: 'string',
                        scriptId: 2,
                        selected: {
                            arguments: [],
                            hierarchicalType: 'selectedOperatorOption',
                            label: 'toLowerCase',
                            markupType: 'option',
                            outputType: 'string',
                        },
                    },
                ],
            };
            expect(result).toStrictEqual(expected);
        });
        it('filter', function () {
            var operator = [types_1.OperatorCode.ArraySome, 0x00, 1];
            var argumentInfo = structures_1.operatorInfos[operator[0]].arguments[0];
            var cache = new structures_1.Cache();
            var argument = new radon_1.Argument(cache, argumentInfo, [operator[1], operator[2]]);
            var result = argument.getMarkup();
            var expected = {
                hierarchicalType: 'argument',
                id: 1,
                label: 'function',
                markupType: 'select',
                options: [
                    {
                        label: 'greaterThan',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'LessThan',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'equals',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'deviationAbsolute',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'deviationRelative',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'deviationStandard',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'top',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'bottom',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'mode',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'lessOrEqualThan',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'greaterOrEqualThan',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'notEquals',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'notDeviationAbsolute',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'notDeviationRelative',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'notDeviationStandard',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'notTop',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                    {
                        label: 'notBottom',
                        hierarchicalType: 'operatorOption',
                        markupType: 'option',
                        outputType: 'filterOutput',
                    },
                ],
                outputType: 'filterOutput',
                selected: {
                    arguments: [
                        {
                            hierarchicalType: 'argument',
                            id: 2,
                            label: 'by',
                            markupType: 'input',
                            value: 1,
                            type: 'string',
                        },
                    ],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'greaterThan',
                    outputType: 'filterOutput',
                    markupType: 'option',
                },
            };
            expect(result).toStrictEqual(expected);
        });
        it('filter with subscript', function () {
            var operator = [
                types_1.OperatorCode.ArraySome,
                [[types_1.OperatorCode.MapGetString, 'symbol'], types_1.OperatorCode.StringToLowerCase],
            ];
            var argumentInfo = structures_1.operatorInfos[operator[0]].arguments[0];
            var cache = new structures_1.Cache();
            var argument = new radon_1.Argument(cache, argumentInfo, operator[1], true);
            var result = argument.getMarkup();
            var expected = {
                id: 1,
                label: 'function',
                markupType: 'script',
                outputType: 'subscriptOutput',
                hierarchicalType: 'argument',
                subscript: [
                    {
                        hierarchicalType: 'operator',
                        id: 3,
                        label: 'getString',
                        markupType: 'select',
                        options: [
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsBoolean',
                                markupType: 'option',
                                outputType: 'boolean',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsBytes',
                                markupType: 'option',
                                outputType: 'bytes',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsFloat',
                                markupType: 'option',
                                outputType: 'float',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsInteger',
                                markupType: 'option',
                                outputType: 'integer',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringLength',
                                markupType: 'option',
                                outputType: 'integer',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringMatch',
                                markupType: 'option',
                                outputType: 'matchOutput',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringParseJsonArray',
                                markupType: 'option',
                                outputType: 'array',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringParseJsonMap',
                                markupType: 'option',
                                outputType: 'map',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringParseXML',
                                markupType: 'option',
                                outputType: 'map',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringToLowerCase',
                                markupType: 'option',
                                outputType: 'string',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringToUpperCase',
                                markupType: 'option',
                                outputType: 'string',
                            },
                        ],
                        outputType: 'string',
                        scriptId: 2,
                        selected: {
                            arguments: [
                                {
                                    hierarchicalType: 'argument',
                                    id: 4,
                                    label: 'key',
                                    markupType: 'input',
                                    value: 'symbol',
                                    type: 'string',
                                },
                            ],
                            hierarchicalType: 'selectedOperatorOption',
                            label: 'getString',
                            markupType: 'option',
                            outputType: 'string',
                        },
                    },
                    {
                        hierarchicalType: 'operator',
                        id: 5,
                        label: 'toLowerCase',
                        markupType: 'select',
                        options: [
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsBoolean',
                                markupType: 'option',
                                outputType: 'boolean',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsBytes',
                                markupType: 'option',
                                outputType: 'bytes',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsFloat',
                                markupType: 'option',
                                outputType: 'float',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringAsInteger',
                                markupType: 'option',
                                outputType: 'integer',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringLength',
                                markupType: 'option',
                                outputType: 'integer',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringMatch',
                                markupType: 'option',
                                outputType: 'matchOutput',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringParseJsonArray',
                                markupType: 'option',
                                outputType: 'array',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringParseJsonMap',
                                markupType: 'option',
                                outputType: 'map',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringParseXML',
                                markupType: 'option',
                                outputType: 'map',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringToLowerCase',
                                markupType: 'option',
                                outputType: 'string',
                            },
                            {
                                hierarchicalType: 'operatorOption',
                                label: 'StringToUpperCase',
                                markupType: 'option',
                                outputType: 'string',
                            },
                        ],
                        outputType: 'string',
                        scriptId: 2,
                        selected: {
                            arguments: [],
                            hierarchicalType: 'selectedOperatorOption',
                            label: 'toLowerCase',
                            markupType: 'option',
                            outputType: 'string',
                        },
                    },
                ],
            };
            expect(result).toStrictEqual(expected);
        });
        it('reducer', function () {
            var operator = [types_1.OperatorCode.ArrayReduce, 0x00];
            var argumentInfo = structures_1.operatorInfos[operator[0]].arguments[0];
            var cache = new structures_1.Cache();
            var argument = new radon_1.Argument(cache, argumentInfo, operator[1]);
            var result = argument.getMarkup();
            var expected = {
                hierarchicalType: 'argument',
                id: 1,
                label: 'function',
                markupType: 'select',
                options: reducerOptions,
                outputType: types_1.OutputType.ReducerOutput,
                selected: {
                    arguments: [],
                    hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
                    label: 'min',
                    markupType: types_1.MarkupType.Option,
                    outputType: types_1.OutputType.ReducerOutput,
                },
            };
            expect(result).toStrictEqual(expected);
        });
    });
    describe('getMir', function () {
        it('string', function () {
            var argumentInfo = structures_1.operatorInfos[types_1.OperatorCode.MapGetMap].arguments[0];
            var cache = new structures_1.Cache();
            var argument = new radon_1.Argument(cache, argumentInfo, 'bpi');
            var result = argument.getMir();
            var expected = 'bpi';
            expect(result).toStrictEqual(expected);
        });
        it('float', function () {
            var argumentInfo = structures_1.operatorInfos[types_1.OperatorCode.FloatGraterThan].arguments[0];
            var cache = new structures_1.Cache();
            var argument = new radon_1.Argument(cache, argumentInfo, 1.1);
            var result = argument.getMir();
            var expected = 1.1;
            expect(result).toStrictEqual(expected);
        });
        it('boolean', function () {
            var argumentInfo = structures_1.operatorInfos[types_1.OperatorCode.ArraySort].arguments[1];
            var cache = new structures_1.Cache();
            var argument = new radon_1.Argument(cache, argumentInfo, true);
            var result = argument.getMir();
            var expected = true;
            expect(result).toStrictEqual(expected);
        });
        it('subscript', function () {
            var argumentInfo = structures_1.operatorInfos[types_1.OperatorCode.ArrayMap].arguments[0];
            var operator = [
                types_1.OperatorCode.ArrayMap,
                [[types_1.OperatorCode.MapGetString, 'symbol'], types_1.OperatorCode.StringToLowerCase],
            ];
            var cache = new structures_1.Cache();
            var argument = new radon_1.Argument(cache, argumentInfo, operator[1]);
            var result = argument.getMir();
            expect(result).toStrictEqual(operator[1]);
        });
        it('filter', function () {
            var argumentInfo = structures_1.operatorInfos[types_1.OperatorCode.ArraySome].arguments[0];
            var cache = new structures_1.Cache();
            var argument = new radon_1.Argument(cache, argumentInfo, [0x00, 1]);
            var result = argument.getMir();
            var expected = [0x00, 1];
            expect(result).toStrictEqual(expected);
        });
        it('reducer', function () {
            var argumentInfo = structures_1.operatorInfos[types_1.OperatorCode.ArrayReduce].arguments[0];
            var cache = new structures_1.Cache();
            var argument = new radon_1.Argument(cache, argumentInfo, 0x00);
            var result = argument.getMir();
            var expected = 0x00;
            expect(result).toStrictEqual(expected);
        });
    });
    describe('update', function () {
        it('optional', function () {
            var cache = new structures_1.Cache();
            var argumentInfo = {
                name: 'min',
                optional: true,
                type: types_1.MirArgumentType.Integer,
            };
            var argument = new radon_1.Argument(cache, argumentInfo, undefined);
            var newValue = 9;
            argument.update(newValue);
            expect(argument.value).toBe(newValue);
        });
        it('integer', function () {
            var cache = new structures_1.Cache();
            var argumentInfo = {
                name: 'min',
                optional: true,
                type: types_1.MirArgumentType.Integer,
            };
            var argument = new radon_1.Argument(cache, argumentInfo, 0);
            var newValue = 9;
            argument.update(newValue);
            expect(argument.value).toBe(newValue);
        });
        it('filter function', function () {
            var cache = new structures_1.Cache();
            var argumentInfo = {
                name: 'function',
                optional: false,
                type: types_1.MirArgumentType.FilterFunction,
            };
            var argument = new radon_1.Argument(cache, argumentInfo, [types_1.Filter.LessThan, 5]);
            var newValue = types_1.Filter.bottom;
            argument.update(newValue);
            expect(argument.value).toStrictEqual([newValue, 5]);
        });
        it('reducer function', function () {
            var cache = new structures_1.Cache();
            var argumentInfo = {
                name: 'function',
                optional: false,
                type: types_1.MirArgumentType.ReducerFunction,
            };
            var argument = new radon_1.Argument(cache, argumentInfo, types_1.Reducer.averageMeanWeighted);
            var newValue = types_1.Reducer.averageMean;
            argument.update(newValue);
            expect(argument.value).toStrictEqual(newValue);
        });
        it('float', function () {
            var cache = new structures_1.Cache();
            var argumentInfo = {
                name: 'value',
                optional: false,
                type: types_1.MirArgumentType.Float,
            };
            var argument = new radon_1.Argument(cache, argumentInfo, 0.0);
            var newValue = 1.0;
            argument.update(newValue);
            expect(argument.value).toBe(newValue);
        });
        it('string', function () {
            var cache = new structures_1.Cache();
            var argumentInfo = structures_1.operatorInfos[types_1.OperatorCode.MapGetBoolean].arguments[0];
            var argument = new radon_1.Argument(cache, argumentInfo, 'key');
            var newValue = 'value';
            argument.update(newValue);
            expect(argument.value).toBe(newValue);
        });
        it('boolean', function () {
            var cache = new structures_1.Cache();
            var argumentInfo = {
                name: 'ascending',
                optional: false,
                type: types_1.MirArgumentType.Boolean,
            };
            var argument = new radon_1.Argument(cache, argumentInfo, true);
            var newValue = false;
            argument.update(newValue);
            expect(argument.value).toBe(newValue);
        });
    });
});
