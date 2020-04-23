"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var radon_1 = require("../src/radon");
var types_1 = require("../src/types");
var structures_1 = require("../src/structures");
describe('Operator methods', function () {
    describe('getMarkup', function () {
        it('default operator', function () {
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Array, null, { emit: function () { } });
            var result = operator.getMarkup();
            var expected = {
                hierarchicalType: 'operator',
                id: 1,
                label: 'count',
                markupType: 'select',
                options: structures_1.allMarkupOptions,
                outputType: 'integer',
                scriptId: 0,
                selected: {
                    arguments: [],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'count',
                    markupType: 'option',
                    outputType: 'integer',
                },
            };
            expect(result).toStrictEqual(expected);
        });
        it('array', function () {
            var op = types_1.OperatorCode.ArrayCount;
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Array, op, { emit: function () { } });
            var result = operator.getMarkup();
            var expected = {
                hierarchicalType: 'operator',
                id: 1,
                scriptId: 0,
                label: 'count',
                markupType: 'select',
                options: structures_1.markupOptions.array,
                outputType: 'integer',
                selected: {
                    arguments: [],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'count',
                    markupType: 'option',
                    outputType: 'integer',
                },
            };
            expect(result).toStrictEqual(expected);
        });
        it('boolean', function () {
            var op = types_1.OperatorCode.BooleanNegate;
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Boolean, op, { emit: function () { } });
            var result = operator.getMarkup();
            var expected = {
                hierarchicalType: 'operator',
                id: 1,
                scriptId: 0,
                label: 'negate',
                markupType: 'select',
                options: structures_1.markupOptions.boolean,
                outputType: 'boolean',
                selected: {
                    arguments: [],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'negate',
                    markupType: 'option',
                    outputType: 'boolean',
                },
            };
            expect(result).toStrictEqual(expected);
        });
        it('bytes', function () {
            var op = types_1.OperatorCode.BytesAsString;
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Bytes, op, { emit: function () { } });
            var result = operator.getMarkup();
            var expected = {
                hierarchicalType: 'operator',
                id: 1,
                scriptId: 0,
                label: 'asString',
                markupType: 'select',
                options: structures_1.markupOptions.bytes,
                outputType: 'string',
                selected: {
                    arguments: [],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'asString',
                    markupType: 'option',
                    outputType: 'string',
                },
            };
            expect(result).toStrictEqual(expected);
        });
        it('integer', function () {
            var op = types_1.OperatorCode.IntegerAbsolute;
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Integer, op, { emit: function () { } });
            var result = operator.getMarkup();
            var expected = {
                hierarchicalType: 'operator',
                id: 1,
                scriptId: 0,
                label: 'absolute',
                markupType: 'select',
                options: structures_1.markupOptions.integer,
                outputType: 'integer',
                selected: {
                    arguments: [],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'absolute',
                    markupType: 'option',
                    outputType: 'integer',
                },
            };
            expect(result).toStrictEqual(expected);
        });
        it('float', function () {
            var op = types_1.OperatorCode.FloatAbsolute;
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Float, op, { emit: function () { } });
            var result = operator.getMarkup();
            var expected = {
                hierarchicalType: 'operator',
                id: 1,
                scriptId: 0,
                label: 'absolute',
                markupType: 'select',
                options: structures_1.markupOptions.float,
                outputType: 'float',
                selected: {
                    arguments: [],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'absolute',
                    markupType: 'option',
                    outputType: 'float',
                },
            };
            expect(result).toStrictEqual(expected);
        });
        it('map', function () {
            var op = types_1.OperatorCode.MapGetMap;
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Map, op, { emit: function () { } });
            var result = operator.getMarkup();
            var expected = {
                hierarchicalType: 'operator',
                id: 1,
                scriptId: 0,
                label: 'getMap',
                markupType: 'select',
                options: structures_1.markupOptions.map,
                outputType: 'map',
                selected: {
                    arguments: [],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'getMap',
                    markupType: 'option',
                    outputType: 'map',
                },
            };
            expect(result).toStrictEqual(expected);
        });
        it('string', function () {
            var op = types_1.OperatorCode.StringAsBoolean;
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.String, op, { emit: function () { } });
            var result = operator.getMarkup();
            var expected = {
                hierarchicalType: 'operator',
                id: 1,
                scriptId: 0,
                label: 'asBoolean',
                markupType: 'select',
                options: structures_1.markupOptions.string,
                outputType: 'boolean',
                selected: {
                    arguments: [],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'asBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                },
            };
            expect(result).toStrictEqual(expected);
        });
    });
    describe('getMir', function () {
        it('default operator', function () {
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Array, null, { emit: function () { } });
            var result = operator.getMir();
            var expected = types_1.OperatorCode.ArrayCount;
            expect(result).toStrictEqual(expected);
        });
        it('array', function () {
            var op = types_1.OperatorCode.ArrayCount;
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Array, op, { emit: function () { } });
            var result = operator.getMir();
            var expected = op;
            expect(result).toStrictEqual(expected);
        });
        it('boolean', function () {
            var op = types_1.OperatorCode.BooleanNegate;
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Boolean, op, { emit: function () { } });
            var result = operator.getMir();
            var expected = op;
            expect(result).toStrictEqual(expected);
        });
        it('bytes', function () {
            var op = types_1.OperatorCode.BytesAsString;
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Bytes, op, { emit: function () { } });
            var result = operator.getMir();
            var expected = op;
            expect(result).toStrictEqual(expected);
        });
        it('integer', function () {
            var op = types_1.OperatorCode.IntegerAbsolute;
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Integer, op, { emit: function () { } });
            var result = operator.getMir();
            var expected = op;
            expect(result).toStrictEqual(expected);
        });
        it('float', function () {
            var op = types_1.OperatorCode.FloatAbsolute;
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Float, op, { emit: function () { } });
            var result = operator.getMir();
            var expected = op;
            expect(result).toStrictEqual(expected);
        });
        it('map', function () {
            var op = [types_1.OperatorCode.MapGetMap, ''];
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Map, op, { emit: function () { } });
            var result = operator.getMir();
            var expected = op;
            expect(result).toStrictEqual(expected);
        });
        it('string', function () {
            var op = types_1.OperatorCode.StringAsBoolean;
            var cache = new structures_1.Cache();
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.String, op, { emit: function () { } });
            var result = operator.getMir();
            var expected = op;
            expect(result).toStrictEqual(expected);
        });
    });
    describe('update', function () {
        it('default operator', function () {
            var cache = new structures_1.Cache();
            var emitMock = jest.fn();
            var operator = new radon_1.Operator(cache, 0, null, null, { emit: emitMock });
            var newOperatorCode = types_1.OperatorCode.BooleanMatch;
            expect(operator.default).toBe(true);
            operator.update(newOperatorCode);
            expect(operator.code).toBe(newOperatorCode);
            expect(operator.operatorInfo).toBe(structures_1.operatorInfos[newOperatorCode]);
            expect(operator.default).toBe(false);
            expect(operator.inputType).toBe(types_1.OutputType.Array);
            expect(emitMock).toBeCalledTimes(1);
        });
        it('array', function () {
            var cache = new structures_1.Cache();
            var emitMock = jest.fn();
            var op = types_1.OperatorCode.ArrayCount;
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Array, op, { emit: emitMock });
            var newOperatorCode = types_1.OperatorCode.BooleanMatch;
            operator.update(newOperatorCode);
            expect(operator.code).toBe(newOperatorCode);
            expect(operator.operatorInfo).toBe(structures_1.operatorInfos[newOperatorCode]);
            expect(operator.inputType).toBe(types_1.OutputType.Array);
            expect(emitMock).toBeCalledTimes(1);
        });
        it('boolean', function () {
            var cache = new structures_1.Cache();
            var emitMock = jest.fn();
            var op = types_1.OperatorCode.BooleanMatch;
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Boolean, op, { emit: emitMock });
            var newOperatorCode = types_1.OperatorCode.ArrayCount;
            operator.update(newOperatorCode);
            expect(operator.code).toBe(newOperatorCode);
            expect(operator.operatorInfo).toBe(structures_1.operatorInfos[newOperatorCode]);
            expect(operator.inputType).toBe(types_1.OutputType.Boolean);
            expect(emitMock).toBeCalledTimes(1);
        });
        it('bytes', function () {
            var cache = new structures_1.Cache();
            var emitMock = jest.fn();
            var op = types_1.OperatorCode.BytesAsString;
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Bytes, op, { emit: emitMock });
            var newOperatorCode = types_1.OperatorCode.ArrayCount;
            operator.update(newOperatorCode);
            expect(operator.code).toBe(newOperatorCode);
            expect(operator.operatorInfo).toBe(structures_1.operatorInfos[newOperatorCode]);
            expect(operator.inputType).toBe(types_1.OutputType.Bytes);
            expect(emitMock).toBeCalledTimes(1);
        });
        it('integer', function () {
            var cache = new structures_1.Cache();
            var emitMock = jest.fn();
            var op = types_1.OperatorCode.IntegerAsString;
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Integer, op, { emit: emitMock });
            var newOperatorCode = types_1.OperatorCode.FloatGraterThan;
            operator.update(newOperatorCode);
            expect(operator.code).toBe(newOperatorCode);
            expect(operator.operatorInfo).toBe(structures_1.operatorInfos[newOperatorCode]);
            expect(operator.inputType).toBe(types_1.OutputType.Integer);
            expect(emitMock).toBeCalledTimes(1);
        });
        it('float', function () {
            var cache = new structures_1.Cache();
            var emitMock = jest.fn();
            var op = types_1.OperatorCode.FloatAbsolute;
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Float, op, { emit: emitMock });
            var newOperatorCode = types_1.OperatorCode.FloatCeiling;
            operator.update(newOperatorCode);
            expect(operator.code).toBe(newOperatorCode);
            expect(operator.operatorInfo).toBe(structures_1.operatorInfos[newOperatorCode]);
            expect(operator.inputType).toBe(types_1.OutputType.Float);
            expect(emitMock).toBeCalledTimes(1);
        });
        it('map', function () {
            var cache = new structures_1.Cache();
            var emitMock = jest.fn();
            var op = types_1.OperatorCode.MapKeys;
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.Map, op, { emit: emitMock });
            var newOperatorCode = types_1.OperatorCode.MapGetString;
            operator.update(newOperatorCode);
            expect(operator.code).toBe(newOperatorCode);
            expect(operator.operatorInfo).toBe(structures_1.operatorInfos[newOperatorCode]);
            expect(operator.inputType).toBe(types_1.OutputType.Map);
            expect(emitMock).toBeCalledTimes(1);
        });
        it('string', function () {
            var cache = new structures_1.Cache();
            var emitMock = jest.fn();
            var op = types_1.OperatorCode.StringAsFloat;
            var operator = new radon_1.Operator(cache, 0, types_1.OutputType.String, op, { emit: emitMock });
            var newOperatorCode = types_1.OperatorCode.StringAsInteger;
            operator.update(newOperatorCode);
            expect(operator.code).toBe(newOperatorCode);
            expect(operator.operatorInfo).toBe(structures_1.operatorInfos[newOperatorCode]);
            expect(operator.inputType).toBe(types_1.OutputType.String);
            expect(emitMock).toBeCalledTimes(1);
        });
    });
});
