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
exports.Operator = void 0;
var types_1 = require("./types");
var structures_1 = require("./structures");
var utils_1 = require("./utils");
var argument_1 = require("./argument");
var constants_1 = require("./constants");
var Operator = /** @class */ (function () {
    function Operator(context, scriptId, inputType, operator, eventEmitter) {
        var _this = this;
        var _a = utils_1.getMirOperatorInfo(operator || constants_1.DEFAULT_OPERATOR), code = _a.code, args = _a.args;
        this.eventEmitter = eventEmitter;
        this.id = context.cache.insert(this).id;
        this.default = !operator;
        this.context = context;
        this.code = code;
        this.operatorInfo = structures_1.operatorInfos[code];
        this.mirArguments = args;
        this.inputType = inputType || constants_1.DEFAULT_INPUT_TYPE;
        if (code === types_1.OperatorCode.ArrayFilter && Array.isArray(args[0])) {
            // is array filter operator and contains subscript
            var filterArgumentInfo = {
                name: 'function',
                optional: false,
                type: types_1.MirArgumentType.FilterFunction,
            };
            this.arguments = [
                new argument_1.Argument(context, filterArgumentInfo, [types_1.Filter.custom, args[0]]),
            ];
        }
        else {
            this.arguments = args.map(function (x, index) { return new argument_1.Argument(context, _this.operatorInfo.arguments[index], x); });
        }
        this.scriptId = scriptId;
    }
    Operator.prototype.getJs = function () {
        var operatorName = this.operatorInfo.name;
        var args = this.arguments.map(function (arg) { return arg.getJs(); }).join(',');
        return "." + operatorName + "(" + args + ")";
    };
    Operator.prototype.getMarkup = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var args = this.arguments.map(function (argument) { return argument.getMarkup(); });
        if (this.operatorInfo.name === 'map') {
            console.log('descriptioni', this.operatorInfo);
            console.log('descriptioni', this.operatorInfo.description(this.context.i18n)('', ''));
            console.log('arguments', (_b = (_a = this.arguments) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value, (_d = (_c = this.arguments) === null || _c === void 0 ? void 0 : _c[1]) === null || _d === void 0 ? void 0 : _d.value);
        }
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
                description: this.operatorInfo.description(this.context.i18n)((_f = (_e = this.arguments) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.value, (_h = (_g = this.arguments) === null || _g === void 0 ? void 0 : _g[1]) === null || _h === void 0 ? void 0 : _h.value),
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
        var operatorCode = typeof value === 'number'
            ? value
            : // Use operatorCode as reverse mapping
                types_1.OperatorCode[value];
        var operatorInfo = structures_1.operatorInfos[operatorCode];
        var defaultOperatorArguments = operatorInfo.arguments.map(function (argument) {
            return utils_1.getDefaultMirArgumentByType(argument.type);
        });
        this.default = false;
        this.code = operatorCode;
        this.operatorInfo = operatorInfo;
        this.mirArguments = defaultOperatorArguments;
        this.arguments = defaultOperatorArguments.map(function (x, index) {
            return new argument_1.Argument(_this.context, _this.operatorInfo.arguments[index], x);
        });
        this.eventEmitter.emit({
            name: types_1.EventName.Update,
            data: { operator: { id: this.id, scriptId: this.scriptId } },
        });
    };
    return Operator;
}());
exports.Operator = Operator;
