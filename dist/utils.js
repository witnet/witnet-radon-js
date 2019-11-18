"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
// check if contains the same elements
function areSoftEqualArrays(arr1, arr2) {
    return (arr1.length === arr2.length &&
        arr1.reduce(function (acc, item) { return (acc ? arr2.includes(item) : false); }, true) &&
        arr2.reduce(function (acc, item) { return (acc ? arr1.includes(item) : false); }, true));
}
exports.areSoftEqualArrays = areSoftEqualArrays;
function getEnumNames(e) {
    return Object.keys(e).filter(function (key) { return !parseInt(key) && !Number.isInteger(parseInt(key)); });
}
exports.getEnumNames = getEnumNames;
function getEnumValues(e) {
    return Object.values(e);
}
exports.getEnumValues = getEnumValues;
function getOperatorCodeFromOperatorName(name) {
    return types_1.OperatorCode[name];
}
exports.getOperatorCodeFromOperatorName = getOperatorCodeFromOperatorName;
