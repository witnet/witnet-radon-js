"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var structures_1 = require("./structures");
var types_1 = require("./types");
var utils_1 = require("./utils");
function markup2mir(markup) {
    var retrieve = generateMirSources(markup.radRequest.retrieve);
    var aggregate = generateMirScript(markup.radRequest.aggregate);
    var tally = generateMirScript(markup.radRequest.tally);
    var radRequest = {
        notBefore: markup.radRequest.notBefore,
        retrieve: retrieve,
        aggregate: aggregate,
        tally: tally,
    };
    var mir = {
        description: markup.description,
        name: markup.name,
        radRequest: radRequest,
    };
    return mir;
}
exports.markup2mir = markup2mir;
function generateMirSources(markupSources) {
    var mirSources = markupSources.map(function (source) {
        return {
            script: generateMirScript(source.script),
            url: source.url,
            kind: source.kind,
        };
    });
    return mirSources;
}
exports.generateMirSources = generateMirSources;
function generateMirScript(markupScript) {
    var mirScript = markupScript.map(function (operator) {
        var operatorCode = findOperatorCode(operator.selected.label, operator.options.map(function (option) { return option.label; }));
        var args = generateMirArguments(operator, operatorCode);
        var mirOperator = generateMirOperator(operatorCode, args);
        return mirOperator;
    });
    return mirScript;
}
exports.generateMirScript = generateMirScript;
function generateMirOperator(operatorCode, args) {
    if (args) {
        if (args.length === 1) {
            return [operatorCode, args[0]];
        }
        else {
            return [operatorCode, args[0], args[1]];
        }
    }
    else {
        return operatorCode;
    }
}
exports.generateMirOperator = generateMirOperator;
// TODO: Add support for subscripts
function generateMirArguments(operator, operatorCode) {
    var markupArguments = operator.selected.arguments;
    var operatorInfo = structures_1.operatorInfos[operatorCode];
    var args = markupArguments.length
        ? markupArguments.map(function (argument, i) {
            return generateMirArgument(argument, operatorInfo.arguments[i]);
        })
        : null;
    return args;
}
exports.generateMirArguments = generateMirArguments;
function generateMirArgument(argument, argumentInfo) {
    switch (argument.markupType) {
        case types_1.MarkupType.Input:
            // It is assuming that if the argumentInfo specify a type, the value has that type
            return argument.value;
        case types_1.MarkupType.Select:
            if (argumentInfo.type === types_1.MirArgumentKind.Filter) {
                var filterCode = getFilterCode(argument.selected.label);
                var value = argument.selected.arguments[0].value;
                return [filterCode, value];
                // It is MirArgumentKind.Reducer
            }
            else {
                var reducerCode = getReducerCode(argument.selected.label);
                return reducerCode;
            }
    }
}
exports.generateMirArgument = generateMirArgument;
function getFilterCode(name) {
    return types_1.Filter[name];
}
exports.getFilterCode = getFilterCode;
function getReducerCode(name) {
    return types_1.Reducer[name];
}
exports.getReducerCode = getReducerCode;
// TODO: refactor into a map
function findOperatorCode(name, optionNames) {
    if (utils_1.areSoftEqualArrays(optionNames, utils_1.getEnumValues(types_1.BooleanOperatorName))) {
        var operatorCode = structures_1.typeSystem[types_1.Type.Boolean][name][0];
        return operatorCode;
    }
    else if (utils_1.areSoftEqualArrays(optionNames, utils_1.getEnumValues(types_1.IntegerOperatorName))) {
        var operatorCode = structures_1.typeSystem[types_1.Type.Integer][name][0];
        return operatorCode;
    }
    else if (utils_1.areSoftEqualArrays(optionNames, utils_1.getEnumValues(types_1.FloatOperatorName))) {
        var operatorCode = structures_1.typeSystem[types_1.Type.Float][name][0];
        return operatorCode;
    }
    else if (utils_1.areSoftEqualArrays(optionNames, utils_1.getEnumValues(types_1.StringOperatorName))) {
        var operatorCode = structures_1.typeSystem[types_1.Type.String][name][0];
        return operatorCode;
    }
    else if (utils_1.areSoftEqualArrays(optionNames, utils_1.getEnumValues(types_1.ArrayOperatorName))) {
        var operatorCode = structures_1.typeSystem[types_1.Type.Array][name][0];
        return operatorCode;
    }
    else if (utils_1.areSoftEqualArrays(optionNames, utils_1.getEnumValues(types_1.MapOperatorName))) {
        var operatorCode = structures_1.typeSystem[types_1.Type.Map][name][0];
        return operatorCode;
    }
    else if (utils_1.areSoftEqualArrays(optionNames, utils_1.getEnumValues(types_1.BytesOperatorName))) {
        var operatorCode = structures_1.typeSystem[types_1.Type.Bytes][name][0];
        return operatorCode;
    }
    else {
        // It is Result type
        var operatorCode = structures_1.typeSystem[types_1.Type.Result][name][0];
        return operatorCode;
    }
}
exports.findOperatorCode = findOperatorCode;
