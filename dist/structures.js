"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var utils_1 = require("./utils");
exports.typeSystem = (_a = {},
    _a[types_1.Type.Boolean] = (_b = {},
        _b[types_1.BooleanOperatorName.AsString] = [types_1.OperatorCode.BooleanAsString, [types_1.OutputType.String]],
        _b[types_1.BooleanOperatorName.Match] = [types_1.OperatorCode.BooleanMatch, [types_1.OutputType.Argument]],
        _b[types_1.BooleanOperatorName.Negate] = [types_1.OperatorCode.BooleanNegate, [types_1.OutputType.Boolean]],
        _b),
    _a[types_1.Type.Integer] = (_c = {},
        _c[types_1.IntegerOperatorName.Absolute] = [types_1.OperatorCode.IntegerAbsolute, [types_1.OutputType.Integer]],
        _c[types_1.IntegerOperatorName.AsBytes] = [types_1.OperatorCode.IntegerAsBytes, [types_1.OutputType.Bytes]],
        _c[types_1.IntegerOperatorName.AsFloat] = [types_1.OperatorCode.IntegerAsFloat, [types_1.OutputType.Float]],
        _c[types_1.IntegerOperatorName.AsString] = [types_1.OperatorCode.IntegerAsString, [types_1.OutputType.String]],
        _c[types_1.IntegerOperatorName.GreaterThan] = [types_1.OperatorCode.IntegerGreaterThan, [types_1.OutputType.Boolean]],
        _c[types_1.IntegerOperatorName.LessThan] = [types_1.OperatorCode.IntegerLessThan, [types_1.OutputType.Boolean]],
        _c[types_1.IntegerOperatorName.Match] = [types_1.OperatorCode.IntegerMatch, [types_1.OutputType.Argument]],
        _c[types_1.IntegerOperatorName.Modulo] = [types_1.OperatorCode.IntegerModulo, [types_1.OutputType.Integer]],
        _c[types_1.IntegerOperatorName.Multiply] = [types_1.OperatorCode.IntegerMultiply, [types_1.OutputType.Integer]],
        _c[types_1.IntegerOperatorName.Negate] = [types_1.OperatorCode.IntegerNegate, [types_1.OutputType.Integer]],
        _c[types_1.IntegerOperatorName.Power] = [types_1.OperatorCode.IntegerPower, [types_1.OutputType.Integer]],
        _c[types_1.IntegerOperatorName.Reciprocal] = [types_1.OperatorCode.IntegerReciprocal, [types_1.OutputType.Float]],
        _c[types_1.IntegerOperatorName.Sum] = [types_1.OperatorCode.IntegerSum, [types_1.OutputType.Integer]],
        _c),
    _a[types_1.Type.Float] = (_d = {},
        _d[types_1.FloatOperatorName.Absolute] = [types_1.OperatorCode.FloatAbsolute, [types_1.OutputType.Integer]],
        _d[types_1.FloatOperatorName.AsBytes] = [types_1.OperatorCode.FloatAsBytes, [types_1.OutputType.Bytes]],
        _d[types_1.FloatOperatorName.AsString] = [types_1.OperatorCode.FloatAsString, [types_1.OutputType.String]],
        _d[types_1.FloatOperatorName.Ceiling] = [types_1.OperatorCode.FloatCeiling, [types_1.OutputType.Integer]],
        _d[types_1.FloatOperatorName.GreaterThan] = [types_1.OperatorCode.FloatGraterThan, [types_1.OutputType.Boolean]],
        _d[types_1.FloatOperatorName.Floor] = [types_1.OperatorCode.FloatFloor, [types_1.OutputType.Integer]],
        _d[types_1.FloatOperatorName.LessThan] = [types_1.OperatorCode.FloatLessThan, [types_1.OutputType.Boolean]],
        _d[types_1.FloatOperatorName.Modulo] = [types_1.OperatorCode.FloatModulo, [types_1.OutputType.Float]],
        _d[types_1.FloatOperatorName.Multiply] = [types_1.OperatorCode.FloatMultiply, [types_1.OutputType.Float]],
        _d[types_1.FloatOperatorName.Negate] = [types_1.OperatorCode.FloatNegate, [types_1.OutputType.Float]],
        _d[types_1.FloatOperatorName.Power] = [types_1.OperatorCode.FloatPower, [types_1.OutputType.Float]],
        _d[types_1.FloatOperatorName.Reciprocal] = [types_1.OperatorCode.FloatReciprocal, [types_1.OutputType.Float]],
        _d[types_1.FloatOperatorName.Round] = [types_1.OperatorCode.FloatRound, [types_1.OutputType.Integer]],
        _d[types_1.FloatOperatorName.Sum] = [types_1.OperatorCode.Floatsum, [types_1.OutputType.Float]],
        _d[types_1.FloatOperatorName.Truncate] = [types_1.OperatorCode.FloatTruncate, [types_1.OutputType.Integer]],
        _d),
    _a[types_1.Type.String] = (_e = {},
        _e[types_1.StringOperatorName.AsBytes] = [types_1.OperatorCode.StringAsBytes, [types_1.OutputType.Bytes]],
        _e[types_1.StringOperatorName.AsFloat] = [types_1.OperatorCode.StringAsFloat, [types_1.OutputType.Float]],
        _e[types_1.StringOperatorName.AsInteger] = [types_1.OperatorCode.StringAsInteger, [types_1.OutputType.Integer]],
        _e[types_1.StringOperatorName.Length] = [types_1.OperatorCode.StringLength, [types_1.OutputType.Integer]],
        _e[types_1.StringOperatorName.Match] = [types_1.OperatorCode.StringMatch, [types_1.OutputType.Argument]],
        _e[types_1.StringOperatorName.ParseJson] = [types_1.OperatorCode.StringParseJson, [types_1.OutputType.Bytes]],
        _e[types_1.StringOperatorName.ParseXml] = [types_1.OperatorCode.StringParseXML, [types_1.OutputType.Map]],
        _e[types_1.StringOperatorName.AsBoolean] = [types_1.OperatorCode.StringAsBoolean, [types_1.OutputType.Boolean]],
        _e[types_1.StringOperatorName.ToLowerCase] = [types_1.OperatorCode.StringToLowerCase, [types_1.OutputType.String]],
        _e[types_1.StringOperatorName.ToUpperCase] = [types_1.OperatorCode.StringToUpperCase, [types_1.OutputType.String]],
        _e),
    _a[types_1.Type.Array] = (_f = {},
        _f[types_1.ArrayOperatorName.AsBytes] = [types_1.OperatorCode.ArrayAsBytes, [types_1.OutputType.Bytes]],
        _f[types_1.ArrayOperatorName.Count] = [types_1.OperatorCode.ArrayCount, [types_1.OutputType.Integer]],
        _f[types_1.ArrayOperatorName.Every] = [types_1.OperatorCode.ArrayEvery, [types_1.OutputType.Boolean]],
        _f[types_1.ArrayOperatorName.Filter] = [types_1.OperatorCode.ArrayFilter, [types_1.OutputType.Inner]],
        _f[types_1.ArrayOperatorName.Flatten] = [types_1.OperatorCode.ArrayFlatten, [types_1.OutputType.Passthrough]],
        _f[types_1.ArrayOperatorName.Get] = [types_1.OperatorCode.ArrayGet, [types_1.OutputType.Inner]],
        _f[types_1.ArrayOperatorName.Map] = [types_1.OperatorCode.ArrayMap, [types_1.OutputType.Argument]],
        _f[types_1.ArrayOperatorName.Reduce] = [types_1.OperatorCode.ArrayReduce, [types_1.OutputType.Inner]],
        _f[types_1.ArrayOperatorName.Some] = [types_1.OperatorCode.ArraySome, [types_1.OutputType.Boolean]],
        _f[types_1.ArrayOperatorName.Sort] = [types_1.OperatorCode.ArraySort, [types_1.OutputType.Inner]],
        _f[types_1.ArrayOperatorName.Take] = [types_1.OperatorCode.ArrayTake, [types_1.OutputType.Inner]],
        _f),
    _a[types_1.Type.Map] = (_g = {},
        _g[types_1.MapOperatorName.Entries] = [types_1.OperatorCode.MapEntries, [types_1.OutputType.Bytes]],
        _g[types_1.MapOperatorName.Get] = [types_1.OperatorCode.MapGet, [types_1.OutputType.Inner]],
        _g[types_1.MapOperatorName.Keys] = [types_1.OperatorCode.MapKeys, [types_1.OutputType.String]],
        _g[types_1.MapOperatorName.Values] = [types_1.OperatorCode.MapValues, [types_1.OutputType.Inner]],
        _g),
    _a[types_1.Type.Bytes] = (_h = {},
        _h[types_1.BytesOperatorName.AsArray] = [types_1.OperatorCode.BytesAsArray, [types_1.OutputType.Bytes]],
        _h[types_1.BytesOperatorName.AsBoolean] = [types_1.OperatorCode.BytesAsBoolean, [types_1.OutputType.Boolean]],
        _h[types_1.BytesOperatorName.AsFloat] = [types_1.OperatorCode.BytesAsFloat, [types_1.OutputType.Float]],
        _h[types_1.BytesOperatorName.AsInteger] = [types_1.OperatorCode.BytesAsInteger, [types_1.OutputType.Float]],
        _h[types_1.BytesOperatorName.AsMap] = [types_1.OperatorCode.BytesAsMap, [types_1.OutputType.Map, types_1.OutputType.Bytes]],
        _h[types_1.BytesOperatorName.AsString] = [types_1.OperatorCode.BytesAsString, [types_1.OutputType.String]],
        _h[types_1.BytesOperatorName.Hash] = [types_1.OperatorCode.BytesHash, [types_1.OutputType.Bytes]],
        _h),
    _a[types_1.Type.Result] = (_j = {},
        _j[types_1.ResultOperatorName.Get] = [types_1.OperatorCode.ResultGet, [types_1.OutputType.Inner]],
        _j[types_1.ResultOperatorName.GetOr] = [types_1.OperatorCode.ResultGetOr, [types_1.OutputType.Inner]],
        _j[types_1.ResultOperatorName.IsOk] = [types_1.OperatorCode.ResultIsOk, [types_1.OutputType.Boolean]],
        _j),
    _a);
exports.operatorInfos = (_k = {},
    _k[0x10] = {
        type: types_1.Type.Boolean,
        name: 'match',
        arguments: [
            {
                name: 'categories',
                optional: false,
                type: types_1.MirArgumentKind.Map,
            },
            {
                name: 'default',
                optional: false,
                type: types_1.MirArgumentKind.Inner,
            },
        ],
    },
    _k[0x11] = {
        type: types_1.Type.Boolean,
        name: 'negate',
        arguments: [],
    },
    _k[0x12] = {
        type: types_1.Type.Boolean,
        name: 'asString',
        arguments: [],
    },
    _k[0x20] = {
        type: types_1.Type.Integer,
        name: 'absolute',
        arguments: [],
    },
    _k[0x21] = {
        type: types_1.Type.Integer,
        name: 'asBytes',
        arguments: [],
    },
    _k[0x22] = {
        type: types_1.Type.Integer,
        name: 'asFloat',
        arguments: [],
    },
    _k[0x23] = {
        type: types_1.Type.Integer,
        name: 'asString',
        arguments: [
            {
                name: 'base',
                optional: true,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
    },
    _k[0x24] = {
        type: types_1.Type.Integer,
        name: 'greaterThan',
        arguments: [
            {
                name: 'value',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
    },
    _k[0x25] = {
        type: types_1.Type.Integer,
        name: 'lessThan',
        arguments: [
            {
                name: 'value',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
    },
    _k[0x26] = {
        type: types_1.Type.Integer,
        name: 'match',
        arguments: [],
    },
    _k[0x27] = {
        type: types_1.Type.Integer,
        name: 'modulo',
        arguments: [
            {
                name: 'modulus',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
    },
    _k[0x28] = {
        type: types_1.Type.Integer,
        name: 'multiply',
        arguments: [
            {
                name: 'factor',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
    },
    _k[0x29] = {
        type: types_1.Type.Integer,
        name: 'negate',
        arguments: [],
    },
    _k[0x2a] = {
        type: types_1.Type.Integer,
        name: 'power',
        arguments: [
            {
                name: 'exponent',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
    },
    _k[0x2b] = {
        type: types_1.Type.Integer,
        name: 'reciprocal',
        arguments: [],
    },
    _k[0x2c] = {
        type: types_1.Type.Integer,
        name: 'sum',
        arguments: [
            {
                name: 'addend',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
    },
    _k[0x30] = {
        type: types_1.Type.Float,
        name: 'absolute',
        arguments: [],
    },
    _k[0x31] = {
        type: types_1.Type.Float,
        name: 'asBytes',
        arguments: [],
    },
    _k[0x32] = {
        type: types_1.Type.Float,
        name: 'asString',
        arguments: [
            {
                name: 'decimals',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
    },
    _k[0x33] = {
        type: types_1.Type.Float,
        name: 'ceiling',
        arguments: [],
    },
    _k[0x34] = {
        type: types_1.Type.Float,
        name: 'greaterThan',
        arguments: [
            {
                name: 'value',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
    },
    _k[0x35] = {
        type: types_1.Type.Float,
        name: 'floor',
        arguments: [],
    },
    _k[0x36] = {
        type: types_1.Type.Float,
        name: 'lessThan',
        arguments: [
            {
                name: 'value',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
    },
    _k[0x37] = {
        type: types_1.Type.Float,
        name: 'modulo',
        arguments: [
            {
                name: 'modulus',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
    },
    _k[0x38] = {
        type: types_1.Type.Float,
        name: 'multiply',
        arguments: [
            {
                name: 'factor',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
    },
    _k[0x39] = {
        type: types_1.Type.Float,
        name: 'negate',
        arguments: [],
    },
    _k[0x3a] = {
        type: types_1.Type.Float,
        name: 'power',
        arguments: [
            {
                name: 'exponent',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
    },
    _k[0x3b] = {
        type: types_1.Type.Float,
        name: 'reciprocal',
        arguments: [],
    },
    _k[0x3c] = {
        type: types_1.Type.Float,
        name: 'round',
        arguments: [],
    },
    _k[0x3d] = {
        type: types_1.Type.Float,
        name: 'sum',
        arguments: [
            {
                name: 'addend',
                optional: false,
                type: types_1.MirArgumentKind.Float,
            },
        ],
    },
    _k[0x3e] = {
        type: types_1.Type.Float,
        name: 'truncate',
        arguments: [],
    },
    _k[0x40] = {
        type: types_1.Type.String,
        name: 'asBytes',
        arguments: [],
    },
    _k[0x41] = {
        type: types_1.Type.String,
        name: 'asFloat',
        arguments: [],
    },
    _k[0x42] = {
        type: types_1.Type.String,
        name: 'asInteger',
        arguments: [],
    },
    _k[0x43] = {
        type: types_1.Type.String,
        name: 'length',
        arguments: [],
    },
    _k[0x44] = {
        type: types_1.Type.String,
        name: 'match',
        arguments: [],
    },
    _k[0x45] = {
        type: types_1.Type.String,
        name: 'parseJson',
        arguments: [],
    },
    _k[0x46] = {
        type: types_1.Type.String,
        name: 'parseXml',
        arguments: [],
    },
    _k[0x47] = {
        type: types_1.Type.String,
        name: 'asBoolean',
        arguments: [],
    },
    _k[0x48] = {
        type: types_1.Type.String,
        name: 'toLowerCase',
        arguments: [],
    },
    _k[0x49] = {
        type: types_1.Type.String,
        name: 'toUpperCase',
        arguments: [],
    },
    _k[0x50] = {
        type: types_1.Type.Array,
        name: 'asBytes',
        arguments: [],
    },
    _k[0x51] = {
        type: types_1.Type.Array,
        name: 'count',
        arguments: [],
    },
    _k[0x52] = {
        type: types_1.Type.Array,
        name: 'every',
        arguments: [
            {
                name: 'function',
                optional: false,
                type: types_1.MirArgumentKind.Filter,
            },
        ],
    },
    _k[0x53] = {
        type: types_1.Type.Array,
        name: 'filter',
        arguments: [
            {
                name: 'function',
                optional: false,
                type: types_1.MirArgumentKind.Filter,
            },
        ],
    },
    _k[0x54] = {
        type: types_1.Type.Array,
        name: 'flatten',
        arguments: [
            {
                name: 'depth',
                optional: true,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
    },
    _k[0x55] = {
        type: types_1.Type.Array,
        name: 'get',
        arguments: [
            {
                name: 'index',
                optional: false,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
    },
    _k[0x56] = {
        type: types_1.Type.Array,
        name: 'map',
        arguments: [
            {
                name: 'operator',
                optional: false,
                type: types_1.MirArgumentKind.Mapper,
            },
        ],
    },
    _k[0x57] = {
        type: types_1.Type.Array,
        name: 'reduce',
        arguments: [
            {
                name: 'function',
                optional: false,
                type: types_1.MirArgumentKind.Reducer,
            },
        ],
    },
    _k[0x58] = {
        type: types_1.Type.Array,
        name: 'some',
        arguments: [
            {
                name: 'function',
                optional: false,
                type: types_1.MirArgumentKind.Filter,
            },
        ],
    },
    _k[0x59] = {
        type: types_1.Type.Array,
        name: 'sort',
        arguments: [
            {
                name: 'mapFunction',
                optional: false,
                type: types_1.MirArgumentKind.Mapper,
            },
            {
                name: 'ascending',
                optional: false,
                type: types_1.MirArgumentKind.Boolean,
            },
        ],
    },
    _k[0x5a] = {
        type: types_1.Type.Array,
        name: 'take',
        arguments: [
            {
                name: 'min',
                optional: true,
                type: types_1.MirArgumentKind.Integer,
            },
            {
                name: 'max',
                optional: true,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
    },
    _k[0x60] = {
        type: types_1.Type.Map,
        name: 'entries',
        arguments: [],
    },
    _k[0x61] = {
        type: types_1.Type.Map,
        name: 'get',
        arguments: [
            {
                name: 'key',
                optional: false,
                type: types_1.MirArgumentKind.String,
            },
        ],
    },
    _k[0x62] = {
        type: types_1.Type.Map,
        name: 'keys',
        arguments: [],
    },
    _k[0x63] = {
        type: types_1.Type.Map,
        name: 'values',
        arguments: [],
    },
    _k[0x70] = {
        type: types_1.Type.Bytes,
        name: 'asArray',
        arguments: [],
    },
    _k[0x71] = {
        type: types_1.Type.Bytes,
        name: 'asBoolean',
        arguments: [],
    },
    _k[0x72] = {
        type: types_1.Type.Bytes,
        name: 'asFloat',
        arguments: [],
    },
    _k[0x73] = {
        type: types_1.Type.Bytes,
        name: 'asInteger',
        arguments: [
            {
                name: 'base',
                optional: true,
                type: types_1.MirArgumentKind.Integer,
            },
        ],
    },
    _k[0x74] = {
        type: types_1.Type.Bytes,
        name: 'asMap',
        arguments: [],
    },
    _k[0x75] = {
        type: types_1.Type.Bytes,
        name: 'asString',
        arguments: [],
    },
    _k[0x76] = {
        type: types_1.Type.Bytes,
        name: 'hash',
        arguments: [],
    },
    _k[0x80] = {
        type: types_1.Type.Result,
        name: 'get',
        arguments: [],
    },
    _k[0x81] = {
        type: types_1.Type.Result,
        name: 'getOr',
        arguments: [
            {
                name: 'default',
                optional: false,
                type: types_1.MirArgumentKind.Inner,
            },
        ],
    },
    _k[0x82] = {
        type: types_1.Type.Result,
        name: 'isOk',
        arguments: [],
    },
    _k);
var Cache = /** @class */ (function () {
    function Cache() {
        this.cache = {};
    }
    Cache.prototype.get = function (cacheId) {
        return this.cache[cacheId];
    };
    Cache.prototype.set = function (item) {
        var id = utils_1.dummyHash(JSON.stringify(item));
        this.cache[id] = item;
        return { id: id };
    };
    return Cache;
}());
exports.Cache = Cache;
