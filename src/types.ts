import { AggregationTallyFilterArgument } from './aggregationTallyFilterArgument.js'
import { AggregationTallyOperatorFilter } from './aggregationTallyOperatorFilter.js'
import { AggregationTallyOperatorReducer } from './aggregationTallyOperatorReducer.js'
import { AggregationTallyScript } from './aggregationTallyScript.js'
import { Argument } from './argument.js'
import { Operator } from './operator.js'
import { Script } from './script.js'
import { Source } from './source.js'
import { Cache } from './structures.js'
import { I18n } from './i18n.js'
import { OutgoingHttpHeaders } from 'http'

export type EventEmitter = {
  emit: Function
}

export enum EventName {
  Update,
}

// TODO: remove any
export type Event = {
  name: EventName
  data: any
}

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

export type Context = { cache: Cache; i18n: I18n }

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
  //min = 0x00,
  //max = 0x01,
  mode = 0x02,
  averageMean = 0x03,
  //averageMeanWeighted = 0x04,
  averageMedian = 0x05,
  //averageMedianWeighted = 0x06,
  deviationStandard = 0x07,
  //deviationAverage = 0x08,
  //deviationMedian = 0x09,
  //deviationMaximum = 0x0a,
  hashConcatenate = 0x0b,
}

export enum Filter {
  //greaterThan = 0x00,
  //lessThan = 0x01,
  //equals = 0x02,
  //deviationAbsolute = 0x03,
  //deviationRelative = 0x04,
  deviationStandard = 0x05,
  mode = 0x08,
  //top = 0x06,
  //bottom = 0x07,
  //lessOrEqualThan = 0x80,
  //greaterOrEqualThan = 0x81,
  //notEquals = 0x82,
  //notDeviationAbsolute = 0x83,
  //notDeviationRelative = 0x84,
  //notDeviationStandard = 0x85,
  //notTop = 0x86,
  //notBottom = 0x87,
  //notMode = 0x88,
  custom = 0xff,
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
  JoinOutput = 'joinOutput',
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
  Map = 'map',
}

export type MarkupOption = {
  hierarchicalType: MarkupHierarchicalType.OperatorOption
  label: string | boolean
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
  kind: Kind
  kindOptions: KindOptions
  headers: OutgoingHttpHeaders
  body?: object
  url: string
  contentType: string
  contentTypeOptions: ContentTypeOptions
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

export type KindOptions = Array<Kind>

export enum Kind {
  HttpGet = 'HTTP-GET',
  HttpPost = 'HTTP-POST',
  HttpHead = 'HTTP-HEAD',
  RNG = 'RNG',
}

export enum OperatorCode {
  ArrayCount = 0x10,
  ArrayFilter = 0x11,
  ArrayJoin = 0x12,
  ArrayGetArray = 0x13,
  ArrayGetBoolean = 0x14,
  ArrayGetBytes = 0x15,
  ArrayGetFloat = 0x16,
  ArrayGetInteger = 0x17,
  ArrayGetMap = 0x18,
  ArrayGetString = 0x19,
  ArrayMap = 0x1a,
  ArrayReduce = 0x1b,
  ArraySort = 0x1d,
  ArrayPick = 0x1e,

  BooleanNegate = 0x22,
  BooleanAsString = 0x20,

  BytesAsInteger = 0x32,
  BytesHash = 0x31,
  BytesLength = 0x34,
  BytesSlice = 0x3c,
  BytesStringify = 0x30,

  IntegerAbsolute = 0x40,
  IntegerGreaterThan = 0x43,
  IntegerLessThan = 0x44,
  IntegerModulo = 0x46,
  IntegerMultiply = 0x47,
  IntegerNegate = 0x48,
  IntegerPower = 0x49,
  IntegerToBytes = 0x4a,
  IntegerToFloat = 0x41,
  IntegerAsString = 0x42,

  FloatAbsolute = 0x50,
  FloatCeiling = 0x52,
  FloatFloor = 0x54,
  FloatGreaterThan = 0x53,
  FloatLessThan = 0x55,
  FloatModulo = 0x56,
  FloatMultiply = 0x57,
  FloatNegate = 0x58,
  FloatPower = 0x59,
  FloatRound = 0x5b,
  FloatAsString = 0x51,
  FloatTruncate = 0x5d,
  MapGetArray = 0x61,
  MapGetBoolean = 0x62,
  MapGetBytes = 0x63,
  MapGetFloat = 0x64,
  MapGetInteger = 0x65,
  MapGetMap = 0x66,
  MapGetString = 0x67,
  MapKeys = 0x68,
  MapValues = 0x69,
  //MapEntries = 0x6a,
  MapAlter = 0x6b,
  MapPick = 0x6e,
  MapStringify = 0x60,

  StringAsBoolean = 0x70,
  StringAsBytes = 0x71,
  StringAsFloat = 0x72,
  StringAsInteger = 0x73,
  StringLength = 0x74,
  StringMatch = 0x75,
  StringParseJsonArray = 0x76,
  StringParseJsonMap = 0x77,
  StringParseXmlMap = 0x78,
  StringReplace = 0x7b,
  StringSlice = 0x7c,
  StringSplit = 0x7d,
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
  Map,
  Array,
}

export enum MarkupArgumentType {
  Input,
  SelectBoolean,
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
  | [Filter, MirScript]
  | MirScript
  | Reducer
  | Object

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
  deviationStandard = 0x05,
  mode = 0x08,
}

export enum AggregationTallyReducer {
  mode = 0x02,
  averageMean = 0x03,
  averageMedian = 0x05,
  deviationStandard = 0x07,
  hashConcatenate = 0x0b,
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
  kind: Kind
  headers: OutgoingHttpHeaders
  body?: object
  kindOptions: KindOptions
  url: string
  contentType: string
  contentTypeOptions: ContentTypeOptions
  script: MirScript
}

export type ContentTypeOptions = {
  [Kind.HttpGet]: string | Array<string>
  [Kind.RNG]: string
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
  description: (i18n: I18n) => (x: any, y?: any) => string
}

export type ArgumentInfo = { name: string; optional: boolean; type: MirArgumentType }

export type OperatorInfos = {
  [T in OperatorCode]: OperatorInfo
}

export enum ArrayOperatorName {
  Count = 'count',
  Filter = 'filter',
  Join = 'join',
  GetArray = 'getArray',
  GetBoolean = 'getBoolean',
  GetBytes = 'getBytes',
  GetInteger = 'getInteger',
  GetFloat = 'getFloat',
  GetMap = 'getMap',
  GetString = 'getString',
  Map = 'map',
  Reduce = 'reduce',
  Sort = 'sort',
  Pick = 'pick',
}

export enum BooleanOperatorName {
  Negate = 'negate',
  AsString = 'toString',
}

export enum BytesOperatorName {
  AsInteger = 'asInteger',
  Hash = 'hash',
  Length = 'length',
  Slice = 'slice',
  Stringify = 'stringify',
}

export enum IntegerOperatorName {
  Absolute = 'absolute',
  GreaterThan = 'greaterThan',
  LessThan = 'lessThan',
  Modulo = 'modulo',
  Multiply = 'multiply',
  Negate = 'negate',
  Power = 'power',
  ToBytes = 'toBytes',
  ToFloat = 'toFloat',
  AsString = 'stringify',
}

export enum FloatOperatorName {
  Absolute = 'absolute',
  Ceiling = 'ceiling',
  GreaterThan = 'greaterThan',
  Floor = 'floor',
  LessThan = 'lessThan',
  Modulo = 'modulo',
  Multiply = 'multiply',
  Negate = 'negate',
  Power = 'power',
  Round = 'round',
  AsString = 'stringify',
  Truncate = 'truncate',
}

export enum MapOperatorName {
  Alter = 'alter',
  GetArray = 'getArray',
  GetBoolean = 'getBoolean',
  GetBytes = 'getBytes',
  GetInteger = 'getInteger',
  GetFloat = 'getFloat',
  GetMap = 'getMap',
  GetString = 'getString',
  Keys = 'keys',
  Pick = 'pick',
  Stringify = 'stringify',
  Values = 'values',
}

export enum StringOperatorName {
  AsBoolean = 'asBoolean',
  AsBytes = 'asBytes',
  AsFloat = 'asFloat',
  AsInteger = 'asInteger',
  Length = 'length',
  Match = 'match',
  ParseJsonArray = 'parseJSONArray',
  ParseJsonMap = 'parseJSONMap',
  ParseXmlMap = 'parseXMLMap',
  Replace = 'replace',
  Slice = 'slice',
  Split = 'split',
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

export type AggregationTallyFilterDescriptions = {
  [T in AggregationTallyFilter]: (i18n: I18n) => (arg1?: any) => string
}
export type AggregationTallyReducerDescriptions = {
  [T in AggregationTallyReducer]: (i18n: I18n) => (arg1?: any) => string
}
