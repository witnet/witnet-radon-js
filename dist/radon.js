"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var structures_1 = require("./structures");
var utils_1 = require("./utils");
exports.DEFAULT_OPERATOR = types_1.OperatorCode.ArrayCount;
exports.DEFAULT_INPUT_TYPE = types_1.OutputType.Array;
exports.DEFAULT_SCRIPT_FIRST_TYPE = types_1.OutputType.String;
var EventName;
(function (EventName) {
    EventName[EventName["Update"] = 0] = "Update";
})(EventName || (EventName = {}));
var Radon = /** @class */ (function () {
    function Radon(radRequest) {
        var _this = this;
        this.cache = new structures_1.Cache();
        this.timelock = radRequest.timelock;
        this.retrieve = radRequest.retrieve.map(function (source) { return new Source(_this.cache, source); });
        this.aggregate = new AggregationTallyScript(this.cache, radRequest.aggregate);
        this.tally = new AggregationTallyScript(this.cache, radRequest.tally);
    }
    Radon.prototype.getMir = function () {
        return {
            timelock: this.timelock,
            retrieve: this.retrieve.map(function (source) { return source.getMir(); }),
            aggregate: this.aggregate.getMir(),
            tally: this.tally.getMir(),
        };
    };
    Radon.prototype.getMarkup = function () {
        return {
            timelock: this.timelock,
            retrieve: this.retrieve.map(function (source) { return source.getMarkup(); }),
            aggregate: this.aggregate.getMarkup(),
            tally: this.tally.getMarkup(),
        };
    };
    Radon.prototype.updateSource = function (sourceIndex, args) {
        this.retrieve[sourceIndex].update(args);
    };
    Radon.prototype.deleteSource = function (sourceIndex) {
        this.retrieve.splice(sourceIndex, 1);
    };
    // TODO: Remove any
    Radon.prototype.update = function (id, value) {
        ;
        this.cache.get(id).update(value);
    };
    Radon.prototype.addOperator = function (scriptId) {
        ;
        this.cache.get(scriptId).addOperator();
    };
    Radon.prototype.deleteOperator = function (scriptId, operatorId) {
        ;
        this.cache.get(scriptId).deleteOperator(operatorId);
    };
    Radon.prototype.addSource = function () {
        this.retrieve.push(new Source(this.cache, { url: '', script: [types_1.OperatorCode.StringAsFloat], kind: 'HTTP-GET' }));
    };
    return Radon;
}());
exports.Radon = Radon;
var Source = /** @class */ (function () {
    function Source(cache, source) {
        this.id = cache.insert(this).id;
        this.cache = cache;
        this.kind = source.kind;
        this.url = source.url;
        this.script = new Script(cache, source.script, types_1.OutputType.String);
    }
    Source.prototype.update = function (args) {
        var _a = args.kind, kind = _a === void 0 ? this.kind : _a, _b = args.url, url = _b === void 0 ? this.url : _b;
        this.kind = kind;
        this.url = url;
    };
    Source.prototype.getMir = function () {
        return {
            kind: this.kind,
            url: this.url,
            script: this.script.getMir(),
        };
    };
    Source.prototype.getMarkup = function () {
        return {
            kind: this.kind,
            url: this.url,
            script: this.script.getMarkup(),
            scriptId: this.script.scriptId,
        };
    };
    Source.prototype.getOutputType = function () {
        return this.script.getOutputType();
    };
    return Source;
}());
exports.Source = Source;
var AggregationTallyScript = /** @class */ (function () {
    function AggregationTallyScript(cache, script) {
        var _this = this;
        this.scriptId = cache.insert(this).id;
        this.mirScript = script;
        this.cache = cache;
        this.filters = script.filters.map(function (filter) { return new AggregationTallyOperatorFilter(cache, filter, _this.scriptId); });
        this.reducer = new AggregationTallyOperatorReducer(cache, script.reducer, this.scriptId);
    }
    AggregationTallyScript.prototype.addOperator = function () {
        this.filters.push(new AggregationTallyOperatorFilter(this.cache, [types_1.AggregationTallyFilter.deviationAbsolute, 1], this.scriptId));
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
    AggregationTallyScript.prototype.push = function (filter) {
        this.filters.push(new AggregationTallyOperatorFilter(this.cache, filter, this.scriptId));
    };
    return AggregationTallyScript;
}());
exports.AggregationTallyScript = AggregationTallyScript;
var AggregationTallyOperatorFilter = /** @class */ (function () {
    function AggregationTallyOperatorFilter(cache, operator, scriptId) {
        this.id = cache.insert(this).id;
        this.default = !operator;
        this.cache = cache;
        this.code = Array.isArray(operator) ? operator[0] : operator;
        this.argument = Array.isArray(operator)
            ? new AggregationTallyFilterArgument(cache, operator[1])
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
            options: structures_1.aTFilterMarkupOptions,
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
            this.argument = new AggregationTallyFilterArgument(this.cache, '');
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
var AggregationTallyOperatorReducer = /** @class */ (function () {
    function AggregationTallyOperatorReducer(cache, operator, scriptId) {
        if (operator === void 0) { operator = types_1.AggregationTallyReducer.averageMean; }
        this.id = cache.insert(this).id;
        this.cache = cache;
        this.code = operator;
        this.scriptId = scriptId;
    }
    AggregationTallyOperatorReducer.prototype.getMarkup = function () {
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Operator,
            id: this.id,
            label: types_1.AggregationTallyReducer[this.code],
            markupType: types_1.MarkupType.Select,
            options: structures_1.aTReducerMarkupOptions,
            outputType: types_1.OutputType.FilterOutput,
            scriptId: this.scriptId,
            selected: {
                arguments: [],
                hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
                label: types_1.AggregationTallyReducer[this.code],
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
var Script = /** @class */ (function () {
    function Script(cache, script, firstType) {
        var _this = this;
        if (firstType === void 0) { firstType = exports.DEFAULT_SCRIPT_FIRST_TYPE; }
        this.cache = cache;
        this.operators = [];
        this.firstType = firstType;
        this.scriptId = cache.insert(this).id;
        // TODO: Refactor
        script.reduce(function (acc, item) {
            var op = new Operator(cache, _this.scriptId, acc, item, _this.onChildrenEvent());
            _this.operators.push(op);
            // If the `outputType` is `same` (a pseudo-type), return the input type
            // so the available methods can be guessed correctly.
            if (op.operatorInfo.outputType === 'same') {
                return acc;
            }
            else {
                return op.operatorInfo.outputType;
            }
        }, firstType);
    }
    Script.prototype.addOperator = function () {
        var lastOutputType = this.getOutputType();
        var type = fromOutputTypeToType(lastOutputType);
        if (type) {
            var operator = getDefaultMirOperatorByType(type);
            this.operators.push(new Operator(this.cache, this.scriptId, lastOutputType, operator, this.onChildrenEvent()));
        }
        else {
            // TODO: search in operators the type for the regarding types:
            // SubscriptOutput, ReducerOutput, FilterOutput, MatchOutput, Same, Inner
            this.operators.push(new Operator(this.cache, this.scriptId, lastOutputType, null, this.onChildrenEvent()));
        }
    };
    Script.prototype.findIdx = function (operatorId) {
        return this.operators.findIndex(function (x) { return operatorId === x.id; });
    };
    Script.prototype.deleteOperator = function (operatorId) {
        var operatorIndex = this.findIdx(operatorId);
        this.operators.splice(operatorIndex, 1);
        this.validateScript(operatorIndex);
    };
    Script.prototype.getMir = function () {
        return this.operators.map(function (operator) { return operator.getMir(); });
    };
    Script.prototype.onChildrenEvent = function () {
        var _this = this;
        return {
            emit: function (e) {
                if (e.name === EventName.Update) {
                    // TODO: create a method in Script to retrieve the index of an operator by operator ID
                    var index = _this.findIdx(e.data.operator.id);
                    _this.validateScript(index);
                }
            },
        };
    };
    Script.prototype.getLastOperator = function () {
        return this.operators.length ? this.operators[this.operators.length - 1] : null;
    };
    Script.prototype.getMarkup = function () {
        return this.operators.map(function (operator) {
            return operator.getMarkup();
        });
    };
    Script.prototype.getOutputType = function () {
        var lastOperator = this.getLastOperator();
        return lastOperator ? lastOperator.operatorInfo.outputType : this.firstType;
    };
    Script.prototype.push = function (operator) {
        this.operators.push(new Operator(this.cache, this.scriptId, this.getOutputType(), operator, this.onChildrenEvent()));
    };
    // TODO: Refactor this function to be readable
    Script.prototype.validateScript = function (index) {
        var _this = this;
        var removeInvalidOperators = function (idx) {
            _this.operators.splice(idx);
        };
        if (index && this.operators[index + 1]) {
            if (!areValidConsecutiveOperators(this.operators, index)) {
                removeInvalidOperators(index);
            }
        }
        else if (!index) {
            index = this.operators.reduce(function (acc, _operator, i) {
                return acc > 0 ? acc : areValidConsecutiveOperators(_this.operators, i) ? -1 : i;
            }, -1);
            if (index > 0) {
                removeInvalidOperators(index);
            }
        }
    };
    return Script;
}());
exports.Script = Script;
var Operator = /** @class */ (function () {
    function Operator(cache, scriptId, inputType, operator, eventEmitter) {
        var _this = this;
        var _a = getMirOperatorInfo(operator || exports.DEFAULT_OPERATOR), code = _a.code, args = _a.args;
        this.eventEmitter = eventEmitter;
        this.id = cache.insert(this).id;
        this.default = !operator;
        this.cache = cache;
        this.code = code;
        this.operatorInfo = structures_1.operatorInfos[code];
        this.mirArguments = args;
        this.inputType = inputType || exports.DEFAULT_INPUT_TYPE;
        this.arguments = args.map(function (x, index) { return new Argument(cache, _this.operatorInfo.arguments[index], x); });
        this.scriptId = scriptId;
    }
    Operator.prototype.getMarkup = function () {
        var _a, _b, _c, _d;
        var args = this.arguments.map(function (argument) { return argument.getMarkup(); });
        return {
            hierarchicalType: types_1.MarkupHierarchicalType.Operator,
            id: this.id,
            label: this.operatorInfo.name,
            markupType: types_1.MarkupType.Select,
            options: this.default ? structures_1.allMarkupOptions : structures_1.markupOptions[this.inputType],
            outputType: this.operatorInfo.outputType,
            scriptId: this.scriptId,
            selected: {
                arguments: args,
                hierarchicalType: types_1.MarkupHierarchicalType.SelectedOperatorOption,
                label: this.operatorInfo.name,
                markupType: types_1.MarkupType.Option,
                outputType: this.operatorInfo.outputType,
                description: this.operatorInfo.description((_b = (_a = this.arguments) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value, (_d = (_c = this.arguments) === null || _c === void 0 ? void 0 : _c[1]) === null || _d === void 0 ? void 0 : _d.value),
            },
        };
    };
    Operator.prototype.getMir = function () {
        return this.operatorInfo.arguments.length
            ? __spread([this.code], this.arguments.map(function (argument) { return argument.getMir(); }))
            : this.code;
    };
    Operator.prototype.update = function (value) {
        var _this = this;
        // check if is updating by operatorCode or OperatorName
        var operatorCode = (parseInt(value)
            ? value
            : utils_1.getOperatorCodeFromOperatorName(value));
        var operatorInfo = structures_1.operatorInfos[operatorCode];
        var defaultOperatorArguments = operatorInfo.arguments.map(function (argument) {
            return getDefaultMirArgumentByType(argument.type);
        });
        this.default = false;
        this.code = operatorCode;
        this.operatorInfo = operatorInfo;
        this.mirArguments = defaultOperatorArguments;
        this.arguments = defaultOperatorArguments.map(function (x, index) { return new Argument(_this.cache, _this.operatorInfo.arguments[index], x); });
        this.eventEmitter.emit({
            name: EventName.Update,
            data: { operator: { id: this.id, scriptId: this.scriptId } },
        });
    };
    return Operator;
}());
exports.Operator = Operator;
var Argument = /** @class */ (function () {
    // TODO: find a better way to discriminate whether the argument is a subscript
    function Argument(cache, argumentInfo, argument, subscript) {
        if (subscript === void 0) { subscript = false; }
        this.argumentType = getArgumentInfoType(argumentInfo);
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
                this.argument = new Script(this.cache, argument);
            }
            else {
                this.argument = new Argument(this.cache, { name: 'by', optional: false, type: types_1.MirArgumentType.String }, argument[1]);
            }
        }
        else if (this.argumentInfo.type === types_1.MirArgumentType.ReducerFunction) {
            this.argument = new Argument(this.cache, { name: 'by', optional: false, type: types_1.MirArgumentType.String }, argument);
        }
        else if (this.argumentInfo.type === types_1.MirArgumentType.Subscript) {
            this.argument = new Script(this.cache, argument);
        }
        else {
            this.argument = null;
        }
    }
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
function isArrayType(type) {
    return type.startsWith('array');
}
function isBooleanType(type) {
    return type === types_1.OutputType.Boolean;
}
function isBytesType(type) {
    return type === types_1.OutputType.Bytes;
}
function isFloatType(type) {
    return type === types_1.OutputType.Float;
}
function isIntegerType(type) {
    return type === types_1.OutputType.Integer;
}
function isMapType(type) {
    return type === types_1.OutputType.Map;
}
function isStringType(type) {
    return type === types_1.OutputType.String;
}
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
