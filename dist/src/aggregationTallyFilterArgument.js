"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregationTallyFilterArgument = void 0;
var types_1 = require("./types");
var AggregationTallyFilterArgument = /** @class */ (function () {
    function AggregationTallyFilterArgument(cache, argument) {
        this.id = cache.insert(this).id;
        this.cache = cache;
        this.value = argument;
    }
    AggregationTallyFilterArgument.prototype.getMarkup = function () {
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Argument,
            id: this.id,
            label: 'by',
            markupType: types_1.MarkupType.Input,
            value: this.value,
        };
    };
    AggregationTallyFilterArgument.prototype.getMir = function () {
        return this.value;
    };
    AggregationTallyFilterArgument.prototype.update = function (value) {
        this.value = value;
    };
    return AggregationTallyFilterArgument;
}());
exports.AggregationTallyFilterArgument = AggregationTallyFilterArgument;
