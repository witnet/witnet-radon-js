"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function getLastIndex(state) {
    return {
        getLastIndex: function () { return state.counter + 1; }
    };
}
function get(state) {
    return {
        get: function (cacheId) { return state.cache[cacheId]; }
    };
}
function insert(state) {
    return {
        insert: function (item) {
            var _a;
            state.cache = __assign(__assign({}, state.cache), (_a = {}, _a[++state.counter] = item, _a));
            return { id: state.counter };
        }
    };
}
function set(state) {
    return {
        set: function (id, item) {
            var _a;
            return __assign(__assign({}, state.cache), (_a = {}, _a[id] = item, _a));
        }
    };
}
var Cache = function () {
    var state = {
        cache: {},
        counter: 0,
    };
    return Object.freeze(__assign(__assign(__assign(__assign({}, get(state)), getLastIndex(state)), insert(state)), set(state)));
};
