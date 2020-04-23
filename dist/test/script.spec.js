"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../src/types");
var radon_1 = require("../src/radon");
var structures_1 = require("../src/structures");
// TODO: validateScript
describe('Script methods', function () {
    describe('addOperator method', function () {
        it('last type is a Type', function () {
            var mirScript = [types_1.OperatorCode.StringAsBoolean];
            var cache = new structures_1.Cache();
            var script = new radon_1.Script(cache, mirScript);
            script.addOperator();
            expect(script.operators[script.operators.length - 1].code).toStrictEqual(types_1.OperatorCode.BooleanMatch);
        });
        it('last type is a pseudotype', function () {
            var mirScript = [types_1.OperatorCode.StringAsBoolean, types_1.OperatorCode.BooleanMatch];
            var cache = new structures_1.Cache();
            var script = new radon_1.Script(cache, mirScript);
            script.addOperator();
            expect(script.operators[script.operators.length - 1].code).toStrictEqual(radon_1.DEFAULT_OPERATOR);
        });
    });
    describe('deleteOperator method', function () {
        it('deletes operator by id', function () {
            var mirScript = [types_1.OperatorCode.StringAsBoolean, types_1.OperatorCode.BooleanMatch];
            var cache = new structures_1.Cache();
            var script = new radon_1.Script(cache, mirScript);
            var firstOperatorId = script.operators[0].id;
            script.deleteOperator(firstOperatorId);
            expect(script.operators.length).toStrictEqual(1);
        });
    });
    describe('getLastOperator', function () {
        it('empty', function () {
            var mirScript = [];
            var cache = new structures_1.Cache();
            var script = new radon_1.Script(cache, mirScript);
            var result = script.getLastOperator();
            expect(result).toBeNull();
        });
        it('multiple operators', function () {
            var mirScript = [
                types_1.OperatorCode.StringAsBoolean,
                types_1.OperatorCode.BooleanNegate,
                [types_1.OperatorCode.BooleanMatch, '', true],
            ];
            var cache = new structures_1.Cache();
            var script = new radon_1.Script(cache, mirScript);
            var result = script.getLastOperator();
            var expectedCode = 32;
            var expectedArguments = ['', true];
            expect(result.code).toStrictEqual(expectedCode);
            expect(result.mirArguments).toStrictEqual(expectedArguments);
        });
    });
    describe('getMarkup', function () {
        it('empty', function () {
            var mirScript = [];
            var cache = new structures_1.Cache();
            var script = new radon_1.Script(cache, mirScript);
            var result = script.getMarkup();
            expect(result).toStrictEqual([]);
        });
        it('one operator', function () {
            var cache = new structures_1.Cache();
            var mirScript = [types_1.OperatorCode.StringAsBoolean];
            var script = new radon_1.Script(cache, mirScript);
            var result = script.getMarkup();
            var expected = [
                {
                    hierarchicalType: 'operator',
                    id: 2,
                    scriptId: 1,
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
                },
            ];
            expect(result).toStrictEqual(expected);
        });
        it('multiple operators', function () {
            var cache = new structures_1.Cache();
            var mirScript = [
                types_1.OperatorCode.StringAsBoolean,
                types_1.OperatorCode.BooleanNegate,
                types_1.OperatorCode.BooleanMatch,
            ];
            var script = new radon_1.Script(cache, mirScript);
            var result = script.getMarkup();
            var expected = [
                {
                    hierarchicalType: 'operator',
                    id: 2,
                    scriptId: 1,
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
                },
                {
                    hierarchicalType: 'operator',
                    id: 3,
                    scriptId: 1,
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
                },
                {
                    hierarchicalType: 'operator',
                    id: 4,
                    scriptId: 1,
                    label: 'match',
                    markupType: 'select',
                    options: structures_1.markupOptions.boolean,
                    outputType: 'matchOutput',
                    selected: {
                        arguments: [],
                        hierarchicalType: 'selectedOperatorOption',
                        label: 'match',
                        markupType: 'option',
                        outputType: 'matchOutput',
                    },
                },
            ];
            expect(result).toStrictEqual(expected);
        });
    });
    describe('getMir', function () {
        it('empty', function () {
            var mirScript = [];
            var cache = new structures_1.Cache();
            var script = new radon_1.Script(cache, mirScript);
            var result = script.getMir();
            expect(result).toStrictEqual([]);
        });
        it('one operator', function () {
            var cache = new structures_1.Cache();
            var mirScript = [types_1.OperatorCode.StringAsBoolean];
            var script = new radon_1.Script(cache, mirScript);
            var result = script.getMir();
            var expected = mirScript;
            expect(result).toStrictEqual(expected);
        });
        it('multiple operators', function () {
            var cache = new structures_1.Cache();
            var mirScript = [
                types_1.OperatorCode.StringAsBoolean,
                types_1.OperatorCode.BooleanNegate,
                [types_1.OperatorCode.BooleanMatch, ''],
            ];
            var script = new radon_1.Script(cache, mirScript);
            var result = script.getMir();
            var expected = mirScript;
            expect(result).toStrictEqual(expected);
        });
    });
    describe('getOutputType', function () {
        it('default output type when is empty', function () {
            var mirScript = [];
            var cache = new structures_1.Cache();
            var script = new radon_1.Script(cache, mirScript);
            var result = script.getOutputType();
            expect(result).toBe(radon_1.DEFAULT_SCRIPT_FIRST_TYPE);
        });
        it('returns last output type', function () {
            var mirScript = [types_1.OperatorCode.StringLength, types_1.OperatorCode.IntegerAbsolute];
            var cache = new structures_1.Cache();
            var script = new radon_1.Script(cache, mirScript);
            var result = script.getOutputType();
            expect(result).toBe(types_1.OutputType.Integer);
        });
    });
    it('push method', function () {
        var mirScript = [types_1.OperatorCode.StringAsBoolean, types_1.OperatorCode.BooleanNegate];
        var cache = new structures_1.Cache();
        var script = new radon_1.Script(cache, mirScript);
        script.push([types_1.OperatorCode.BooleanMatch, '', true]);
        var expectedCode = 32;
        var expectedArguments = ['', true];
        expect(script.operators[script.operators.length - 1].code).toStrictEqual(expectedCode);
        expect(script.operators[script.operators.length - 1].mirArguments).toStrictEqual(expectedArguments);
    });
});
