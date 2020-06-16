"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregationTallyOperatorFilter = void 0;
var types_1 = require("./types");
var structures_1 = require("./structures");
var aggregationTallyFilterArgument_1 = require("./aggregationTallyFilterArgument");
var AggregationTallyOperatorFilter = /** @class */ (function () {
    function AggregationTallyOperatorFilter(cache, operator, scriptId) {
        this.id = cache.insert(this).id;
        this.default = !operator;
        this.cache = cache;
        this.code = Array.isArray(operator) ? operator[0] : operator;
        this.argument = Array.isArray(operator)
            ? new aggregationTallyFilterArgument_1.AggregationTallyFilterArgument(cache, operator[1])
            : null;
        this.scriptId = scriptId;
    }
    AggregationTallyOperatorFilter.prototype.getMarkup = function () {
        var _a;
        var args = this.code === types_1.AggregationTallyFilter.mode
            ? []
            : [this.argument.getMarkup()];
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Operator,
            id: this.id,
            label: types_1.AggregationTallyFilter[this.code],
            markupType: types_1.MarkupType.Select,
            options: structures_1.aTFilterMarkupOptions(),
            outputType: types_1.OutputType.FilterOutput,
            scriptId: this.scriptId,
            selected: {
                arguments: args,
                hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
                label: types_1.AggregationTallyFilter[this.code],
                markupType: types_1.MarkupType.Option,
                outputType: types_1.OutputType.FilterOutput,
                description: structures_1.aggregationTallyFilterDescriptions === null || structures_1.aggregationTallyFilterDescriptions === void 0 ? void 0 : structures_1.aggregationTallyFilterDescriptions[this.code]((_a = args === null || args === void 0 ? void 0 : args[0]) === null || _a === void 0 ? void 0 : _a.label),
            },
        };
    };
    AggregationTallyOperatorFilter.prototype.getMir = function () {
        return this.code === types_1.AggregationTallyFilter.mode
            ? this.code
            : [
                this.code,
                this.argument.getMir(),
            ];
    };
    AggregationTallyOperatorFilter.prototype.update = function (value) {
        // check if the argument type should change
        if (value === types_1.AggregationTallyFilter.mode) {
            this.argument = null;
        }
        else if (!this.argument) {
            this.argument = new aggregationTallyFilterArgument_1.AggregationTallyFilterArgument(this.cache, '');
        }
        this.default = false;
        if (Number.isInteger(value)) {
            this.code = value;
        }
        else {
            this.code = types_1.AggregationTallyFilter[value];
        }
    };
    return AggregationTallyOperatorFilter;
}());
exports.AggregationTallyOperatorFilter = AggregationTallyOperatorFilter;
