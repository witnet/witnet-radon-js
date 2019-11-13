export enum Type {
  Boolean = 'Boolean',
  Integer = 'Integer',
  Float = 'Float',
  String = 'String',
  Array = 'Array',
  Map = 'Map',
  Bytes = 'Bytes',
  Result = 'Result',
}

export enum Reducer {
  min = 0x00,
  max = 0x01,
  mode = 0x02,
  averageMean = 0x03,
  averageMeanWeighted = 0x04,
  averageMedian = 0x05,
  averageMedianWeighted = 0x06,
  deviationStandard = 0x07,
  deviationAverage = 0x08,
  deviationMedian = 0x09,
  deviationMaximum = 0x0a,
}

export enum Filter {
  greaterThan = 0x00,
  LessThan = 0x01,
  equals = 0x02,
  deviationAbsolute = 0x03,
  deviationRelative = 0x04,
  deviationStandard = 0x05,
  top = 0x06,
  bottom = 0x07,
  lessOrEqualThan = 0x80,
  greaterOrEqualThan = 0x81,
  notEquals = 0x82,
  notDeviationAbsolute = 0x83,
  notDeviationRelative = 0x84,
  notDeviationStandard = 0x85,
  notTop = 0x86,
  notBottom = 0x87,
}

export enum OutputType {
  Boolean = 'boolean',
  Integer = 'integer',
  Float = 'float',
  String = 'string',
  Array = 'array',
  Map = 'map',
  Bytes = 'bytes',
  Result = 'result',
  Inner = 'inner',
  Argument = 'argument',
  Passthrough = 'passthrough',
}

export enum MarkupHierarchicalType {
  Operator = 'operator',
  SelectedOperatorOption = 'selectedOperatorOption',
  OperatorOption = 'operatorOption',
  Argument = 'argument',
}

export type MarkupOption = {
  hierarchicalType: MarkupHierarchicalType.OperatorOption
  label: string
  markupType: MarkupType.Option
  outputType: OutputType | Array<OutputType>
}

export interface MarkupSelectedOption {
  arguments: Array<MarkupInput | MarkupSelect> | []
  hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption
  label: string
  markupType: MarkupType.Option
  outputType: OutputType | Array<OutputType>
}

export type MarkupInput = {
  id: number
  label: string
  markupType: MarkupType.Input
  hierarchicalType: MarkupHierarchicalType.Argument
  value: string | number | boolean
}

export type MarkupSelect = {
  id: number
  scriptId: number
  markupType: MarkupType.Select
  hierarchicalType: MarkupHierarchicalType.Operator | MarkupHierarchicalType.Argument
  outputType: Array<OutputType> | OutputType
  selected: MarkupSelectedOption
  options: Array<MarkupOption>
  label?: string
}

export enum MarkupType {
  Select = 'select',
  Option = 'option',
  Input = 'input',
}
export type MarkupOperator = MarkupSelect
export type MarkupArgument = MarkupSelect | MarkupInput
export type MarkupSource = {
  url: string
  script: MarkupScript
}

export type MarkupScript = Array<MarkupOperator>

export type MarkupRequest = {
  notBefore: number
  retrieve: Array<MarkupSource>
  aggregate: MarkupScript
  tally: MarkupScript
}

export type Markup = {
  name: string
  description: string
  radRequest: MarkupRequest
}

export enum OperatorCode {
  BooleanMatch = 0x10,
  BooleanNegate = 0x11,
  BooleanAsString = 0x12,

  IntegerAbsolute = 0x20,
  IntegerAsBytes = 0x21,
  IntegerAsFloat = 0x22,
  IntegerAsString = 0x23,
  IntegerGreaterThan = 0x24,
  IntegerLessThan = 0x25,
  IntegerMatch = 0x26,
  IntegerModulo = 0x27,
  IntegerMultiply = 0x28,
  IntegerNegate = 0x29,
  IntegerPower = 0x2a,
  IntegerReciprocal = 0x2b,
  IntegerSum = 0x2c,

  FloatAbsolute = 0x30,
  FloatAsBytes = 0x31,
  FloatAsString = 0x32,
  FloatCeiling = 0x33,
  FloatGraterThan = 0x34,
  FloatFloor = 0x35,
  FloatLessThan = 0x36,
  FloatModulo = 0x37,
  FloatMultiply = 0x38,
  FloatNegate = 0x39,
  FloatPower = 0x3a,
  FloatReciprocal = 0x3b,
  FloatRound = 0x3c,
  Floatsum = 0x3d,
  FloatTruncate = 0x3e,

  StringAsBytes = 0x40,
  StringAsFloat = 0x41,
  StringAsInteger = 0x42,
  StringLength = 0x43,
  StringMatch = 0x44,
  StringParseJson = 0x45,
  StringParseXML = 0x46,
  StringAsBoolean = 0x47,
  StringToLowerCase = 0x48,
  StringToUpperCase = 0x49,

  ArrayAsBytes = 0x50,
  ArrayCount = 0x51,
  ArrayEvery = 0x52,
  ArrayFilter = 0x53,
  ArrayFlatten = 0x54,
  ArrayGet = 0x55,
  ArrayMap = 0x56,
  ArrayReduce = 0x57,
  ArraySome = 0x58,
  ArraySort = 0x59,
  ArrayTake = 0x5a,

  MapEntries = 0x60,
  MapGet = 0x61,
  MapKeys = 0x62,
  MapValues = 0x63,

  BytesAsArray = 0x70,
  BytesAsBoolean = 0x71,
  BytesAsFloat = 0x72,
  BytesAsInteger = 0x73,
  BytesAsMap = 0x74,
  BytesAsString = 0x75,
  BytesHash = 0x76,

  ResultGet = 0x80,
  ResultGetOr = 0x81,
  ResultIsOk = 0x82,
}

export enum MirArgumentKind {
  Array,
  Boolean,
  Bytes,
  Filter,
  Float,
  Inner,
  Integer,
  Map,
  Mapper,
  Passthrough,
  Reducer,
  Result,
  String,
}

export type MirArgument =
  | string
  | number
  | boolean
  | [Filter, number]
  | [Filter, string]
  | [Filter, boolean]
  | Reducer

export type MirOperator =
  | OperatorCode
  | [OperatorCode, MirArgument]
  | [OperatorCode, MirArgument, MirArgument]

export type MirScript = Array<MirOperator>

export type MirSource = {
  url: string
  script: MirScript
}

export type MirRequest = {
  notBefore: number
  retrieve: Array<MirSource>
  aggregate: MirScript
  tally: MirScript
}

export type Mir = {
  name: string
  description: string
  radRequest: MirRequest
}

export type GeneratedMarkupScript = {
  cache: any
  script: MarkupScript
}
export type OperatorInfo = {
  type: Type
  name: string
  arguments: Array<ArgumentInfo>
}

export type ArgumentInfo = { name: string; optional: boolean; type: MirArgumentKind }

export type OperatorInfos = {
  [T in OperatorCode]: OperatorInfo
}

export enum BooleanOperatorName {
  Negate = 'negate',
  Match = 'match',
  AsString = 'asString',
}

export enum IntegerOperatorName {
  Absolute = 'absolute',
  Power = 'power',
  Sum = 'sum',
  AsBytes = 'asBytes',
  AsFloat = 'asFloat',
  AsString = 'asString',
  GreaterThan = 'greaterThan',
  LessThan = 'lessThan',
  Match = 'match',
  Modulo = 'modulo',
  Multiply = 'multiply',
  Negate = 'negate',
  Reciprocal = 'reciprocal',
}

export enum FloatOperatorName {
  Absolute = 'absolute',
  AsBytes = 'asBytes',
  AsString = 'asString',
  Ceiling = 'ceiling',
  GreaterThan = 'greaterThan',
  LessThan = 'lessThan',
  Floor = 'floor',
  Modulo = 'modulo',
  Multiply = 'multiply',
  Negate = 'negate',
  Power = 'power',
  Sum = 'sum',
  Truncate = 'truncate',
  Reciprocal = 'reciprocal',
  Round = 'round',
}

export enum StringOperatorName {
  AsBytes = 'asBytes',
  AsFloat = 'asFloat',
  AsInteger = 'asInteger',
  Length = 'length',
  Match = 'match',
  ParseJson = 'parseJson',
  ParseXml = 'parseXml',
  AsBoolean = 'asBoolean',
  ToLowerCase = 'toLowerCase',
  ToUpperCase = 'toUpperCase',
}

export enum ArrayOperatorName {
  AsBytes = 'asBytes',
  Count = 'count',
  Every = 'every',
  Filter = 'filter',
  Flatten = 'flatten',
  Get = 'get',
  Map = 'map',
  Reduce = 'reduce',
  Some = 'some',
  Sort = 'sort',
  Take = 'take',
}

export enum MapOperatorName {
  Entries = 'entries',
  Get = 'get',
  Keys = 'keys',
  Values = 'values',
}

export enum BytesOperatorName {
  AsArray = 'asArray',
  AsBoolean = 'asBoolean',
  AsFloat = 'asFloat',
  AsInteger = 'asInteger',
  AsMap = 'asMap',
  AsString = 'asString',
  Hash = 'hash',
}

export enum ResultOperatorName {
  Get = 'get',
  GetOr = 'getOr',
  IsOk = 'isOk',
}

export type OperatorName =
  | BooleanOperatorName
  | IntegerOperatorName
  | FloatOperatorName
  | StringOperatorName
  | ArrayOperatorName
  | MapOperatorName
  | BytesOperatorName
  | ResultOperatorName

export type TypeSystem = {
  [Type.Boolean]: {
    [B in BooleanOperatorName]: [OperatorCode, Array<OutputType>]
  }
  [Type.Integer]: {
    [I in IntegerOperatorName]: [OperatorCode, Array<OutputType>]
  }
  [Type.Float]: {
    [F in FloatOperatorName]: [OperatorCode, Array<OutputType>]
  }
  [Type.String]: {
    [S in StringOperatorName]: [OperatorCode, Array<OutputType>]
  }
  [Type.Array]: {
    [A in ArrayOperatorName]: [OperatorCode, Array<OutputType>]
  }
  [Type.Map]: {
    [M in MapOperatorName]: [OperatorCode, Array<OutputType>]
  }
  [Type.Bytes]: {
    [B in BytesOperatorName]: [OperatorCode, Array<OutputType>]
  }
  [Type.Result]: {
    [R in ResultOperatorName]: [OperatorCode, Array<OutputType>]
  }
}

export type TypeSystemEntry =
  | [Type, { [B in BooleanOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [I in IntegerOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [F in FloatOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [S in StringOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [A in ArrayOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [M in MapOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [B in BytesOperatorName]: [OperatorCode, Array<OutputType>] }]
  | [Type, { [R in ResultOperatorName]: [OperatorCode, Array<OutputType>] }]

export type TypeSystemValue = [string, [OperatorCode, Array<OutputType>]]

export type FilterArgument = [Filter, number] | [Filter, string] | [Filter, boolean]
