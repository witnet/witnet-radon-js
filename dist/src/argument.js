"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReducerArgumentOptions = exports.generateFilterArgumentOptions = exports.Argument = void 0;
var types_1 = require("./types");
var utils_1 = require("./utils");
var script_1 = require("./script");
var Argument = /** @class */ (function () {
    // TODO: find a better way to discriminate whether the argument is a subscript
    function Argument(cache, argumentInfo, argument, subscript) {
        if (subscript === void 0) { subscript = false; }
        this.argumentType = utils_1.getArgumentInfoType(argumentInfo);
        this.id = cache.insert(this).id;
        this.argumentInfo = argumentInfo;
        this.cache = cache;
        this.value = argument;
        this.subscript = subscript;
        if (this.argumentInfo.type === types_1.MirArgumentType.Boolean ||
            this.argumentInfo.type === types_1.MirArgumentType.Float ||
            this.argumentInfo.type === types_1.MirArgumentType.Integer ||
            this.argumentInfo.type === types_1.MirArgumentType.String) {
            this.argument = null;
        }
        else if (this.argumentInfo.type === types_1.MirArgumentType.FilterFunction) {
            if (this.subscript) {
                this.argument = new script_1.Script(this.cache, argument);
            }
            else {
                this.argument = new Argument(this.cache, { name: 'by', optional: false, type: types_1.MirArgumentType.String }, argument[1]);
            }
        }
        else if (this.argumentInfo.type === types_1.MirArgumentType.ReducerFunction) {
            this.argument = new Argument(this.cache, { name: 'by', optional: false, type: types_1.MirArgumentType.String }, argument);
        }
        else if (this.argumentInfo.type === types_1.MirArgumentType.Subscript) {
            this.argument = new script_1.Script(this.cache, argument);
        }
        else {
            this.argument = null;
        }
    }
    Argument.prototype.getJs = function () {
        var type = this.argumentInfo.type;
        if (type === types_1.MirArgumentType.Boolean) {
            return this.value;
        }
        else if (type === types_1.MirArgumentType.FilterFunction) {
            // FIXME: how filter argument is represented
            return JSON.stringify(this.value);
        }
        else if (type === types_1.MirArgumentType.Float) {
            return this.value;
        }
        else if (type === types_1.MirArgumentType.Integer) {
            return this.value;
        }
        else if (type === types_1.MirArgumentType.ReducerFunction) {
            // FIXME: how filter argument is represented
            return types_1.Reducer[this.value];
        }
        else if (type === types_1.MirArgumentType.String) {
            return JSON.stringify(this.value);
        }
        else if (type === types_1.MirArgumentType.Subscript) {
            return "new Script()" + this.argument.getJs();
        }
        else {
            return JSON.stringify(this.value);
        }
    };
    Argument.prototype.getMarkup = function () {
        if (this.argumentType === types_1.MarkupArgumentType.Input) {
            return {
                hierarchicalType: types_1.MarkupHierarchicalType.Argument,
                id: this.id,
                label: this.argumentInfo.name,
                markupType: types_1.MarkupType.Input,
                value: this.value,
                type: utils_1.getMarkupInputTypeFromArgumentType(this.argumentInfo.type),
            };
        }
        else if (this.argumentType === types_1.MarkupArgumentType.SelectFilter && !this.subscript) {
            var args = this.argument ? [this.argument.getMarkup()] : [];
            return {
                hierarchicalType: types_1.MarkupHierarchicalType.Argument,
                id: this.id,
                label: this.argumentInfo.name,
                markupType: types_1.MarkupType.Select,
                options: generateFilterArgumentOptions(),
                outputType: types_1.OutputType.FilterOutput,
                selected: {
                    arguments: args,
                    hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
                    label: generateFilterArgumentOptions()[0].label,
                    outputType: generateFilterArgumentOptions()[0].outputType,
                    markupType: types_1.MarkupType.Option,
                },
            };
        }
        else if (this.argumentType === types_1.MarkupArgumentType.Subscript || this.subscript) {
            return {
                id: this.id,
                label: this.argumentInfo.name,
                markupType: types_1.MarkupType.Script,
                outputType: types_1.OutputType.SubscriptOutput,
                hierarchicalType: types_1.MarkupHierarchicalType.Argument,
                subscript: this.argument.getMarkup(),
            };
        }
        else {
            // TODO: Refactor this ugly code
            return {
                hierarchicalType: types_1.MarkupHierarchicalType.Argument,
                id: this.id,
                label: this.argumentInfo.name,
                markupType: types_1.MarkupType.Select,
                options: generateReducerArgumentOptions(),
                outputType: types_1.OutputType.ReducerOutput,
                selected: {
                    arguments: [],
                    hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
                    label: generateReducerArgumentOptions()[0].label,
                    outputType: generateReducerArgumentOptions()[0].outputType,
                    markupType: types_1.MarkupType.Option,
                },
            };
        }
    };
    Argument.prototype.getMir = function () {
        if (this.argumentType === types_1.MarkupArgumentType.SelectFilter) {
            return [
                this.value[0],
                this.argument.getMir(),
            ];
        }
        else if (this.argumentType === types_1.MarkupArgumentType.Subscript) {
            return this.argument.getMir();
        }
        else {
            return this.value;
        }
    };
    Argument.prototype.update = function (value) {
        if (this.argumentType === types_1.MarkupArgumentType.SelectFilter) {
            ;
            this.value[0] = types_1.Filter[value];
        }
        else {
            this.value = value;
        }
    };
    return Argument;
}());
exports.Argument = Argument;
function generateFilterArgumentOptions() {
    var markupOptions = utils_1.getEnumNames(types_1.Filter).map(function (name) {
        return {
            label: name,
            hierarchicalType: types_1.MarkupHierarchicalType.OperatorOption,
            markupType: types_1.MarkupType.Option,
            outputType: types_1.OutputType.FilterOutput,
        };
    });
    return markupOptions;
}
exports.generateFilterArgumentOptions = generateFilterArgumentOptions;
function generateReducerArgumentOptions() {
    var markupOptions = utils_1.getEnumNames(types_1.Reducer).map(function (name) {
        return {
            label: name,
            hierarchicalType: types_1.MarkupHierarchicalType.OperatorOption,
            markupType: types_1.MarkupType.Option,
            outputType: types_1.OutputType.ReducerOutput,
        };
    });
    return markupOptions;
}
exports.generateReducerArgumentOptions = generateReducerArgumentOptions;