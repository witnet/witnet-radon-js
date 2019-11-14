export declare enum Type {
    Boolean = "Boolean",
    Integer = "Integer",
    Float = "Float",
    String = "String",
    Array = "Array",
    Map = "Map",
    Bytes = "Bytes",
    Result = "Result"
}
export declare enum Reducer {
    min = 0,
    max = 1,
    mode = 2,
    averageMean = 3,
    averageMeanWeighted = 4,
    averageMedian = 5,
    averageMedianWeighted = 6,
    deviationStandard = 7,
    deviationAverage = 8,
    deviationMedian = 9,
    deviationMaximum = 10
}
export declare enum Filter {
    greaterThan = 0,
    LessThan = 1,
    equals = 2,
    deviationAbsolute = 3,
    deviationRelative = 4,
    deviationStandard = 5,
    top = 6,
    bottom = 7,
    lessOrEqualThan = 128,
    greaterOrEqualThan = 129,
    notEquals = 130,
    notDeviationAbsolute = 131,
    notDeviationRelative = 132,
    notDeviationStandard = 133,
    notTop = 134,
    notBottom = 135
}
export declare enum OutputType {
    Boolean = "boolean",
    Integer = "integer",
    Float = "float",
    String = "string",
    Array = "array",
    Map = "map",
    Bytes = "bytes",
    Result = "result",
    Inner = "inner",
    Argument = "argument",
    Passthrough = "passthrough"
}
export declare enum MarkupHierarchicalType {
    Operator = "operator",
    SelectedOperatorOption = "selectedOperatorOption",
    OperatorOption = "operatorOption",
    Argument = "argument"
}
export declare type MarkupOption = {
    hierarchicalType: MarkupHierarchicalType.OperatorOption;
    label: string;
    markupType: MarkupType.Option;
    outputType: OutputType | Array<OutputType>;
};
export interface MarkupSelectedOption {
    arguments: Array<MarkupInput | MarkupSelect> | [];
    hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption;
    label: string;
    markupType: MarkupType.Option;
    outputType: OutputType | Array<OutputType>;
}
export declare type MarkupInput = {
    id: number;
    label: string;
    markupType: MarkupType.Input;
    hierarchicalType: MarkupHierarchicalType.Argument;
    value: string | number | boolean;
};
export declare type MarkupSelect = {
    id: number;
    scriptId: number;
    markupType: MarkupType.Select;
    hierarchicalType: MarkupHierarchicalType.Operator | MarkupHierarchicalType.Argument;
    outputType: Array<OutputType> | OutputType;
    selected: MarkupSelectedOption;
    options: Array<MarkupOption>;
    label?: string;
};
export declare enum MarkupType {
    Select = "select",
    Option = "option",
    Input = "input"
}
export declare type MarkupOperator = MarkupSelect;
export declare type MarkupArgument = MarkupSelect | MarkupInput;
export declare type MarkupSource = {
    url: string;
    script: MarkupScript;
};
export declare type MarkupScript = Array<MarkupOperator>;
export declare type MarkupRequest = {
    notBefore: number;
    retrieve: Array<MarkupSource>;
    aggregate: MarkupScript;
    tally: MarkupScript;
};
export declare type Markup = {
    name: string;
    description: string;
    radRequest: MarkupRequest;
};
export declare enum OperatorCode {
    BooleanMatch = 16,
    BooleanNegate = 17,
    BooleanAsString = 18,
    IntegerAbsolute = 32,
    IntegerAsBytes = 33,
    IntegerAsFloat = 34,
    IntegerAsString = 35,
    IntegerGreaterThan = 36,
    IntegerLessThan = 37,
    IntegerMatch = 38,
    IntegerModulo = 39,
    IntegerMultiply = 40,
    IntegerNegate = 41,
    IntegerPower = 42,
    IntegerReciprocal = 43,
    IntegerSum = 44,
    FloatAbsolute = 48,
    FloatAsBytes = 49,
    FloatAsString = 50,
    FloatCeiling = 51,
    FloatGraterThan = 52,
    FloatFloor = 53,
    FloatLessThan = 54,
    FloatModulo = 55,
    FloatMultiply = 56,
    FloatNegate = 57,
    FloatPower = 58,
    FloatReciprocal = 59,
    FloatRound = 60,
    Floatsum = 61,
    FloatTruncate = 62,
    StringAsBytes = 64,
    StringAsFloat = 65,
    StringAsInteger = 66,
    StringLength = 67,
    StringMatch = 68,
    StringParseJson = 69,
    StringParseXML = 70,
    StringAsBoolean = 71,
    StringToLowerCase = 72,
    StringToUpperCase = 73,
    ArrayAsBytes = 80,
    ArrayCount = 81,
    ArrayEvery = 82,
    ArrayFilter = 83,
    ArrayFlatten = 84,
    ArrayGet = 85,
    ArrayMap = 86,
    ArrayReduce = 87,
    ArraySome = 88,
    ArraySort = 89,
    ArrayTake = 90,
    MapEntries = 96,
    MapGet = 97,
    MapKeys = 98,
    MapValues = 99,
    BytesAsArray = 112,
    BytesAsBoolean = 113,
    BytesAsFloat = 114,
    BytesAsInteger = 115,
    BytesAsMap = 116,
    BytesAsString = 117,
    BytesHash = 118,
    ResultGet = 128,
    ResultGetOr = 129,
    ResultIsOk = 130
}
export declare enum MirArgumentKind {
    Array = 0,
    Boolean = 1,
    Bytes = 2,
    Filter = 3,
    Float = 4,
    Inner = 5,
    Integer = 6,
    Map = 7,
    Mapper = 8,
    Passthrough = 9,
    Reducer = 10,
    Result = 11,
    String = 12
}
export declare type MirArgument = string | number | boolean | [Filter, number] | [Filter, string] | [Filter, boolean] | Reducer;
export declare type MirOperator = OperatorCode | [OperatorCode, MirArgument] | [OperatorCode, MirArgument, MirArgument];
export declare type MirScript = Array<MirOperator>;
export declare type MirSource = {
    url: string;
    script: MirScript;
};
export declare type MirRequest = {
    notBefore: number;
    retrieve: Array<MirSource>;
    aggregate: MirScript;
    tally: MirScript;
};
export declare type Mir = {
    name: string;
    description: string;
    radRequest: MirRequest;
};
export declare type GeneratedMarkupScript = {
    cache: any;
    script: MarkupScript;
};
export declare type OperatorInfo = {
    type: Type;
    name: string;
    arguments: Array<ArgumentInfo>;
};
export declare type ArgumentInfo = {
    name: string;
    optional: boolean;
    type: MirArgumentKind;
};
export declare type OperatorInfos = {
    [T in OperatorCode]: OperatorInfo;
};
export declare enum BooleanOperatorName {
    Negate = "negate",
    Match = "match",
    AsString = "asString"
}
export declare enum IntegerOperatorName {
    Absolute = "absolute",
    Power = "power",
    Sum = "sum",
    AsBytes = "asBytes",
    AsFloat = "asFloat",
    AsString = "asString",
    GreaterThan = "greaterThan",
    LessThan = "lessThan",
    Match = "match",
    Modulo = "modulo",
    Multiply = "multiply",
    Negate = "negate",
    Reciprocal = "reciprocal"
}
export declare enum FloatOperatorName {
    Absolute = "absolute",
    AsBytes = "asBytes",
    AsString = "asString",
    Ceiling = "ceiling",
    GreaterThan = "greaterThan",
    LessThan = "lessThan",
    Floor = "floor",
    Modulo = "modulo",
    Multiply = "multiply",
    Negate = "negate",
    Power = "power",
    Sum = "sum",
    Truncate = "truncate",
    Reciprocal = "reciprocal",
    Round = "round"
}
export declare enum StringOperatorName {
    AsBytes = "asBytes",
    AsFloat = "asFloat",
    AsInteger = "asInteger",
    Length = "length",
    Match = "match",
    ParseJson = "parseJson",
    ParseXml = "parseXml",
    AsBoolean = "asBoolean",
    ToLowerCase = "toLowerCase",
    ToUpperCase = "toUpperCase"
}
export declare enum ArrayOperatorName {
    AsBytes = "asBytes",
    Count = "count",
    Every = "every",
    Filter = "filter",
    Flatten = "flatten",
    Get = "get",
    Map = "map",
    Reduce = "reduce",
    Some = "some",
    Sort = "sort",
    Take = "take"
}
export declare enum MapOperatorName {
    Entries = "entries",
    Get = "get",
    Keys = "keys",
    Values = "values"
}
export declare enum BytesOperatorName {
    AsArray = "asArray",
    AsBoolean = "asBoolean",
    AsFloat = "asFloat",
    AsInteger = "asInteger",
    AsMap = "asMap",
    AsString = "asString",
    Hash = "hash"
}
export declare enum ResultOperatorName {
    Get = "get",
    GetOr = "getOr",
    IsOk = "isOk"
}
export declare type OperatorName = BooleanOperatorName | IntegerOperatorName | FloatOperatorName | StringOperatorName | ArrayOperatorName | MapOperatorName | BytesOperatorName | ResultOperatorName;
export declare type TypeSystem = {
    [Type.Boolean]: {
        [B in BooleanOperatorName]: [OperatorCode, Array<OutputType>];
    };
    [Type.Integer]: {
        [I in IntegerOperatorName]: [OperatorCode, Array<OutputType>];
    };
    [Type.Float]: {
        [F in FloatOperatorName]: [OperatorCode, Array<OutputType>];
    };
    [Type.String]: {
        [S in StringOperatorName]: [OperatorCode, Array<OutputType>];
    };
    [Type.Array]: {
        [A in ArrayOperatorName]: [OperatorCode, Array<OutputType>];
    };
    [Type.Map]: {
        [M in MapOperatorName]: [OperatorCode, Array<OutputType>];
    };
    [Type.Bytes]: {
        [B in BytesOperatorName]: [OperatorCode, Array<OutputType>];
    };
    [Type.Result]: {
        [R in ResultOperatorName]: [OperatorCode, Array<OutputType>];
    };
};
export declare type TypeSystemEntry = [Type, {
    [B in BooleanOperatorName]: [OperatorCode, Array<OutputType>];
}] | [Type, {
    [I in IntegerOperatorName]: [OperatorCode, Array<OutputType>];
}] | [Type, {
    [F in FloatOperatorName]: [OperatorCode, Array<OutputType>];
}] | [Type, {
    [S in StringOperatorName]: [OperatorCode, Array<OutputType>];
}] | [Type, {
    [A in ArrayOperatorName]: [OperatorCode, Array<OutputType>];
}] | [Type, {
    [M in MapOperatorName]: [OperatorCode, Array<OutputType>];
}] | [Type, {
    [B in BytesOperatorName]: [OperatorCode, Array<OutputType>];
}] | [Type, {
    [R in ResultOperatorName]: [OperatorCode, Array<OutputType>];
}];
export declare type TypeSystemValue = [string, [OperatorCode, Array<OutputType>]];
export declare type FilterArgument = [Filter, number] | [Filter, string] | [Filter, boolean];
export declare type CacheRef = {
    id: number;
};
export declare type CachedMarkupSelect = {
    id: number;
    scriptId: number;
    markupType: MarkupType.Select;
    hierarchicalType: MarkupHierarchicalType.Operator | MarkupHierarchicalType.Argument;
    outputType: Array<OutputType> | OutputType;
    selected: CacheRef;
    options: Array<MarkupOption>;
    label?: string;
};
export declare type CachedMarkupOperator = CachedMarkupSelect;
export declare type CachedMarkupScript = Array<CacheRef>;
export declare type CachedMarkupRequest = {
    notBefore: number;
    retrieve: Array<CachedMarkupSource>;
    aggregate: CachedMarkupScript;
    tally: CachedMarkupScript;
};
export declare type CachedMarkupSource = {
    url: string;
    script: CachedMarkupScript;
};
export declare type CachedMarkup = {
    name: string;
    description: string;
    radRequest: CachedMarkupRequest;
};
export declare type CachedMarkupSelectedOption = {
    arguments: Array<CacheRef> | [];
    hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption;
    label: string;
    markupType: MarkupType.Option;
    outputType: OutputType | Array<OutputType>;
};
export declare type CachedArgument = MarkupInput | CachedMarkupSelect;
//# sourceMappingURL=types.d.ts.map