import {
  TypeSystem,
  Type,
  BooleanOperatorName,
  OperatorCode,
  OutputType,
  IntegerOperatorName,
  FloatOperatorName,
  StringOperatorName,
  ArrayOperatorName,
  MapOperatorName,
  BytesOperatorName,
  ResultOperatorName,
  OperatorInfos,
  MirArgumentKind,
  CacheRef,
} from './types'
import { dummyHash } from './utils'

export const typeSystem: TypeSystem = {
  [Type.Boolean]: {
    [BooleanOperatorName.AsString]: [OperatorCode.BooleanAsString, [OutputType.String]],
    [BooleanOperatorName.Match]: [OperatorCode.BooleanMatch, [OutputType.Argument]],
    [BooleanOperatorName.Negate]: [OperatorCode.BooleanNegate, [OutputType.Boolean]],
  },
  [Type.Integer]: {
    [IntegerOperatorName.Absolute]: [OperatorCode.IntegerAbsolute, [OutputType.Integer]],
    [IntegerOperatorName.AsBytes]: [OperatorCode.IntegerAsBytes, [OutputType.Bytes]],
    [IntegerOperatorName.AsFloat]: [OperatorCode.IntegerAsFloat, [OutputType.Float]],
    [IntegerOperatorName.AsString]: [OperatorCode.IntegerAsString, [OutputType.String]],
    [IntegerOperatorName.GreaterThan]: [OperatorCode.IntegerGreaterThan, [OutputType.Boolean]],
    [IntegerOperatorName.LessThan]: [OperatorCode.IntegerLessThan, [OutputType.Boolean]],
    [IntegerOperatorName.Match]: [OperatorCode.IntegerMatch, [OutputType.Argument]],
    [IntegerOperatorName.Modulo]: [OperatorCode.IntegerModulo, [OutputType.Integer]],
    [IntegerOperatorName.Multiply]: [OperatorCode.IntegerMultiply, [OutputType.Integer]],
    [IntegerOperatorName.Negate]: [OperatorCode.IntegerNegate, [OutputType.Integer]],
    [IntegerOperatorName.Power]: [OperatorCode.IntegerPower, [OutputType.Integer]],
    [IntegerOperatorName.Reciprocal]: [OperatorCode.IntegerReciprocal, [OutputType.Float]],
    [IntegerOperatorName.Sum]: [OperatorCode.IntegerSum, [OutputType.Integer]],
  },
  [Type.Float]: {
    [FloatOperatorName.Absolute]: [OperatorCode.FloatAbsolute, [OutputType.Integer]],
    [FloatOperatorName.AsBytes]: [OperatorCode.FloatAsBytes, [OutputType.Bytes]],
    [FloatOperatorName.AsString]: [OperatorCode.FloatAsString, [OutputType.String]],
    [FloatOperatorName.Ceiling]: [OperatorCode.FloatCeiling, [OutputType.Integer]],
    [FloatOperatorName.GreaterThan]: [OperatorCode.FloatGraterThan, [OutputType.Boolean]],
    [FloatOperatorName.Floor]: [OperatorCode.FloatFloor, [OutputType.Integer]],
    [FloatOperatorName.LessThan]: [OperatorCode.FloatLessThan, [OutputType.Boolean]],
    [FloatOperatorName.Modulo]: [OperatorCode.FloatModulo, [OutputType.Float]],
    [FloatOperatorName.Multiply]: [OperatorCode.FloatMultiply, [OutputType.Float]],
    [FloatOperatorName.Negate]: [OperatorCode.FloatNegate, [OutputType.Float]],
    [FloatOperatorName.Power]: [OperatorCode.FloatPower, [OutputType.Float]],
    [FloatOperatorName.Reciprocal]: [OperatorCode.FloatReciprocal, [OutputType.Float]],
    [FloatOperatorName.Round]: [OperatorCode.FloatRound, [OutputType.Integer]],
    [FloatOperatorName.Sum]: [OperatorCode.Floatsum, [OutputType.Float]],
    [FloatOperatorName.Truncate]: [OperatorCode.FloatTruncate, [OutputType.Integer]],
  },

  [Type.String]: {
    [StringOperatorName.AsBytes]: [OperatorCode.StringAsBytes, [OutputType.Bytes]],
    [StringOperatorName.AsFloat]: [OperatorCode.StringAsFloat, [OutputType.Float]],
    [StringOperatorName.AsInteger]: [OperatorCode.StringAsInteger, [OutputType.Integer]],
    [StringOperatorName.Length]: [OperatorCode.StringLength, [OutputType.Integer]],
    [StringOperatorName.Match]: [OperatorCode.StringMatch, [OutputType.Argument]],
    [StringOperatorName.ParseJson]: [OperatorCode.StringParseJson, [OutputType.Bytes]],
    [StringOperatorName.ParseXml]: [OperatorCode.StringParseXML, [OutputType.Map]],
    [StringOperatorName.AsBoolean]: [OperatorCode.StringAsBoolean, [OutputType.Boolean]],
    [StringOperatorName.ToLowerCase]: [OperatorCode.StringToLowerCase, [OutputType.String]],
    [StringOperatorName.ToUpperCase]: [OperatorCode.StringToUpperCase, [OutputType.String]],
  },

  [Type.Array]: {
    [ArrayOperatorName.AsBytes]: [OperatorCode.ArrayAsBytes, [OutputType.Bytes]],
    [ArrayOperatorName.Count]: [OperatorCode.ArrayCount, [OutputType.Integer]],
    [ArrayOperatorName.Every]: [OperatorCode.ArrayEvery, [OutputType.Boolean]],
    [ArrayOperatorName.Filter]: [OperatorCode.ArrayFilter, [OutputType.Inner]],
    [ArrayOperatorName.Flatten]: [OperatorCode.ArrayFlatten, [OutputType.Passthrough]],
    [ArrayOperatorName.Get]: [OperatorCode.ArrayGet, [OutputType.Inner]],
    [ArrayOperatorName.Map]: [OperatorCode.ArrayMap, [OutputType.Argument]],
    [ArrayOperatorName.Reduce]: [OperatorCode.ArrayReduce, [OutputType.Inner]],
    [ArrayOperatorName.Some]: [OperatorCode.ArraySome, [OutputType.Boolean]],
    [ArrayOperatorName.Sort]: [OperatorCode.ArraySort, [OutputType.Inner]],
    [ArrayOperatorName.Take]: [OperatorCode.ArrayTake, [OutputType.Inner]],
  },
  [Type.Map]: {
    [MapOperatorName.Entries]: [OperatorCode.MapEntries, [OutputType.Bytes]],
    [MapOperatorName.Get]: [OperatorCode.MapGet, [OutputType.Inner]],
    [MapOperatorName.Keys]: [OperatorCode.MapKeys, [OutputType.String]],
    [MapOperatorName.Values]: [OperatorCode.MapValues, [OutputType.Inner]],
  },
  [Type.Bytes]: {
    [BytesOperatorName.AsArray]: [OperatorCode.BytesAsArray, [OutputType.Bytes]],
    [BytesOperatorName.AsBoolean]: [OperatorCode.BytesAsBoolean, [OutputType.Boolean]],
    [BytesOperatorName.AsFloat]: [OperatorCode.BytesAsFloat, [OutputType.Float]],
    [BytesOperatorName.AsInteger]: [OperatorCode.BytesAsInteger, [OutputType.Float]],
    [BytesOperatorName.AsMap]: [OperatorCode.BytesAsMap, [OutputType.Map, OutputType.Bytes]],
    [BytesOperatorName.AsString]: [OperatorCode.BytesAsString, [OutputType.String]],
    [BytesOperatorName.Hash]: [OperatorCode.BytesHash, [OutputType.Bytes]],
  },
  [Type.Result]: {
    [ResultOperatorName.Get]: [OperatorCode.ResultGet, [OutputType.Inner]],
    [ResultOperatorName.GetOr]: [OperatorCode.ResultGetOr, [OutputType.Inner]],
    [ResultOperatorName.IsOk]: [OperatorCode.ResultIsOk, [OutputType.Boolean]],
  },
}

export const operatorInfos: OperatorInfos = {
  [0x10]: {
    type: Type.Boolean,
    name: 'match',
    arguments: [
      {
        name: 'categories',
        optional: false,
        type: MirArgumentKind.Map,
      },
      {
        name: 'default',
        optional: false,
        type: MirArgumentKind.Inner,
      },
    ],
  },
  [0x11]: {
    type: Type.Boolean,
    name: 'negate',
    arguments: [],
  },
  [0x12]: {
    type: Type.Boolean,
    name: 'asString',
    arguments: [],
  },
  [0x20]: {
    type: Type.Integer,
    name: 'absolute',
    arguments: [],
  },
  [0x21]: {
    type: Type.Integer,
    name: 'asBytes',
    arguments: [],
  },
  [0x22]: {
    type: Type.Integer,
    name: 'asFloat',
    arguments: [],
  },
  [0x23]: {
    type: Type.Integer,
    name: 'asString',
    arguments: [
      {
        name: 'base',
        optional: true,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [0x24]: {
    type: Type.Integer,
    name: 'greaterThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [0x25]: {
    type: Type.Integer,
    name: 'lessThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [0x26]: {
    type: Type.Integer,
    name: 'match',
    arguments: [],
  },
  [0x27]: {
    type: Type.Integer,
    name: 'modulo',
    arguments: [
      {
        name: 'modulus',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [0x28]: {
    type: Type.Integer,
    name: 'multiply',
    arguments: [
      {
        name: 'factor',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [0x29]: {
    type: Type.Integer,
    name: 'negate',
    arguments: [],
  },
  [0x2a]: {
    type: Type.Integer,
    name: 'power',
    arguments: [
      {
        name: 'exponent',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [0x2b]: {
    type: Type.Integer,
    name: 'reciprocal',
    arguments: [],
  },
  [0x2c]: {
    type: Type.Integer,
    name: 'sum',
    arguments: [
      {
        name: 'addend',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [0x30]: {
    type: Type.Float,
    name: 'absolute',
    arguments: [],
  },
  [0x31]: {
    type: Type.Float,
    name: 'asBytes',
    arguments: [],
  },
  [0x32]: {
    type: Type.Float,
    name: 'asString',
    arguments: [
      {
        name: 'decimals',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [0x33]: {
    type: Type.Float,
    name: 'ceiling',
    arguments: [],
  },
  [0x34]: {
    type: Type.Float,
    name: 'greaterThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [0x35]: {
    type: Type.Float,
    name: 'floor',
    arguments: [],
  },
  [0x36]: {
    type: Type.Float,
    name: 'lessThan',
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [0x37]: {
    type: Type.Float,
    name: 'modulo',
    arguments: [
      {
        name: 'modulus',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [0x38]: {
    type: Type.Float,
    name: 'multiply',
    arguments: [
      {
        name: 'factor',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [0x39]: {
    type: Type.Float,
    name: 'negate',
    arguments: [],
  },
  [0x3a]: {
    type: Type.Float,
    name: 'power',
    arguments: [
      {
        name: 'exponent',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [0x3b]: {
    type: Type.Float,
    name: 'reciprocal',
    arguments: [],
  },
  [0x3c]: {
    type: Type.Float,
    name: 'round',
    arguments: [],
  },
  [0x3d]: {
    type: Type.Float,
    name: 'sum',
    arguments: [
      {
        name: 'addend',
        optional: false,
        type: MirArgumentKind.Float,
      },
    ],
  },
  [0x3e]: {
    type: Type.Float,
    name: 'truncate',
    arguments: [],
  },
  [0x40]: {
    type: Type.String,
    name: 'asBytes',
    arguments: [],
  },
  [0x41]: {
    type: Type.String,
    name: 'asFloat',
    arguments: [],
  },
  [0x42]: {
    type: Type.String,
    name: 'asInteger',
    arguments: [],
  },
  [0x43]: {
    type: Type.String,
    name: 'length',
    arguments: [],
  },
  [0x44]: {
    type: Type.String,
    name: 'match',
    arguments: [],
  },
  [0x45]: {
    type: Type.String,
    name: 'parseJson',
    arguments: [],
  },
  [0x46]: {
    type: Type.String,
    name: 'parseXml',
    arguments: [],
  },
  [0x47]: {
    type: Type.String,
    name: 'asBoolean',
    arguments: [],
  },
  [0x48]: {
    type: Type.String,
    name: 'toLowerCase',
    arguments: [],
  },
  [0x49]: {
    type: Type.String,
    name: 'toUpperCase',
    arguments: [],
  },

  [0x50]: {
    type: Type.Array,
    name: 'asBytes',
    arguments: [],
  },
  [0x51]: {
    type: Type.Array,
    name: 'count',
    arguments: [],
  },
  [0x52]: {
    type: Type.Array,
    name: 'every',
    arguments: [
      {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Filter,
      },
    ],
  },
  [0x53]: {
    type: Type.Array,
    name: 'filter',
    arguments: [
      {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Filter,
      },
    ],
  },
  [0x54]: {
    type: Type.Array,
    name: 'flatten',
    arguments: [
      {
        name: 'depth',
        optional: true,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [0x55]: {
    type: Type.Array,
    name: 'get',
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [0x56]: {
    type: Type.Array,
    name: 'map',
    arguments: [
      {
        name: 'operator',
        optional: false,
        type: MirArgumentKind.Mapper,
      },
    ],
  },
  [0x57]: {
    type: Type.Array,
    name: 'reduce',
    arguments: [
      {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Reducer,
      },
    ],
  },
  [0x58]: {
    type: Type.Array,
    name: 'some',
    arguments: [
      {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Filter,
      },
    ],
  },
  [0x59]: {
    type: Type.Array,
    name: 'sort',
    arguments: [
      {
        name: 'mapFunction',
        optional: false,
        type: MirArgumentKind.Mapper,
      },
      {
        name: 'ascending',
        optional: false,
        type: MirArgumentKind.Boolean,
      },
    ],
  },
  [0x5a]: {
    type: Type.Array,
    name: 'take',
    arguments: [
      {
        name: 'min',
        optional: true,
        type: MirArgumentKind.Integer,
      },
      {
        name: 'max',
        optional: true,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [0x60]: {
    type: Type.Map,
    name: 'entries',
    arguments: [],
  },
  [0x61]: {
    type: Type.Map,
    name: 'get',
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentKind.String,
      },
    ],
  },
  [0x62]: {
    type: Type.Map,
    name: 'keys',
    arguments: [],
  },
  [0x63]: {
    type: Type.Map,
    name: 'values',
    arguments: [],
  },
  [0x70]: {
    type: Type.Bytes,
    name: 'asArray',
    arguments: [],
  },
  [0x71]: {
    type: Type.Bytes,
    name: 'asBoolean',
    arguments: [],
  },
  [0x72]: {
    type: Type.Bytes,
    name: 'asFloat',
    arguments: [],
  },
  [0x73]: {
    type: Type.Bytes,
    name: 'asInteger',
    arguments: [
      {
        name: 'base',
        optional: true,
        type: MirArgumentKind.Integer,
      },
    ],
  },
  [0x74]: {
    type: Type.Bytes,
    name: 'asMap',
    arguments: [],
  },
  [0x75]: {
    type: Type.Bytes,
    name: 'asString',
    arguments: [],
  },
  [0x76]: {
    type: Type.Bytes,
    name: 'hash',
    arguments: [],
  },
  [0x80]: {
    type: Type.Result,
    name: 'get',
    arguments: [],
  },
  [0x81]: {
    type: Type.Result,
    name: 'getOr',
    arguments: [
      {
        name: 'default',
        optional: false,
        type: MirArgumentKind.Inner,
      },
    ],
  },
  [0x82]: {
    type: Type.Result,
    name: 'isOk',
    arguments: [],
  },
}

export class Cache<T> {
  private cache: {
    [key: string]: T
  }

  constructor() {
    this.cache = {}
  }

  get(cacheId: number): T {
    return this.cache[cacheId]
  }

  set(item: T): CacheRef {
    const id = dummyHash(JSON.stringify(item))
    this.cache[id] = item
    return { id }
  }
}
