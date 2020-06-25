"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringType = exports.isMapType = exports.isIntegerType = exports.isFloatType = exports.isBytesType = exports.isBooleanType = exports.isArrayType = exports.getMirOperatorInfo = exports.getDefaultMirOperatorByType = exports.getDefaultMirArgumentByType = exports.getArgumentInfoType = exports.getMarkupInputTypeFromArgumentType = exports.getEnumValues = exports.getEnumNames = exports.formatJs = exports.fromOutputTypeToType = exports.areValidConsecutiveOperators = exports.areSoftEqualArrays = void 0;
var prettier_1 = __importDefault(require("prettier"));
var types_1 = require("./types");
var structures_1 = require("./structures");
// check if contains the same elements
function areSoftEqualArrays(arr1, arr2) {
    return (arr1.length === arr2.length &&
        arr1.reduce(function (acc, item) { return (acc ? arr2.includes(item) : false); }, true) &&
        arr2.reduce(function (acc, item) { return (acc ? arr1.includes(item) : false); }, true));
}
exports.areSoftEqualArrays = areSoftEqualArrays;
function areValidConsecutiveOperators(operators, idx) {
    if (operators[idx + 1]) {
        var outputType = operators[idx].operatorInfo.outputType;
        var label_1 = operators[idx + 1].operatorInfo.name;
        var options = structures_1.markupOptions[outputType];
        return !!options.find(function (operatorName) { return operatorName === label_1; });
    }
    else {
        return true;
    }
}
exports.areValidConsecutiveOperators = areValidConsecutiveOperators;
function fromOutputTypeToType(type) {
    if (isArrayType(type)) {
        return types_1.Type.Array;
    }
    else if (isBooleanType(type)) {
        return types_1.Type.Boolean;
    }
    else if (isBytesType(type)) {
        return types_1.Type.Bytes;
    }
    else if (isFloatType(type)) {
        return types_1.Type.Float;
    }
    else if (isIntegerType(type)) {
        return types_1.Type.Integer;
    }
    else if (isMapType(type)) {
        return types_1.Type.Map;
    }
    else if (isStringType(type)) {
        return types_1.Type.String;
    }
    else {
        return null;
    }
}
exports.fromOutputTypeToType = fromOutputTypeToType;
function formatJs(source) {
    return prettier_1.default.format(source, { semi: false, parser: 'babel' });
}
exports.formatJs = formatJs;
function getEnumNames(e) {
    return Object.keys(e).filter(function (key) { return !parseInt(key) && !Number.isInteger(parseInt(key)); });
}
exports.getEnumNames = getEnumNames;
function getEnumValues(e) {
    return Object.values(e);
}
exports.getEnumValues = getEnumValues;
function getMarkupInputTypeFromArgumentType(argumentType) {
    if (argumentType === types_1.MirArgumentType.Float || argumentType === types_1.MirArgumentType.Integer) {
        return types_1.MarkupInputType.Number;
    }
    else if (argumentType === types_1.MirArgumentType.Boolean) {
        return types_1.MarkupInputType.Boolean;
    }
    else {
        return types_1.MarkupInputType.String;
    }
}
exports.getMarkupInputTypeFromArgumentType = getMarkupInputTypeFromArgumentType;
function getArgumentInfoType(info) {
    if (info.type === types_1.MirArgumentType.FilterFunction) {
        return types_1.MarkupArgumentType.SelectFilter;
    }
    else if (info.type === types_1.MirArgumentType.ReducerFunction) {
        return types_1.MarkupArgumentType.SelectReduce;
    }
    else if (info.type === types_1.MirArgumentType.Subscript) {
        return types_1.MarkupArgumentType.Subscript;
    }
    else {
        return types_1.MarkupArgumentType.Input;
    }
}
exports.getArgumentInfoType = getArgumentInfoType;
function getDefaultMirArgumentByType(type) {
    switch (type) {
        case types_1.MirArgumentType.Boolean:
            return true;
        case types_1.MirArgumentType.FilterFunction:
            return [types_1.Filter.lessThan, 0];
        case types_1.MirArgumentType.Float:
            return 0.0;
        case types_1.MirArgumentType.Integer:
            return 0;
        case types_1.MirArgumentType.ReducerFunction:
            return types_1.Reducer.averageMean;
        case types_1.MirArgumentType.String:
            return '';
        case types_1.MirArgumentType.Subscript:
            return '';
    }
}
exports.getDefaultMirArgumentByType = getDefaultMirArgumentByType;
// TODO: Refactor to find the first operator instead of repeat code
function getDefaultMirOperatorByType(type) {
    switch (type) {
        case types_1.Type.Array:
            return types_1.OperatorCode.ArrayCount;
        case types_1.Type.Boolean:
            return [types_1.OperatorCode.BooleanMatch, '', true];
        case types_1.Type.Bytes:
            return types_1.OperatorCode.BytesAsString;
        case types_1.Type.Float:
            return types_1.OperatorCode.FloatAbsolute;
        case types_1.Type.Integer:
            return types_1.OperatorCode.IntegerAbsolute;
        case types_1.Type.Map:
            return types_1.OperatorCode.MapEntries;
        case types_1.Type.String:
            return types_1.OperatorCode.StringAsBoolean;
    }
}
exports.getDefaultMirOperatorByType = getDefaultMirOperatorByType;
function getMirOperatorInfo(operator) {
    return Array.isArray(operator)
        ? {
            code: operator[0],
            args: operator.slice(1),
        }
        : {
            code: operator,
            args: [],
        };
}
exports.getMirOperatorInfo = getMirOperatorInfo;
function isArrayType(type) {
    return type.startsWith('array');
}
exports.isArrayType = isArrayType;
function isBooleanType(type) {
    return type === types_1.OutputType.Boolean;
}
exports.isBooleanType = isBooleanType;
function isBytesType(type) {
    return type === types_1.OutputType.Bytes;
}
exports.isBytesType = isBytesType;
function isFloatType(type) {
    return type === types_1.OutputType.Float;
}
exports.isFloatType = isFloatType;
function isIntegerType(type) {
    return type === types_1.OutputType.Integer;
}
exports.isIntegerType = isIntegerType;
function isMapType(type) {
    return type === types_1.OutputType.Map;
}
exports.isMapType = isMapType;
function isStringType(type) {
    return type === types_1.OutputType.String;
}
exports.isStringType = isStringType;
