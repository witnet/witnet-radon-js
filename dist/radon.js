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
        // TODO: Refactor first outputType
        this.aggregate = new Script(this.cache, radRequest.aggregate, types_1.OutputType.Array);
        this.tally = new Script(this.cache, radRequest.tally, this.aggregate.getOutputType());
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
    // TODO: Remove any
    Radon.prototype.update = function (id, value) {
        ;
        this.cache.get(id).update(value);
    };
    Radon.prototype.addOperator = function (scriptId) {
        this.cache.get(scriptId).addOperator();
    };
    Radon.prototype.addSource = function () {
        this.retrieve.push(new Source(this.cache, { url: '', script: [types_1.OperatorCode.StringAsFloat], kind: 'HTTP_GET' }));
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
        };
    };
    Source.prototype.getOutputType = function () {
        return this.script.getOutputType();
    };
    return Source;
}());
exports.Source = Source;
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
            return op.operatorInfo.outputType;
        }, firstType);
    }
    Script.prototype.getMir = function () {
        return this.operators.map(function (operator) { return operator.getMir(); });
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
            index = index
                ? index
                : this.operators.reduce(function (acc, _operator, i) {
                    return acc > 0 ? acc : areValidConsecutiveOperators(_this.operators, i) ? -1 : i;
                }, -1);
            if (index > 0) {
                removeInvalidOperators(index);
            }
        }
    };
    Script.prototype.onChildrenEvent = function () {
        var _this = this;
        return {
            emit: function (e) {
                if (e.name === EventName.Update) {
                    _this.validateScript(e.data.index);
                }
            },
        };
    };
    Script.prototype.getMarkup = function () {
        var markup = this.operators.map(function (operator) {
            return operator.getMarkup();
        });
        // this.cache.set(this.scriptId, markup.map(operator => operator.id))
        return markup;
    };
    Script.prototype.getOutputType = function () {
        var lastOperator = this.getLastOperator();
        return lastOperator ? lastOperator.operatorInfo.outputType : this.firstType;
    };
    Script.prototype.getLastOperator = function () {
        return this.operators.length ? this.operators[this.operators.length - 1] : null;
    };
    Script.prototype.push = function (operator) {
        this.operators.push(new Operator(this.cache, this.scriptId, this.getOutputType(), operator, this.onChildrenEvent()));
    };
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
    Operator.prototype.update = function (args) {
        var _this = this;
        if (args.label || args.code) {
            var operatorCode = args.code
                ? args.code
                : utils_1.getOperatorCodeFromOperatorName(args.label);
            var operatorInfo = structures_1.operatorInfos[operatorCode];
            var defaultOperatorArguments = operatorInfo.arguments.map(function (argument) {
                return getDefaultMirArgumentByType(argument.type);
            });
            this.default = false;
            this.code = operatorCode;
            this.operatorInfo = operatorInfo;
            this.mirArguments = defaultOperatorArguments;
            this.arguments = defaultOperatorArguments.map(function (x, index) { return new Argument(_this.cache, _this.operatorInfo.arguments[index], x); });
            this.eventEmitter.emit(EventName.Update);
        }
        else {
            throw Error('You have to provide argument to update Operator');
        }
    };
    Operator.prototype.getMir = function () {
        return this.operatorInfo.arguments.length
            ? __spread([this.code], this.arguments.map(function (argument) { return argument.getMir(); }))
            : this.code;
    };
    Operator.prototype.getMarkup = function () {
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
            },
        };
    };
    return Operator;
}());
exports.Operator = Operator;
var Argument = /** @class */ (function () {
    function Argument(cache, argumentInfo, argument) {
        this.argumentType = getArgumentInfoType(argumentInfo);
        this.id = cache.insert(this).id;
        this.argumentInfo = argumentInfo;
        this.cache = cache;
        this.value = argument;
        this.argument = Array.isArray(argument)
            ? new Argument(this.cache, { name: 'by', optional: false, type: types_1.MirArgumentType.String }, argument[1])
            : null;
    }
    Argument.prototype.getMir = function () {
        if (this.argumentType === types_1.MarkupArgumentType.SelectFilter) {
            return [
                this.value[0],
                this.argument.getMir(),
            ];
        }
        else {
            return this.value;
        }
    };
    Argument.prototype.update = function (args) {
        if (this.argumentType === types_1.MarkupArgumentType.SelectFilter) {
            ;
            this.value[0] = args.value;
        }
        else {
            this.value = args.value;
        }
    };
    Argument.prototype.getMarkup = function () {
        if (this.argumentType === types_1.MarkupArgumentType.Input) {
            // TODO: Refactor this ugly code
            return {
                hierarchicalType: types_1.MarkupHierarchicalType.Argument,
                id: this.id,
                label: this.argumentInfo.name,
                markupType: types_1.MarkupType.Input,
                value: this.value,
            };
        }
        else if (this.argumentType === types_1.MarkupArgumentType.SelectFilter) {
            var args = this.argument ? [this.argument.getMarkup()] : [];
            // TODO: Refactor this ugly code
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
            // } else if (argumentType === MarkupArgumentType.SelectReduce) {
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
    return Argument;
}());
exports.Argument = Argument;
function areValidConsecutiveOperators(operators, idx) {
    if (operators[idx + 1]) {
        var outputType = operators[idx].operatorInfo.outputType;
        var label_1 = operators[idx + 1].operatorInfo.name;
        var options = structures_1.markupOptions[outputType];
        return !options.find(function (operatorName) { return operatorName === label_1; });
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
            // TODO: Add support for pseudotypes
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
            return [types_1.Filter.LessThan, 0];
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
    return (type === types_1.OutputType.Array ||
        type === types_1.OutputType.ArrayArray ||
        type === types_1.OutputType.ArrayBoolean ||
        type === types_1.OutputType.ArrayBytes ||
        type === types_1.OutputType.ArrayFloat ||
        type === types_1.OutputType.ArrayInteger ||
        type === types_1.OutputType.ArrayMap ||
        type === types_1.OutputType.ArrayString);
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
