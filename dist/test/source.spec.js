"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../src/types");
var radon_1 = require("../src/radon");
var structures_1 = require("../src/structures");
describe('Script', function () {
    describe('getMarkup method', function () {
        it('empty', function () {
            var mirScript = [];
            var cache = new structures_1.Cache();
            var source = new radon_1.Source(cache, { kind: 'kind', url: 'url', script: mirScript });
            var result = source.getMarkup();
            var expected = { kind: 'kind', url: 'url', script: [], scriptId: 2 };
            expect(result).toStrictEqual(expected);
        });
        it('multiple operators', function () {
            var cache = new structures_1.Cache();
            var mirScript = [
                types_1.OperatorCode.StringAsBoolean,
                types_1.OperatorCode.BooleanNegate,
                types_1.OperatorCode.BooleanMatch,
            ];
            var mirSource = {
                kind: 'kind',
                url: 'url',
                script: mirScript,
            };
            var result = new radon_1.Source(cache, mirSource).getMarkup();
            var expected = {
                kind: 'kind',
                scriptId: 2,
                script: [
                    {
                        hierarchicalType: 'operator',
                        id: 3,
                        scriptId: 2,
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
                        id: 4,
                        scriptId: 2,
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
                        id: 5,
                        scriptId: 2,
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
                ],
                url: 'url',
            };
            expect(result).toStrictEqual(expected);
        });
    });
    describe('getMir method', function () {
        it('empty', function () {
            var mirScript = [];
            var cache = new structures_1.Cache();
            var source = new radon_1.Source(cache, { kind: 'kind', url: 'url', script: mirScript });
            var result = source.getMir();
            var expected = { kind: 'kind', url: 'url', script: [] };
            expect(result).toStrictEqual(expected);
        });
        it('multiple operators', function () {
            var cache = new structures_1.Cache();
            var mirScript = [
                types_1.OperatorCode.StringAsBoolean,
                types_1.OperatorCode.BooleanNegate,
                [types_1.OperatorCode.BooleanMatch, ''],
            ];
            var mirSource = {
                kind: 'kind',
                url: 'url',
                script: mirScript,
            };
            var result = new radon_1.Source(cache, mirSource).getMir();
            var expected = mirSource;
            expect(result).toStrictEqual(expected);
        });
    });
});
