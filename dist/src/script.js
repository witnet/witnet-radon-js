"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Script = void 0;
var types_1 = require("./types");
var operator_1 = require("./operator");
var constants_1 = require("./constants");
var utils_1 = require("./utils");
var Script = /** @class */ (function () {
    function Script(cache, script, firstType) {
        var _this = this;
        if (firstType === void 0) { firstType = constants_1.DEFAULT_SCRIPT_FIRST_TYPE; }
        this.cache = cache;
        this.operators = [];
        this.firstType = firstType;
        this.scriptId = cache.insert(this).id;
        // TODO: Refactor
        script.reduce(function (acc, item) {
            var op = new operator_1.Operator(cache, _this.scriptId, acc, item, _this.onChildrenEvent());
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
        var type = utils_1.fromOutputTypeToType(lastOutputType);
        if (type) {
            var operator = utils_1.getDefaultMirOperatorByType(type);
            this.operators.push(new operator_1.Operator(this.cache, this.scriptId, lastOutputType, operator, this.onChildrenEvent()));
        }
        else {
            // TODO: search in operators the type for the regarding types:
            // SubscriptOutput, ReducerOutput, FilterOutput, MatchOutput, Same, Inner
            this.operators.push(new operator_1.Operator(this.cache, this.scriptId, lastOutputType, null, this.onChildrenEvent()));
        }
    };
    Script.prototype.deleteOperator = function (operatorId) {
        var operatorIndex = this.findIdx(operatorId);
        this.operators.splice(operatorIndex, 1);
        this.validateScript(operatorIndex);
    };
    Script.prototype.findIdx = function (operatorId) {
        return this.operators.findIndex(function (x) { return operatorId === x.id; });
    };
    Script.prototype.getJs = function () {
        var operators = this.operators.map(function (operator) { return operator.getJs(); }).join('\n');
        return operators;
    };
    Script.prototype.getLastOperator = function () {
        return this.operators.length ? this.operators[this.operators.length - 1] : null;
    };
    Script.prototype.getMarkup = function () {
        return this.operators.map(function (operator) {
            return operator.getMarkup();
        });
    };
    Script.prototype.getMir = function () {
        return this.operators.map(function (operator) { return operator.getMir(); });
    };
    Script.prototype.getOutputType = function () {
        return this.getLastOperator() ? this.operators.reduce(function (acc, operator) {
            return operator.operatorInfo.outputType === types_1.OutputType.Same ? acc : operator.operatorInfo.outputType;
        }, this.firstType) : this.firstType;
    };
    Script.prototype.onChildrenEvent = function () {
        var _this = this;
        return {
            emit: function (e) {
                if (e.name === types_1.EventName.Update) {
                    // TODO: create a method in Script to retrieve the index of an operator by operator ID
                    var index = _this.findIdx(e.data.operator.id);
                    _this.validateScript(index);
                }
            },
        };
    };
    Script.prototype.push = function (operator) {
        this.operators.push(new operator_1.Operator(this.cache, this.scriptId, this.getOutputType(), operator, this.onChildrenEvent()));
    };
    // TODO: Refactor this function to be readable
    Script.prototype.validateScript = function (index) {
        var _this = this;
        var removeInvalidOperators = function (idx) {
            _this.operators.splice(idx);
        };
        if (index && this.operators[index + 1]) {
            if (!utils_1.areValidConsecutiveOperators(this.operators, index)) {
                removeInvalidOperators(index);
            }
        }
        else if (!index) {
            index = this.operators.reduce(function (acc, _operator, i) {
                return acc > 0 ? acc : utils_1.areValidConsecutiveOperators(_this.operators, i) ? -1 : i;
            }, -1);
            if (index > 0) {
                removeInvalidOperators(index);
            }
        }
    };
    return Script;
}());
exports.Script = Script;
