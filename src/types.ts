import {
  Source,
  Script,
  Operator,
  Argument,
  AggregationTallyOperatorFilter,
  AggregationTallyOperatorReducer,
  AggregationTallyFilterArgument,
  AggregationTallyScript,
} from './radon'

export type CacheItem =
  | Source
  | Script
  | Operator
  | AggregationTallyOperatorFilter
  | AggregationTallyOperatorReducer
  | Argument
  | AggregationTallyFilterArgument
  | Array<number>
  | AggregationTallyScript
export type CacheRef = { id: number }
export enum CacheItemType {
  Array,
  Operator,
  InputArgument,
  SelectArgument,
}

export enum Stage {
  Retrieve = 'retrieve',
  Aggregate = 'aggregate',
  Tally = 'tally',
}

export enum Type {
  Boolean = 'Boolean',
  Integer = 'Integer',
  Float = 'Float',
  String = 'String',
  Array = 'Array',
  Map = 'Map',
  Bytes = 'Bytes',
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
  lessThan = 0x01,
  equals = 0x02,
  deviationAbsolute = 0x03,
  deviationRelative = 0x04,
  deviationStandard = 0x05,
  top = 0x06,
  bottom = 0x07,
  mode = 0x08,
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
  Array = 'array',
  ArrayArray = 'arrayArray',
  ArrayBoolean = 'arrayBoolean',
  ArrayBytes = 'arrayBytes',
  ArrayFloat = 'arrayFloat',
  ArrayInteger = 'arrayInteger',
  ArrayMap = 'arrayMap',
  ArrayString = 'arrayString',
  Boolean = 'boolean',
  Bytes = 'bytes',
  FilterOutput = 'filterOutput',
  Float = 'float',
  Inner = 'inner',
  Integer = 'integer',
  Map = 'map',
  MatchOutput = 'matchOutput',
  ReducerOutput = 'reducerOutput',
  Same = 'same',
  String = 'string',
  SubscriptOutput = 'subscriptOutput',
}

export enum MarkupHierarchicalType {
  Operator = 'operator',
  SelectedOperatorOption = 'selectedOperatorOption',
  OperatorOption = 'operatorOption',
  Argument = 'argument',
}

export enum MarkupInputType {
  Number = 'number',
  Boolean = 'boolean',
  String = 'string',
}

export type MarkupOption = {
  hierarchicalType: MarkupHierarchicalType.OperatorOption
  label: string
  markupType: MarkupType.Option
  outputType: OutputType | Array<OutputType>
}

export interface MarkupSelectedOption {
  // arguments: Array<MarkupInput | MarkupSelect> | []
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
  type: MarkupInputType
}

export type MarkupSelect = {
  id: number
  scriptId: number
  markupType: MarkupType.Select
  hierarchicalType: MarkupHierarchicalType.Operator | MarkupHierarchicalType.Argument
  outputType: Array<OutputType> | OutputType
  selected: MarkupSelectedOption
  options: Array<MarkupOption>
  label: string
  description?: () => String
}

export enum MarkupType {
  Select = 'select',
  Option = 'option',
  Input = 'input',
  Script = 'script',
}
export type MarkupOperator = MarkupSelect
export type MarkupArgument = MarkupSelect | MarkupInput | MarkupArgumentScript
export type MarkupArgumentScript = {
  id: Number
  subscript: MarkupScript
  label: string
  markupType: MarkupType.Script
  outputType: OutputType.SubscriptOutput
  hierarchicalType: MarkupHierarchicalType.Argument
}

export type MarkupSource = {
  kind: string
  url: string
  script: MarkupScript
  scriptId: number
}

export type MarkupScript = Array<MarkupOperator>

export type MarkupRequest = {
  timelock: number
  retrieve: Array<MarkupSource>
  aggregate: MarkupAggregationTallyScript
  tally: MarkupAggregationTallyScript
}

export type Markup = {
  name: string
  description: string
  radRequest: MarkupRequest
}

export enum OperatorCode {
  ArrayCount = 0x10,
  ArrayFilter = 0x11,
  ArrayFlatten = 0x12,
  ArrayGetArray = 0x13,
  ArrayGetBoolean = 0x14,
  ArrayGetBytes = 0x15,
  ArrayGetInteger = 0x16,
  ArrayGetFloat = 0x17,
  ArrayGetMap = 0x18,
  ArrayGetString = 0x1a,
  ArrayMap = 0x1b,
  ArrayReduce = 0x1c,
  ArraySome = 0x1d,
  ArraySort = 0x1e,
  ArrayTake = 0x1f,

  BooleanMatch = 0x20,
  BooleanNegate = 0x21,

  BytesAsString = 0x30,
  BytesHash = 0x31,

  IntegerAbsolute = 0x40,
  IntegerAsFloat = 0x41,
  IntegerAsString = 0x42,
  IntegerGreaterThan = 0x43,
  IntegerLessThan = 0x44,
  IntegerMatch = 0x45,
  IntegerModulo = 0x46,
  IntegerMultiply = 0x47,
  IntegerNegate = 0x48,
  IntegerPower = 0x49,
  IntegerReciprocal = 0x4a,
  IntegerSum = 0x4b,

  FloatAbsolute = 0x50,
  FloatAsString = 0x51,
  FloatCeiling = 0x52,
  FloatGraterThan = 0x53,
  FloatFloor = 0x54,
  FloatLessThan = 0x55,
  FloatModulo = 0x56,
  FloatMultiply = 0x57,
  FloatNegate = 0x58,
  FloatPower = 0x59,
  FloatReciprocal = 0x5a,
  FloatRound = 0x5b,
  Floatsum = 0x5c,
  FloatTruncate = 0x5d,

  MapEntries = 0x60,
  MapGetArray = 0x61,
  MapGetBoolean = 0x62,
  MapGetBytes = 0x63,
  MapGetInteger = 0x64,
  MapGetFloat = 0x65,
  MapGetMap = 0x66,
  MapGetString = 0x67,
  MapKeys = 0x68,
  MapValuesArray = 0x69,
  MapValuesBoolean = 0x6a,
  MapValuesBytes = 0x6b,
  MapValuesInteger = 0x6c,
  MapValuesFloat = 0x6d,
  MapValuesMap = 0x6e,
  MapValuesString = 0x6f,

  StringAsBoolean = 0x70,
  StringAsBytes = 0x71,
  StringAsFloat = 0x72,
  StringAsInteger = 0x73,
  StringLength = 0x74,
  StringMatch = 0x75,
  StringParseJsonArray = 0x76,
  StringParseJsonMap = 0x77,
  StringParseXML = 0x78,
  StringToLowerCase = 0x79,
  StringToUpperCase = 0x7a,
}

export enum MirArgumentType {
  Integer,
  Subscript,
  FilterFunction,
  ReducerFunction,
  Float,
  String,
  Boolean,
}

export enum MarkupArgumentType {
  Input,
  SelectFilter,
  SelectReduce,
  Subscript,
}

export type MirArgument =
  | string
  | number
  | boolean
  | [Filter, number]
  | [Filter, string]
  | [Filter, boolean]
  | MirScript
  | Reducer

export type MirAggregationTallyFilterOperator =
  | AggregationTallyFilter
  | [AggregationTallyFilter, number]
  | [AggregationTallyFilter, string]
  | [AggregationTallyFilter, boolean]

export type MirOperator =
  | OperatorCode
  | [OperatorCode, MirArgument]
  | [OperatorCode, MirArgument, MirArgument]

export enum AggregationTallyFilter {
  deviationAbsolute = 0x03,
  deviationRelative = 0x04,
  deviationStandard = 0x05,
  mode = 0x08,
}

export enum AggregationTallyReducer {
  mode = 0x02,
  averageMean = 0x03,
  averageMeanWeighted = 0x04,
  averageMedian = 0x05,
  averageMedianWeighted = 0x06,
}

export type MirScript = Array<MirOperator>
export type MirAggregationTallyScript = {
  filters: Array<MirAggregationTallyFilterOperator>
  reducer: AggregationTallyReducer
}

export type MarkupAggregationTallyScript = {
  filters: Array<MarkupSelect>
  reducer: MarkupSelect
}

export type MirSource = {
  kind: string
  url: string
  script: MirScript
}

export type MirRequest = {
  timelock: number
  retrieve: Array<MirSource>
  aggregate: MirAggregationTallyScript
  tally: MirAggregationTallyScript
}

export type Mir = {
  name: string
  description: string
  radRequest: MirRequest
}

export type GeneratedMarkupScript = {
  cache: Cache
  script: MarkupScript
}
export type OperatorInfo = {
  outputType: OutputType
  type: Type
  name: string
  arguments: Array<ArgumentInfo>
  description: (x: any, y?: any) => String
}

export type ArgumentInfo = { name: string; optional: boolean; type: MirArgumentType }

export type OperatorInfos = {
  [T in OperatorCode]: OperatorInfo
}

export enum ArrayOperatorName {
  Count = 'count',
  Filter = 'filter',
  Flatten = 'flatten',
  GetArray = 'getArray',
  GetBoolean = 'getBoolean',
  GetBytes = 'getBytes',
  GetInteger = 'getInteger',
  GetFloat = 'getFloat',
  GetMap = 'getMap',
  GetString = 'getString',
  Map = 'map',
  Reduce = 'reduce',
  Some = 'some',
  Sort = 'sort',
  Take = 'take',
}

export enum BooleanOperatorName {
  Negate = 'negate',
  Match = 'match',
}

export enum BytesOperatorName {
  AsString = 'asString',
  Hash = 'hash',
}

export enum IntegerOperatorName {
  Absolute = 'absolute',
  AsFloat = 'asFloat',
  AsString = 'asString',
  GreaterThan = 'greaterThan',
  LessThan = 'lessThan',
  Match = 'match',
  Modulo = 'modulo',
  Multiply = 'multiply',
  Negate = 'negate',
  Power = 'power',
  Reciprocal = 'reciprocal',
  Sum = 'sum',
}

export enum FloatOperatorName {
  Absolute = 'absolute',
  AsString = 'asString',
  Ceiling = 'ceiling',
  GreaterThan = 'greaterThan',
  Floor = 'floor',
  LessThan = 'lessThan',
  Modulo = 'modulo',
  Multiply = 'multiply',
  Negate = 'negate',
  Power = 'power',
  Reciprocal = 'reciprocal',
  Round = 'round',
  Sum = 'sum',
  Truncate = 'truncate',
}

export enum MapOperatorName {
  Entries = 'entries',
  GetArray = 'getArray',
  GetBoolean = 'getBoolean',
  GetBytes = 'getBytes',
  GetInteger = 'getInteger',
  GetFloat = 'getFloat',
  GetMap = 'getMap',
  GetString = 'getString',
  Keys = 'keys',
  valuesArray = 'valuesArray',
  valuesBoolean = 'valuesBoolean',
  valuesBytes = 'valuesBytes',
  valuesInteger = 'valuesInteger',
  valuesFloat = 'valuesFloat',
  valuesMap = 'valuesMap',
  valuesString = 'valuesString',
}

export enum StringOperatorName {
  AsBoolean = 'asBoolean',
  AsBytes = 'asBytes',
  AsFloat = 'asFloat',
  AsInteger = 'asInteger',
  Length = 'length',
  Match = 'match',
  ParseJsonArray = 'parseJsonArray',
  ParseJsonMap = 'parseJsonMap',
  ParseXml = 'parseXml',
  ToLowerCase = 'toLowerCase',
  ToUpperCase = 'toUpperCase',
}

export type OperatorName =
  | BooleanOperatorName
  | IntegerOperatorName
  | FloatOperatorName
  | StringOperatorName
  | ArrayOperatorName
  | MapOperatorName
  | BytesOperatorName

export type TypeSystem = {
  [Type.Boolean]: {
    [B in BooleanOperatorName]: [OperatorCode, OutputType]
  }
  [Type.Integer]: {
    [I in IntegerOperatorName]: [OperatorCode, OutputType]
  }
  [Type.Float]: {
    [F in FloatOperatorName]: [OperatorCode, OutputType]
  }
  [Type.String]: {
    [S in StringOperatorName]: [OperatorCode, OutputType]
  }
  [Type.Array]: {
    [A in ArrayOperatorName]: [OperatorCode, OutputType]
  }
  [Type.Map]: {
    [M in MapOperatorName]: [OperatorCode, OutputType]
  }
  [Type.Bytes]: {
    [B in BytesOperatorName]: [OperatorCode, OutputType]
  }
}
