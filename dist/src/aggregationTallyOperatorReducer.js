"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregationTallyOperatorReducer = void 0;
var types_1 = require("./types");
var structures_1 = require("./structures");
var AggregationTallyOperatorReducer = /** @class */ (function () {
    function AggregationTallyOperatorReducer(cache, operator, scriptId) {
        if (operator === void 0) { operator = types_1.AggregationTallyReducer.averageMean; }
        this.id = cache.insert(this).id;
        this.cache = cache;
        this.code = operator;
        this.scriptId = scriptId;
        this.label = types_1.AggregationTallyReducer[this.code];
    }
    AggregationTallyOperatorReducer.prototype.getJs = function () {
        var reducerName = this.label;
        return "Witnet.Types.REDUCERS." + reducerName;
    };
    AggregationTallyOperatorReducer.prototype.getMarkup = function () {
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Operator,
            id: this.id,
            label: this.label,
            markupType: types_1.MarkupType.Select,
            options: structures_1.aTReducerMarkupOptions(),
            outputType: types_1.OutputType.FilterOutput,
            scriptId: this.scriptId,
            selected: {
                arguments: [],
                hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
                label: this.label,
                markupType: types_1.MarkupType.Option,
                outputType: types_1.OutputType.ReducerOutput,
                description: structures_1.aggregationTallyReducerDescriptions === null || structures_1.aggregationTallyReducerDescriptions === void 0 ? void 0 : structures_1.aggregationTallyReducerDescriptions[this.code](),
            },
        };
    };
    AggregationTallyOperatorReducer.prototype.getMir = function () {
        return this.code;
    };
    AggregationTallyOperatorReducer.prototype.update = function (value) {
        if (Number.isInteger(value)) {
            this.code = value;
        }
        else {
            this.code = types_1.AggregationTallyReducer[value];
        }
    };
    return AggregationTallyOperatorReducer;
}());
exports.AggregationTallyOperatorReducer = AggregationTallyOperatorReducer;
