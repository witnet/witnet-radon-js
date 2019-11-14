"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var types_1 = require("./types");
var structures_1 = require("./structures");
var markup2mir_1 = require("./markup2mir");
var filterArgumentOptions = generateFilterArgumentOptions();
var reducerArgumentOptions = generateReducerArgumentOptions();
// TODO: Create factory functions to remove code repetition
var Radon = /** @class */ (function () {
    function Radon(mir) {
        var defaultRequest = {
            description: '',
            name: '',
            radRequest: {
                notBefore: 0,
                retrieve: [
                    {
                        script: [],
                        url: '',
                    },
                ],
                aggregate: [],
                tally: [],
            },
        };
        this.cache = new structures_1.Cache();
        this.cachedMarkup = mir ? this.mir2markup(mir) : defaultRequest;
    }
    Radon.prototype.wrapResultInCache = function (result) {
        return this.cache.set(result);
    };
    Radon.prototype.unwrapResultFromCache = function (ref) {
        return this.cache.get(ref.id);
    };
    Radon.prototype.mir2markup = function (mir) {
        var _this = this;
        var aggregateScript = this.generateMarkupScript(mir.radRequest.aggregate);
        var tallyScript = this.generateMarkupScript(mir.radRequest.tally);
        var radRequest = {
            notBefore: mir.radRequest.notBefore,
            retrieve: mir.radRequest.retrieve.map(function (source) {
                var generatedMarkupScript = _this.generateMarkupScript(source.script);
                return {
                    url: source.url,
                    script: generatedMarkupScript,
                };
            }),
            aggregate: aggregateScript,
            tally: tallyScript,
        };
        this.cachedMarkup = {
            name: mir.name,
            description: mir.description,
            radRequest: radRequest,
        };
        return this.cachedMarkup;
    };
    Radon.prototype.getMir = function () {
        return markup2mir_1.markup2mir(this.getMarkup());
    };
    Radon.prototype.getMarkup = function () {
        var _this = this;
        var cachedRadRequest = this.cachedMarkup.radRequest;
        var radRequest = {
            notBefore: cachedRadRequest.notBefore,
            retrieve: cachedRadRequest.aggregate.map(function (source) { return _this.unwrapSource(source); }),
            aggregate: this.unwrapScript(cachedRadRequest.aggregate),
            tally: this.unwrapScript(cachedRadRequest.tally),
        };
        return {
            description: this.cachedMarkup.description,
            name: this.cachedMarkup.name,
            radRequest: radRequest,
        };
    };
    Radon.prototype.generateMarkupScript = function (script) {
        var _this = this;
        var markupScript = script.map(function (operator) {
            return _this.wrapResultInCache(_this.generateMarkupOperator(operator));
        });
        return markupScript;
    };
    Radon.prototype.generateMarkupOperator = function (operator) {
        var _a = this.getMirOperatorInfo(operator), code = _a.code, args = _a.args;
        var operatorInfo = structures_1.operatorInfos[code];
        var outputType = this.findOutputType(code);
        var markupOperator = {
            id: 0,
            scriptId: 0,
            markupType: types_1.MarkupType.Select,
            hierarchicalType: types_1.MarkupHierarchicalType.Operator,
            outputType: outputType,
            selected: this.wrapResultInCache(this.generateSelectedOption(operatorInfo, code, args)),
            options: this.generateMarkupOptions(operatorInfo, code, args),
        };
        return markupOperator;
    };
    Radon.prototype.generateSelectedOption = function (operatorInfo, code, args) {
        var outputType = this.findOutputType(code);
        var markupSelectedOption = {
            arguments: args && args.length ? this.generateOperatorArguments(operatorInfo, args) : [],
            hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
            label: operatorInfo.name,
            markupType: types_1.MarkupType.Option,
            // TODO: Add support for pseudotypes
            outputType: outputType,
        };
        return markupSelectedOption;
    };
    Radon.prototype.generateOperatorArguments = function (operatorInfo, args) {
        var _this = this;
        var operatorArguments = args.map(function (argument, index) {
            var argumentInfo = operatorInfo.arguments[index];
            switch (argumentInfo.type) {
                // TODO: Add support for pseudotypes
                case types_1.MirArgumentKind.Array:
                case types_1.MirArgumentKind.Boolean:
                case types_1.MirArgumentKind.Bytes:
                case types_1.MirArgumentKind.Mapper:
                case types_1.MirArgumentKind.Passthrough:
                case types_1.MirArgumentKind.Result:
                case types_1.MirArgumentKind.Float:
                case types_1.MirArgumentKind.Inner:
                case types_1.MirArgumentKind.Integer:
                case types_1.MirArgumentKind.Map:
                case types_1.MirArgumentKind.String:
                    return _this.wrapResultInCache(_this.generateInputArgument(argument));
                case types_1.MirArgumentKind.Filter:
                    return _this.wrapResultInCache(_this.generateFilterArgument(argumentInfo.name, argument));
                case types_1.MirArgumentKind.Reducer:
                    return _this.wrapResultInCache(_this.generateReducerArgument(argumentInfo.name, argument));
            }
        });
        return operatorArguments;
    };
    Radon.prototype.generateInputArgument = function (value) {
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Argument,
            id: 0,
            label: 'by',
            markupType: types_1.MarkupType.Input,
            value: value,
        };
    };
    Radon.prototype.generateFilterArgument = function (label, filter) {
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Argument,
            id: 0,
            markupType: types_1.MarkupType.Select,
            options: filterArgumentOptions,
            scriptId: 0,
            label: label,
            selected: this.wrapResultInCache(this.generateSelectedFilterArgument(filter)),
        };
    };
    Radon.prototype.generateReducerArgument = function (label, reducer) {
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Argument,
            id: 0,
            markupType: types_1.MarkupType.Select,
            options: reducerArgumentOptions,
            outputType: types_1.OutputType.Bytes,
            scriptId: 0,
            label: label,
            selected: this.wrapResultInCache(this.generateSelectedReducerArgument(reducer)),
        };
    };
    Radon.prototype.generateSelectedFilterArgument = function (filterArgument) {
        var filter = filterArgument[0];
        var argument = filterArgument[1];
        var selectedArgument = {
            arguments: [this.wrapResultInCache(this.generateInputArgument(argument))],
            label: types_1.Filter[filter],
            hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
            markupType: types_1.MarkupType.Option,
            outputType: types_1.OutputType.Bytes,
        };
        return selectedArgument;
    };
    Radon.prototype.generateSelectedReducerArgument = function (reducer) {
        var selectedArgument = {
            arguments: [],
            label: types_1.Reducer[reducer],
            hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
            markupType: types_1.MarkupType.Option,
            outputType: types_1.OutputType.Bytes,
        };
        return selectedArgument;
    };
    // TODO: Remove unknown to have a stronger type
    Radon.prototype.unwrapSource = function (source) {
        var cachedMarkupSource = this.unwrapResultFromCache(source);
        var markupSource = {
            url: cachedMarkupSource.url,
            script: this.unwrapScript(cachedMarkupSource.script),
        };
        return markupSource;
    };
    Radon.prototype.unwrapScript = function (script) {
        var _this = this;
        var markupScript = script.map(function (operatorRef) {
            var cachedOperator = _this.unwrapResultFromCache(operatorRef);
            var operator = _this.unwrapOperator(cachedOperator, operatorRef.id);
            return operator;
        });
        return markupScript;
    };
    Radon.prototype.unwrapOperator = function (operator, id) {
        var markup = {
            hierarchicalType: operator.hierarchicalType,
            id: id,
            label: operator.label,
            markupType: operator.markupType,
            options: operator.options,
            outputType: operator.outputType,
            scriptId: operator.scriptId,
            selected: this.unwrapSelectedOption(operator.selected),
        };
        return markup;
    };
    Radon.prototype.unwrapSelectedOption = function (selectedOption) {
        var _this = this;
        var cachedSelectedOption = this.unwrapResultFromCache(selectedOption);
        var markup = {
            arguments: cachedSelectedOption.arguments.length
                ? cachedSelectedOption.arguments.map(function (argument) {
                    return _this.unwrapArgument(argument);
                })
                : [],
            hierarchicalType: cachedSelectedOption.hierarchicalType,
            label: cachedSelectedOption.label,
            markupType: cachedSelectedOption.markupType,
            outputType: cachedSelectedOption.outputType,
        };
        return markup;
    };
    Radon.prototype.unwrapArgument = function (arg) {
        var cachedArgument = this.unwrapResultFromCache(arg);
        switch (cachedArgument.markupType) {
            case types_1.MarkupType.Input:
                return {
                    hierarchicalType: cachedArgument.hierarchicalType,
                    id: arg.id,
                    label: cachedArgument.label,
                    markupType: cachedArgument.markupType,
                    value: cachedArgument.value,
                };
            case types_1.MarkupType.Select:
                return {
                    hierarchicalType: cachedArgument.hierarchicalType,
                    id: arg.id,
                    label: cachedArgument.label,
                    markupType: cachedArgument.markupType,
                    options: cachedArgument.options,
                    outputType: cachedArgument.outputType,
                    scriptId: cachedArgument.scriptId,
                    selected: this.unwrapSelectedOption(cachedArgument.selected),
                };
        }
    };
    Radon.prototype.findOutputType = function (code) {
        var entry = Object.entries(structures_1.typeSystem).find(function (entry) {
            return Object.values(entry[1]).find(function (x) { return x[0] === code; });
        });
        var operatorEntry = Object.values(entry[1]).find(function (x) { return x[0] === code; });
        var outputType = operatorEntry[1];
        return outputType.length > 1 ? outputType : outputType[0];
    };
    Radon.prototype.getMirOperatorInfo = function (operator) {
        return Array.isArray(operator)
            ? {
                code: operator[0],
                args: operator.slice(1),
            }
            : {
                code: operator,
                args: null,
            };
    };
    Radon.prototype.generateMarkupOptions = function (operatorInfo, _code, _args) {
        var markupOptions = Object.entries(structures_1.typeSystem[operatorInfo.type]).map(function (x) {
            return {
                hierarchicalType: types_1.MarkupHierarchicalType.OperatorOption,
                label: x[0],
                markupType: types_1.MarkupType.Option,
                // TODO: Add support for Pseudotypes
                outputType: x[1][1].length > 1 ? x[1][1] : x[1][1][0],
            };
        });
        return markupOptions;
    };
    return Radon;
}());
exports.Radon = Radon;
// TODO: Call this function just at the beginning
function generateFilterArgumentOptions() {
    var markupOptions = utils_1.getEnumNames(types_1.Filter).map(function (name) {
        return {
            label: name,
            hierarchicalType: types_1.MarkupHierarchicalType.OperatorOption,
            markupType: types_1.MarkupType.Option,
            // TODO: Add support for pseudotypes
            outputType: types_1.OutputType.Bytes,
        };
    });
    return markupOptions;
}
// TODO: Call this function just at the beginning
function generateReducerArgumentOptions() {
    var markupOptions = utils_1.getEnumNames(types_1.Reducer).map(function (name) {
        return {
            label: name,
            hierarchicalType: types_1.MarkupHierarchicalType.OperatorOption,
            markupType: types_1.MarkupType.Option,
            outputType: types_1.OutputType.Bytes,
        };
    });
    return markupOptions;
}
