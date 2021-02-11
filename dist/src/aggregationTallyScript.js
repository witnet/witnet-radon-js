"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregationTallyScript = void 0;
var types_1 = require("./types");
var aggregationTallyOperatorReducer_1 = require("./aggregationTallyOperatorReducer");
var aggregationTallyOperatorFilter_1 = require("./aggregationTallyOperatorFilter");
var AggregationTallyScript = /** @class */ (function () {
    function AggregationTallyScript(context, script) {
        var _this = this;
        this.scriptId = context.cache.insert(this).id;
        this.mirScript = script;
        this.context = context;
        this.filters = script.filters.map(function (filter) { return new aggregationTallyOperatorFilter_1.AggregationTallyOperatorFilter(context, filter, _this.scriptId); });
        this.reducer = new aggregationTallyOperatorReducer_1.AggregationTallyOperatorReducer(context, script.reducer, this.scriptId);
    }
    AggregationTallyScript.prototype.addOperator = function () {
        this.filters.push(new aggregationTallyOperatorFilter_1.AggregationTallyOperatorFilter(this.context, [types_1.AggregationTallyFilter.deviationStandard, 1], this.scriptId));
    };
    // Remove the filter from the filter's list by id
    AggregationTallyScript.prototype.deleteOperator = function (operatorId) {
        var operatorIndex = this.findIdx(operatorId);
        this.filters.splice(operatorIndex, 1);
    };
    AggregationTallyScript.prototype.getJs = function (stage) {
        var variableName = stage;
        var className = stage;
        var filters = this.filters.map(function (filter) { return filter.getJs(); }).join('\n');
        var reducer = this.reducer.getJs();
        return "const " + variableName + " = new Witnet." + className + "({\n        filters: [\n          " + filters + "\n        ],\n          reducer: " + reducer + ",\n        })";
    };
    AggregationTallyScript.prototype.getMir = function () {
        return {
            filters: this.filters.map(function (operator) { return operator.getMir(); }),
            reducer: this.reducer.getMir(),
        };
    };
    AggregationTallyScript.prototype.getMarkup = function () {
        return {
            filters: this.filters.map(function (operator) {
                return operator.getMarkup();
            }),
            reducer: this.reducer.getMarkup(),
        };
    };
    AggregationTallyScript.prototype.findIdx = function (filterId) {
        return this.filters.findIndex(function (x) { return filterId === x.id; });
    };
    AggregationTallyScript.prototype.push = function (filter) {
        this.filters.push(new aggregationTallyOperatorFilter_1.AggregationTallyOperatorFilter(this.context, filter, this.scriptId));
    };
    return AggregationTallyScript;
}());
exports.AggregationTallyScript = AggregationTallyScript;
