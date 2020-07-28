"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringOperatorName = exports.MapOperatorName = exports.FloatOperatorName = exports.IntegerOperatorName = exports.BytesOperatorName = exports.BooleanOperatorName = exports.ArrayOperatorName = exports.AggregationTallyReducer = exports.AggregationTallyFilter = exports.MarkupArgumentType = exports.MirArgumentType = exports.OperatorCode = exports.MarkupType = exports.MarkupInputType = exports.MarkupHierarchicalType = exports.OutputType = exports.Filter = exports.Reducer = exports.Type = exports.Stage = exports.CacheItemType = exports.EventName = void 0;
var EventName;
(function (EventName) {
    EventName[EventName["Update"] = 0] = "Update";
})(EventName = exports.EventName || (exports.EventName = {}));
var CacheItemType;
(function (CacheItemType) {
    CacheItemType[CacheItemType["Array"] = 0] = "Array";
    CacheItemType[CacheItemType["Operator"] = 1] = "Operator";
    CacheItemType[CacheItemType["InputArgument"] = 2] = "InputArgument";
    CacheItemType[CacheItemType["SelectArgument"] = 3] = "SelectArgument";
})(CacheItemType = exports.CacheItemType || (exports.CacheItemType = {}));
var Stage;
(function (Stage) {
    Stage["Retrieve"] = "retrieve";
    Stage["Aggregate"] = "aggregate";
    Stage["Tally"] = "tally";
})(Stage = exports.Stage || (exports.Stage = {}));
var Type;
(function (Type) {
    Type["Boolean"] = "Boolean";
    Type["Integer"] = "Integer";
    Type["Float"] = "Float";
    Type["String"] = "String";
    Type["Array"] = "Array";
    Type["Map"] = "Map";
    Type["Bytes"] = "Bytes";
})(Type = exports.Type || (exports.Type = {}));
var Reducer;
(function (Reducer) {
    Reducer[Reducer["min"] = 0] = "min";
    Reducer[Reducer["max"] = 1] = "max";
    Reducer[Reducer["mode"] = 2] = "mode";
    Reducer[Reducer["averageMean"] = 3] = "averageMean";
    Reducer[Reducer["averageMeanWeighted"] = 4] = "averageMeanWeighted";
    Reducer[Reducer["averageMedian"] = 5] = "averageMedian";
    Reducer[Reducer["averageMedianWeighted"] = 6] = "averageMedianWeighted";
    Reducer[Reducer["deviationStandard"] = 7] = "deviationStandard";
    Reducer[Reducer["deviationAverage"] = 8] = "deviationAverage";
    Reducer[Reducer["deviationMedian"] = 9] = "deviationMedian";
    Reducer[Reducer["deviationMaximum"] = 10] = "deviationMaximum";
})(Reducer = exports.Reducer || (exports.Reducer = {}));
var Filter;
(function (Filter) {
    Filter[Filter["greaterThan"] = 0] = "greaterThan";
    Filter[Filter["lessThan"] = 1] = "lessThan";
    Filter[Filter["equals"] = 2] = "equals";
    Filter[Filter["deviationAbsolute"] = 3] = "deviationAbsolute";
    Filter[Filter["deviationRelative"] = 4] = "deviationRelative";
    Filter[Filter["deviationStandard"] = 5] = "deviationStandard";
    Filter[Filter["top"] = 6] = "top";
    Filter[Filter["bottom"] = 7] = "bottom";
    Filter[Filter["mode"] = 8] = "mode";
    Filter[Filter["lessOrEqualThan"] = 128] = "lessOrEqualThan";
    Filter[Filter["greaterOrEqualThan"] = 129] = "greaterOrEqualThan";
    Filter[Filter["notEquals"] = 130] = "notEquals";
    Filter[Filter["notDeviationAbsolute"] = 131] = "notDeviationAbsolute";
    Filter[Filter["notDeviationRelative"] = 132] = "notDeviationRelative";
    Filter[Filter["notDeviationStandard"] = 133] = "notDeviationStandard";
    Filter[Filter["notTop"] = 134] = "notTop";
    Filter[Filter["notBottom"] = 135] = "notBottom";
    Filter[Filter["custom"] = 255] = "custom";
})(Filter = exports.Filter || (exports.Filter = {}));
var OutputType;
(function (OutputType) {
    OutputType["Array"] = "array";
    OutputType["ArrayArray"] = "arrayArray";
    OutputType["ArrayBoolean"] = "arrayBoolean";
    OutputType["ArrayBytes"] = "arrayBytes";
    OutputType["ArrayFloat"] = "arrayFloat";
    OutputType["ArrayInteger"] = "arrayInteger";
    OutputType["ArrayMap"] = "arrayMap";
    OutputType["ArrayString"] = "arrayString";
    OutputType["Boolean"] = "boolean";
    OutputType["Bytes"] = "bytes";
    OutputType["FilterOutput"] = "filterOutput";
    OutputType["Float"] = "float";
    OutputType["Inner"] = "inner";
    OutputType["Integer"] = "integer";
    OutputType["Map"] = "map";
    OutputType["MatchOutput"] = "matchOutput";
    OutputType["ReducerOutput"] = "reducerOutput";
    OutputType["Same"] = "same";
    OutputType["String"] = "string";
    OutputType["SubscriptOutput"] = "subscriptOutput";
})(OutputType = exports.OutputType || (exports.OutputType = {}));
var MarkupHierarchicalType;
(function (MarkupHierarchicalType) {
    MarkupHierarchicalType["Operator"] = "operator";
    MarkupHierarchicalType["SelectedOperatorOption"] = "selectedOperatorOption";
    MarkupHierarchicalType["OperatorOption"] = "operatorOption";
    MarkupHierarchicalType["Argument"] = "argument";
})(MarkupHierarchicalType = exports.MarkupHierarchicalType || (exports.MarkupHierarchicalType = {}));
var MarkupInputType;
(function (MarkupInputType) {
    MarkupInputType["Number"] = "number";
    MarkupInputType["Boolean"] = "boolean";
    MarkupInputType["String"] = "string";
    MarkupInputType["Map"] = "map";
})(MarkupInputType = exports.MarkupInputType || (exports.MarkupInputType = {}));
var MarkupType;
(function (MarkupType) {
    MarkupType["Select"] = "select";
    MarkupType["Option"] = "option";
    MarkupType["Input"] = "input";
    MarkupType["Script"] = "script";
})(MarkupType = exports.MarkupType || (exports.MarkupType = {}));
var OperatorCode;
(function (OperatorCode) {
    OperatorCode[OperatorCode["ArrayCount"] = 16] = "ArrayCount";
    OperatorCode[OperatorCode["ArrayFilter"] = 17] = "ArrayFilter";
    OperatorCode[OperatorCode["ArrayFlatten"] = 18] = "ArrayFlatten";
    OperatorCode[OperatorCode["ArrayGetArray"] = 19] = "ArrayGetArray";
    OperatorCode[OperatorCode["ArrayGetBoolean"] = 20] = "ArrayGetBoolean";
    OperatorCode[OperatorCode["ArrayGetBytes"] = 21] = "ArrayGetBytes";
    OperatorCode[OperatorCode["ArrayGetInteger"] = 22] = "ArrayGetInteger";
    OperatorCode[OperatorCode["ArrayGetFloat"] = 23] = "ArrayGetFloat";
    OperatorCode[OperatorCode["ArrayGetMap"] = 24] = "ArrayGetMap";
    OperatorCode[OperatorCode["ArrayGetString"] = 25] = "ArrayGetString";
    OperatorCode[OperatorCode["ArrayMap"] = 26] = "ArrayMap";
    OperatorCode[OperatorCode["ArrayReduce"] = 27] = "ArrayReduce";
    OperatorCode[OperatorCode["ArraySome"] = 28] = "ArraySome";
    OperatorCode[OperatorCode["ArraySort"] = 29] = "ArraySort";
    OperatorCode[OperatorCode["ArrayTake"] = 30] = "ArrayTake";
    OperatorCode[OperatorCode["BooleanAsString"] = 32] = "BooleanAsString";
    OperatorCode[OperatorCode["BooleanMatch"] = 33] = "BooleanMatch";
    OperatorCode[OperatorCode["BooleanNegate"] = 34] = "BooleanNegate";
    OperatorCode[OperatorCode["BytesAsString"] = 48] = "BytesAsString";
    OperatorCode[OperatorCode["BytesHash"] = 49] = "BytesHash";
    OperatorCode[OperatorCode["IntegerAbsolute"] = 64] = "IntegerAbsolute";
    OperatorCode[OperatorCode["IntegerAsFloat"] = 65] = "IntegerAsFloat";
    OperatorCode[OperatorCode["IntegerAsString"] = 66] = "IntegerAsString";
    OperatorCode[OperatorCode["IntegerGreaterThan"] = 67] = "IntegerGreaterThan";
    OperatorCode[OperatorCode["IntegerLessThan"] = 68] = "IntegerLessThan";
    OperatorCode[OperatorCode["IntegerMatch"] = 69] = "IntegerMatch";
    OperatorCode[OperatorCode["IntegerModulo"] = 70] = "IntegerModulo";
    OperatorCode[OperatorCode["IntegerMultiply"] = 71] = "IntegerMultiply";
    OperatorCode[OperatorCode["IntegerNegate"] = 72] = "IntegerNegate";
    OperatorCode[OperatorCode["IntegerPower"] = 73] = "IntegerPower";
    OperatorCode[OperatorCode["IntegerReciprocal"] = 74] = "IntegerReciprocal";
    OperatorCode[OperatorCode["IntegerSum"] = 75] = "IntegerSum";
    OperatorCode[OperatorCode["FloatAbsolute"] = 80] = "FloatAbsolute";
    OperatorCode[OperatorCode["FloatAsString"] = 81] = "FloatAsString";
    OperatorCode[OperatorCode["FloatCeiling"] = 82] = "FloatCeiling";
    OperatorCode[OperatorCode["FloatGraterThan"] = 83] = "FloatGraterThan";
    OperatorCode[OperatorCode["FloatFloor"] = 84] = "FloatFloor";
    OperatorCode[OperatorCode["FloatLessThan"] = 85] = "FloatLessThan";
    OperatorCode[OperatorCode["FloatModulo"] = 86] = "FloatModulo";
    OperatorCode[OperatorCode["FloatMultiply"] = 87] = "FloatMultiply";
    OperatorCode[OperatorCode["FloatNegate"] = 88] = "FloatNegate";
    OperatorCode[OperatorCode["FloatPower"] = 89] = "FloatPower";
    OperatorCode[OperatorCode["FloatReciprocal"] = 90] = "FloatReciprocal";
    OperatorCode[OperatorCode["FloatRound"] = 91] = "FloatRound";
    OperatorCode[OperatorCode["Floatsum"] = 92] = "Floatsum";
    OperatorCode[OperatorCode["FloatTruncate"] = 93] = "FloatTruncate";
    OperatorCode[OperatorCode["MapEntries"] = 96] = "MapEntries";
    OperatorCode[OperatorCode["MapGetArray"] = 97] = "MapGetArray";
    OperatorCode[OperatorCode["MapGetBoolean"] = 98] = "MapGetBoolean";
    OperatorCode[OperatorCode["MapGetBytes"] = 99] = "MapGetBytes";
    OperatorCode[OperatorCode["MapGetFloat"] = 100] = "MapGetFloat";
    OperatorCode[OperatorCode["MapGetInteger"] = 101] = "MapGetInteger";
    OperatorCode[OperatorCode["MapGetMap"] = 102] = "MapGetMap";
    OperatorCode[OperatorCode["MapGetString"] = 103] = "MapGetString";
    OperatorCode[OperatorCode["MapKeys"] = 104] = "MapKeys";
    OperatorCode[OperatorCode["MapValuesArray"] = 105] = "MapValuesArray";
    OperatorCode[OperatorCode["MapValuesBoolean"] = 106] = "MapValuesBoolean";
    OperatorCode[OperatorCode["MapValuesBytes"] = 107] = "MapValuesBytes";
    OperatorCode[OperatorCode["MapValuesFloat"] = 108] = "MapValuesFloat";
    OperatorCode[OperatorCode["MapValuesInteger"] = 109] = "MapValuesInteger";
    OperatorCode[OperatorCode["MapValuesMap"] = 110] = "MapValuesMap";
    OperatorCode[OperatorCode["MapValuesString"] = 111] = "MapValuesString";
    OperatorCode[OperatorCode["StringAsBoolean"] = 112] = "StringAsBoolean";
    OperatorCode[OperatorCode["StringAsBytes"] = 113] = "StringAsBytes";
    OperatorCode[OperatorCode["StringAsFloat"] = 114] = "StringAsFloat";
    OperatorCode[OperatorCode["StringAsInteger"] = 115] = "StringAsInteger";
    OperatorCode[OperatorCode["StringLength"] = 116] = "StringLength";
    OperatorCode[OperatorCode["StringMatch"] = 117] = "StringMatch";
    OperatorCode[OperatorCode["StringParseJsonArray"] = 118] = "StringParseJsonArray";
    OperatorCode[OperatorCode["StringParseJsonMap"] = 119] = "StringParseJsonMap";
    OperatorCode[OperatorCode["StringParseXML"] = 120] = "StringParseXML";
    OperatorCode[OperatorCode["StringToLowerCase"] = 121] = "StringToLowerCase";
    OperatorCode[OperatorCode["StringToUpperCase"] = 122] = "StringToUpperCase";
})(OperatorCode = exports.OperatorCode || (exports.OperatorCode = {}));
var MirArgumentType;
(function (MirArgumentType) {
    MirArgumentType[MirArgumentType["Integer"] = 0] = "Integer";
    MirArgumentType[MirArgumentType["Subscript"] = 1] = "Subscript";
    MirArgumentType[MirArgumentType["FilterFunction"] = 2] = "FilterFunction";
    MirArgumentType[MirArgumentType["ReducerFunction"] = 3] = "ReducerFunction";
    MirArgumentType[MirArgumentType["Float"] = 4] = "Float";
    MirArgumentType[MirArgumentType["String"] = 5] = "String";
    MirArgumentType[MirArgumentType["Boolean"] = 6] = "Boolean";
    MirArgumentType[MirArgumentType["Map"] = 7] = "Map";
})(MirArgumentType = exports.MirArgumentType || (exports.MirArgumentType = {}));
var MarkupArgumentType;
(function (MarkupArgumentType) {
    MarkupArgumentType[MarkupArgumentType["Input"] = 0] = "Input";
    MarkupArgumentType[MarkupArgumentType["SelectBoolean"] = 1] = "SelectBoolean";
    MarkupArgumentType[MarkupArgumentType["SelectFilter"] = 2] = "SelectFilter";
    MarkupArgumentType[MarkupArgumentType["SelectReduce"] = 3] = "SelectReduce";
    MarkupArgumentType[MarkupArgumentType["Subscript"] = 4] = "Subscript";
})(MarkupArgumentType = exports.MarkupArgumentType || (exports.MarkupArgumentType = {}));
var AggregationTallyFilter;
(function (AggregationTallyFilter) {
    AggregationTallyFilter[AggregationTallyFilter["deviationAbsolute"] = 3] = "deviationAbsolute";
    AggregationTallyFilter[AggregationTallyFilter["deviationRelative"] = 4] = "deviationRelative";
    AggregationTallyFilter[AggregationTallyFilter["deviationStandard"] = 5] = "deviationStandard";
    AggregationTallyFilter[AggregationTallyFilter["mode"] = 8] = "mode";
})(AggregationTallyFilter = exports.AggregationTallyFilter || (exports.AggregationTallyFilter = {}));
var AggregationTallyReducer;
(function (AggregationTallyReducer) {
    AggregationTallyReducer[AggregationTallyReducer["mode"] = 2] = "mode";
    AggregationTallyReducer[AggregationTallyReducer["averageMean"] = 3] = "averageMean";
    AggregationTallyReducer[AggregationTallyReducer["averageMeanWeighted"] = 4] = "averageMeanWeighted";
    AggregationTallyReducer[AggregationTallyReducer["averageMedian"] = 5] = "averageMedian";
    AggregationTallyReducer[AggregationTallyReducer["averageMedianWeighted"] = 6] = "averageMedianWeighted";
})(AggregationTallyReducer = exports.AggregationTallyReducer || (exports.AggregationTallyReducer = {}));
var ArrayOperatorName;
(function (ArrayOperatorName) {
    ArrayOperatorName["Count"] = "count";
    ArrayOperatorName["Filter"] = "filter";
    ArrayOperatorName["Flatten"] = "flatten";
    ArrayOperatorName["GetArray"] = "getArray";
    ArrayOperatorName["GetBoolean"] = "getBoolean";
    ArrayOperatorName["GetBytes"] = "getBytes";
    ArrayOperatorName["GetInteger"] = "getInteger";
    ArrayOperatorName["GetFloat"] = "getFloat";
    ArrayOperatorName["GetMap"] = "getMap";
    ArrayOperatorName["GetString"] = "getString";
    ArrayOperatorName["Map"] = "map";
    ArrayOperatorName["Reduce"] = "reduce";
    ArrayOperatorName["Some"] = "some";
    ArrayOperatorName["Sort"] = "sort";
    ArrayOperatorName["Take"] = "take";
})(ArrayOperatorName = exports.ArrayOperatorName || (exports.ArrayOperatorName = {}));
var BooleanOperatorName;
(function (BooleanOperatorName) {
    BooleanOperatorName["AsString"] = "asString";
    BooleanOperatorName["Negate"] = "negate";
    BooleanOperatorName["Match"] = "match";
})(BooleanOperatorName = exports.BooleanOperatorName || (exports.BooleanOperatorName = {}));
var BytesOperatorName;
(function (BytesOperatorName) {
    BytesOperatorName["AsString"] = "asString";
    BytesOperatorName["Hash"] = "hash";
})(BytesOperatorName = exports.BytesOperatorName || (exports.BytesOperatorName = {}));
var IntegerOperatorName;
(function (IntegerOperatorName) {
    IntegerOperatorName["Absolute"] = "absolute";
    IntegerOperatorName["AsFloat"] = "asFloat";
    IntegerOperatorName["AsString"] = "asString";
    IntegerOperatorName["GreaterThan"] = "greaterThan";
    IntegerOperatorName["LessThan"] = "lessThan";
    IntegerOperatorName["Match"] = "match";
    IntegerOperatorName["Modulo"] = "modulo";
    IntegerOperatorName["Multiply"] = "multiply";
    IntegerOperatorName["Negate"] = "negate";
    IntegerOperatorName["Power"] = "power";
    IntegerOperatorName["Reciprocal"] = "reciprocal";
    IntegerOperatorName["Sum"] = "sum";
})(IntegerOperatorName = exports.IntegerOperatorName || (exports.IntegerOperatorName = {}));
var FloatOperatorName;
(function (FloatOperatorName) {
    FloatOperatorName["Absolute"] = "absolute";
    FloatOperatorName["AsString"] = "asString";
    FloatOperatorName["Ceiling"] = "ceiling";
    FloatOperatorName["GreaterThan"] = "greaterThan";
    FloatOperatorName["Floor"] = "floor";
    FloatOperatorName["LessThan"] = "lessThan";
    FloatOperatorName["Modulo"] = "modulo";
    FloatOperatorName["Multiply"] = "multiply";
    FloatOperatorName["Negate"] = "negate";
    FloatOperatorName["Power"] = "power";
    FloatOperatorName["Reciprocal"] = "reciprocal";
    FloatOperatorName["Round"] = "round";
    FloatOperatorName["Sum"] = "sum";
    FloatOperatorName["Truncate"] = "truncate";
})(FloatOperatorName = exports.FloatOperatorName || (exports.FloatOperatorName = {}));
var MapOperatorName;
(function (MapOperatorName) {
    MapOperatorName["Entries"] = "entries";
    MapOperatorName["GetArray"] = "getArray";
    MapOperatorName["GetBoolean"] = "getBoolean";
    MapOperatorName["GetBytes"] = "getBytes";
    MapOperatorName["GetInteger"] = "getInteger";
    MapOperatorName["GetFloat"] = "getFloat";
    MapOperatorName["GetMap"] = "getMap";
    MapOperatorName["GetString"] = "getString";
    MapOperatorName["Keys"] = "keys";
    MapOperatorName["valuesArray"] = "valuesAsArray";
    MapOperatorName["valuesBoolean"] = "valuesAsBoolean";
    MapOperatorName["valuesBytes"] = "valuesAsBytes";
    MapOperatorName["valuesInteger"] = "valuesAsInteger";
    MapOperatorName["valuesFloat"] = "valuesAsFloat";
    MapOperatorName["valuesMap"] = "valuesAsMap";
    MapOperatorName["valuesString"] = "valuesAsString";
})(MapOperatorName = exports.MapOperatorName || (exports.MapOperatorName = {}));
var StringOperatorName;
(function (StringOperatorName) {
    StringOperatorName["AsBoolean"] = "asBoolean";
    StringOperatorName["AsBytes"] = "asBytes";
    StringOperatorName["AsFloat"] = "asFloat";
    StringOperatorName["AsInteger"] = "asInteger";
    StringOperatorName["Length"] = "length";
    StringOperatorName["Match"] = "match";
    StringOperatorName["ParseJsonArray"] = "parseJSONArray";
    StringOperatorName["ParseJsonMap"] = "parseJSONMap";
    StringOperatorName["ParseXml"] = "parseXML";
    StringOperatorName["ToLowerCase"] = "toLowerCase";
    StringOperatorName["ToUpperCase"] = "toUpperCase";
})(StringOperatorName = exports.StringOperatorName || (exports.StringOperatorName = {}));
