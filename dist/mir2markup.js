"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var structures_1 = require("./structures");
var types_1 = require("./types");
var utils_1 = require("./utils");
function mir2markup(mir) {
    var cache = {};
    var aggregateScript = generateMarkupScript(mir.radRequest.aggregate, cache).script;
    var tallyScript = generateMarkupScript(mir.radRequest.tally, cache).script;
    var radRequest = {
        notBefore: mir.radRequest.notBefore,
        retrieve: mir.radRequest.retrieve.map(function (source) {
            var generatedMarkupScript = generateMarkupScript(source.script, cache);
            return {
                url: source.url,
                script: generatedMarkupScript.script,
            };
        }),
        aggregate: aggregateScript,
        tally: tallyScript,
    };
    return {
        name: mir.name,
        description: mir.description,
        radRequest: radRequest,
    };
}
exports.mir2markup = mir2markup;
function generateMarkupScript(script, cache) {
    var markupScript = script.map(function (operator) {
        return generateMarkupOperator(operator);
    });
    return { cache: cache, script: markupScript };
}
exports.generateMarkupScript = generateMarkupScript;
function generateMarkupOperator(operator) {
    var _a = getMirOperatorInfo(operator), code = _a.code, args = _a.args;
    var operatorInfo = structures_1.operatorInfos[code];
    var outputType = findOutputType(code);
    var markupOperator = {
        id: 0,
        scriptId: 0,
        markupType: types_1.MarkupType.Select,
        hierarchicalType: types_1.MarkupHierarchicalType.Operator,
        outputType: outputType,
        selected: generateSelectedOption(operatorInfo, code, args),
        options: generateMarkupOptions(operatorInfo, code, args),
    };
    return markupOperator;
}
exports.generateMarkupOperator = generateMarkupOperator;
function generateMarkupOptions(operatorInfo, _code, _args) {
    var markupOptions = Object.entries(structures_1.typeSystem[operatorInfo.type]).map(function (x) {
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.OperatorOption,
            label: x[0],
            markupType: types_1.MarkupType.Option,
            // TODO: Add support for Pseudotypes
            outputType: x[1][1].length > 1 ? x[1][1] : x[1][1][0],
        };
    });
    return markupOptions;
}
exports.generateMarkupOptions = generateMarkupOptions;
function generateSelectedOption(operatorInfo, code, args) {
    var outputType = findOutputType(code);
    var markupSelectedOption = {
        arguments: args ? generateOperatorArguments(operatorInfo, args) : [],
        hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
        label: operatorInfo.name,
        markupType: types_1.MarkupType.Option,
        // TODO: Add support for pseudotypes
        outputType: outputType,
    };
    return markupSelectedOption;
}
exports.generateSelectedOption = generateSelectedOption;
function generateOperatorArguments(operatorInfo, args) {
    var operatorArguments = args.map(function (argument, index) {
        var argumentInfo = operatorInfo.arguments[index];
        switch (argumentInfo.type) {
            // TODO: Add support for pseudotypes
            case types_1.MirArgumentKind.Array:
            case types_1.MirArgumentKind.Boolean:
            case types_1.MirArgumentKind.Bytes:
            case types_1.MirArgumentKind.Mapper:
            case types_1.MirArgumentKind.Passthrough:
            case types_1.MirArgumentKind.Result:
            case types_1.MirArgumentKind.Float:
            case types_1.MirArgumentKind.Inner:
            case types_1.MirArgumentKind.Integer:
            case types_1.MirArgumentKind.Map:
            case types_1.MirArgumentKind.String:
                return {
                    hierarchicalType: types_1.MarkupHierarchicalType.Argument,
                    id: 0,
                    label: argumentInfo.name,
                    markupType: types_1.MarkupType.Input,
                    type: argumentInfo.type,
                    value: argument,
                };
            case types_1.MirArgumentKind.Filter:
                return {
                    hierarchicalType: types_1.MarkupHierarchicalType.Argument,
                    id: 0,
                    markupType: types_1.MarkupType.Select,
                    options: generateFilterArgumentOptions(),
                    scriptId: 0,
                    label: argumentInfo.name,
                    selected: generateSelectedFilterArgument(argument),
                };
            case types_1.MirArgumentKind.Reducer:
                return {
                    hierarchicalType: types_1.MarkupHierarchicalType.Argument,
                    id: 0,
                    markupType: types_1.MarkupType.Select,
                    options: generateReducerArgumentOptions(),
                    outputType: types_1.OutputType.Integer,
                    scriptId: 0,
                    label: argumentInfo.name,
                    selected: generateSelectedReducerArgument(argument),
                };
        }
    });
    return operatorArguments;
}
exports.generateOperatorArguments = generateOperatorArguments;
// TODO: Call this function just at the beginning
function generateFilterArgumentOptions() {
    var markupOptions = utils_1.getEnumNames(types_1.Filter).map(function (name) {
        return {
            label: name,
            hierarchicalType: types_1.MarkupHierarchicalType.OperatorOption,
            markupType: types_1.MarkupType.Option,
            // TODO: Add support for pseudotypes
            outputType: types_1.OutputType.Bytes,
        };
    });
    return markupOptions;
}
exports.generateFilterArgumentOptions = generateFilterArgumentOptions;
// TODO: Call this function just at the beginning
function generateReducerArgumentOptions() {
    var markupOptions = utils_1.getEnumNames(types_1.Reducer).map(function (name) {
        return {
            label: name,
            hierarchicalType: types_1.MarkupHierarchicalType.OperatorOption,
            markupType: types_1.MarkupType.Option,
            outputType: types_1.OutputType.Bytes,
        };
    });
    return markupOptions;
}
exports.generateReducerArgumentOptions = generateReducerArgumentOptions;
function generateSelectedFilterArgument(filterArgument) {
    var filter = filterArgument[0];
    var argument = filterArgument[1];
    var selectedArgument = {
        arguments: [
            {
                hierarchicalType: types_1.MarkupHierarchicalType.Argument,
                id: 0,
                label: 'by',
                markupType: types_1.MarkupType.Input,
                value: argument,
            },
        ],
        label: types_1.Filter[filter],
        hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
        markupType: types_1.MarkupType.Option,
        outputType: types_1.OutputType.Bytes,
    };
    return selectedArgument;
}
exports.generateSelectedFilterArgument = generateSelectedFilterArgument;
function generateSelectedReducerArgument(reducer) {
    var selectedArgument = {
        arguments: [],
        label: types_1.Reducer[reducer],
        hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
        markupType: types_1.MarkupType.Option,
        outputType: types_1.OutputType.Bytes,
    };
    return selectedArgument;
}
exports.generateSelectedReducerArgument = generateSelectedReducerArgument;
function findOutputType(code) {
    var entry = Object.entries(structures_1.typeSystem).find(function (entry) {
        return Object.values(entry[1]).find(function (x) { return x[0] === code; });
    });
    var operatorEntry = Object.values(entry[1]).find(function (x) { return x[0] === code; });
    var outputType = operatorEntry[1];
    return outputType.length > 1 ? outputType : outputType[0];
}
exports.findOutputType = findOutputType;
function getMirOperatorInfo(operator) {
    return Array.isArray(operator)
        ? {
            code: operator[0],
            args: operator.slice(1),
        }
        : {
            code: operator,
            args: null,
        };
}
exports.getMirOperatorInfo = getMirOperatorInfo;
