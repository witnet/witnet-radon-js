"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function dummyHash(str) {
    var hash = 0;
    var chr;
    if (str.length === 0)
        return hash;
    for (var i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
exports.dummyHash = dummyHash;
