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
  OperatorInfos,
  MirArgumentType,
  CacheItem,
  CacheRef,
  AggregationTallyFilter,
  AggregationTallyReducer,
  AggregationTallyFilterDescriptions,
  AggregationTallyReducerDescriptions,
} from './types'
import { I18n } from './i18n'
import { getEnumNames } from './utils'
export const typeSystem: TypeSystem = {
  [Type.Array]: {
    [ArrayOperatorName.Count]: [OperatorCode.ArrayCount, OutputType.Integer],
    [ArrayOperatorName.Filter]: [OperatorCode.ArrayFilter, OutputType.Same],
    //[ArrayOperatorName.Flatten]: [OperatorCode.ArrayFlatten, OutputType.Array],
    [ArrayOperatorName.GetArray]: [OperatorCode.ArrayGetArray, OutputType.Array],
    [ArrayOperatorName.GetBoolean]: [OperatorCode.ArrayGetBoolean, OutputType.Boolean],
    [ArrayOperatorName.GetBytes]: [OperatorCode.ArrayGetBytes, OutputType.Bytes],
    [ArrayOperatorName.GetFloat]: [OperatorCode.ArrayGetFloat, OutputType.Float],
    [ArrayOperatorName.GetInteger]: [OperatorCode.ArrayGetInteger, OutputType.Integer],
    [ArrayOperatorName.GetMap]: [OperatorCode.ArrayGetMap, OutputType.Map],
    [ArrayOperatorName.GetString]: [OperatorCode.ArrayGetString, OutputType.String],
    [ArrayOperatorName.Map]: [OperatorCode.ArrayMap, OutputType.ArrayMap],
    [ArrayOperatorName.Reduce]: [OperatorCode.ArrayReduce, OutputType.Inner],
    //[ArrayOperatorName.Some]: [OperatorCode.ArraySome, OutputType.FilterOutput],
    [ArrayOperatorName.Sort]: [OperatorCode.ArraySort, OutputType.Same],
    //[ArrayOperatorName.Take]: [OperatorCode.ArrayTake, OutputType.Array],
  },
  [Type.Boolean]: {
    [BooleanOperatorName.AsString]: [OperatorCode.BooleanAsString, OutputType.String],
    //[BooleanOperatorName.Match]: [OperatorCode.BooleanMatch, OutputType.MatchOutput],
    [BooleanOperatorName.Negate]: [OperatorCode.BooleanNegate, OutputType.Boolean],
  },
  [Type.Bytes]: {
    [BytesOperatorName.AsString]: [OperatorCode.BytesAsString, OutputType.String],
    [BytesOperatorName.Hash]: [OperatorCode.BytesHash, OutputType.Bytes],
  },
  [Type.Integer]: {
    [IntegerOperatorName.Absolute]: [OperatorCode.IntegerAbsolute, OutputType.Integer],
    [IntegerOperatorName.AsFloat]: [OperatorCode.IntegerAsFloat, OutputType.Float],
    [IntegerOperatorName.AsString]: [OperatorCode.IntegerAsString, OutputType.String],
    [IntegerOperatorName.GreaterThan]: [OperatorCode.IntegerGreaterThan, OutputType.Boolean],
    [IntegerOperatorName.LessThan]: [OperatorCode.IntegerLessThan, OutputType.Boolean],
    // [IntegerOperatorName.Match]: [OperatorCode.IntegerMatch, OutputType.MatchOutput],
    [IntegerOperatorName.Modulo]: [OperatorCode.IntegerModulo, OutputType.Integer],
    [IntegerOperatorName.Multiply]: [OperatorCode.IntegerMultiply, OutputType.Integer],
    [IntegerOperatorName.Negate]: [OperatorCode.IntegerNegate, OutputType.Integer],
    [IntegerOperatorName.Power]: [OperatorCode.IntegerPower, OutputType.Integer],
    //[IntegerOperatorName.Reciprocal]: [OperatorCode.IntegerReciprocal, OutputType.Float],
    //[IntegerOperatorName.Sum]: [OperatorCode.IntegerSum, OutputType.Integer],
  },
  [Type.Float]: {
    [FloatOperatorName.Absolute]: [OperatorCode.FloatAbsolute, OutputType.Float],
    [FloatOperatorName.AsString]: [OperatorCode.FloatAsString, OutputType.String],
    [FloatOperatorName.Ceiling]: [OperatorCode.FloatCeiling, OutputType.Integer],
    [FloatOperatorName.GreaterThan]: [OperatorCode.FloatGreaterThan, OutputType.Boolean],
    [FloatOperatorName.Floor]: [OperatorCode.FloatFloor, OutputType.Integer],
    [FloatOperatorName.LessThan]: [OperatorCode.FloatLessThan, OutputType.Boolean],
    [FloatOperatorName.Modulo]: [OperatorCode.FloatModulo, OutputType.Float],
    [FloatOperatorName.Multiply]: [OperatorCode.FloatMultiply, OutputType.Float],
    [FloatOperatorName.Negate]: [OperatorCode.FloatNegate, OutputType.Float],
    [FloatOperatorName.Power]: [OperatorCode.FloatPower, OutputType.Float],
    //[FloatOperatorName.Reciprocal]: [OperatorCode.FloatReciprocal, OutputType.Float],
    [FloatOperatorName.Round]: [OperatorCode.FloatRound, OutputType.Integer],
    //[FloatOperatorName.Sum]: [OperatorCode.Floatsum, OutputType.Float],
    [FloatOperatorName.Truncate]: [OperatorCode.FloatTruncate, OutputType.Integer],
  },
  [Type.Map]: {
    //[MapOperatorName.Entries]: [OperatorCode.MapEntries, OutputType.Bytes],
    [MapOperatorName.GetArray]: [OperatorCode.MapGetArray, OutputType.Array],
    [MapOperatorName.GetBoolean]: [OperatorCode.MapGetBoolean, OutputType.Boolean],
    [MapOperatorName.GetBytes]: [OperatorCode.MapGetBytes, OutputType.Bytes],
    [MapOperatorName.GetFloat]: [OperatorCode.MapGetFloat, OutputType.Float],
    [MapOperatorName.GetInteger]: [OperatorCode.MapGetInteger, OutputType.Integer],
    [MapOperatorName.GetMap]: [OperatorCode.MapGetMap, OutputType.Map],
    [MapOperatorName.GetString]: [OperatorCode.MapGetString, OutputType.String],
    [MapOperatorName.Keys]: [OperatorCode.MapKeys, OutputType.ArrayString],
    [MapOperatorName.valuesArray]: [OperatorCode.MapValuesArray, OutputType.ArrayArray],
    //[MapOperatorName.valuesBoolean]: [OperatorCode.MapValuesBoolean, OutputType.ArrayBoolean],
    //[MapOperatorName.valuesBytes]: [OperatorCode.MapValuesBytes, OutputType.ArrayBytes],
    //[MapOperatorName.valuesFloat]: [OperatorCode.MapValuesFloat, OutputType.ArrayFloat],
    //[MapOperatorName.valuesInteger]: [OperatorCode.MapValuesInteger, OutputType.ArrayInteger],
    //[MapOperatorName.valuesMap]: [OperatorCode.MapValuesMap, OutputType.ArrayMap],
    //[MapOperatorName.valuesString]: [OperatorCode.MapValuesString, OutputType.ArrayString],
  },
  [Type.String]: {
    [StringOperatorName.AsBoolean]: [OperatorCode.StringAsBoolean, OutputType.Boolean],
    //[StringOperatorName.AsBytes]: [OperatorCode.StringAsBytes, OutputType.Bytes],
    [StringOperatorName.AsFloat]: [OperatorCode.StringAsFloat, OutputType.Float],
    [StringOperatorName.AsInteger]: [OperatorCode.StringAsInteger, OutputType.Integer],
    [StringOperatorName.Length]: [OperatorCode.StringLength, OutputType.Integer],
    [StringOperatorName.Match]: [OperatorCode.StringMatch, OutputType.MatchOutput],
    [StringOperatorName.ParseJsonArray]: [OperatorCode.StringParseJsonArray, OutputType.Array],
    [StringOperatorName.ParseJsonMap]: [OperatorCode.StringParseJsonMap, OutputType.Map],
    [StringOperatorName.ParseXmlMap]: [OperatorCode.StringParseXmlMap, OutputType.Map],
    [StringOperatorName.ToLowerCase]: [OperatorCode.StringToLowerCase, OutputType.String],
    [StringOperatorName.ToUpperCase]: [OperatorCode.StringToUpperCase, OutputType.String],
  },
}

const descriptions = {
  getKey: (i18n: I18n) => (inputType: string = 'inputType', outputType: string = 'outputType') => (
    key: string = 'key'
  ) => {
    return i18n.t('operator_info_description.get_key', { key, inputType, outputType })
  },
  mapValues: (i18n: I18n) => (type: string = 'type') =>
    i18n.t('operator_info_description.map.values', { type }),
  cast: (i18n: I18n) => (inputType: string = 'inputType', outputType: string = 'outputType') =>
    i18n.t('operator_info_description.cast', { outputType, inputType }),
}

export const aggregationTallyFilterDescriptions: AggregationTallyFilterDescriptions = {
  [AggregationTallyFilter.deviationStandard]: (i18n: I18n) => (
    number: string | number = 'number'
  ): string => i18n.t('aggregation_tally_description.filter.deviation_standard', { number }),
  [AggregationTallyFilter.mode]: (i18n: I18n) => () =>
    i18n.t('aggregation_tally_description.filter.mode'),
}

export const aggregationTallyReducerDescriptions: AggregationTallyReducerDescriptions = {
  [AggregationTallyReducer.mode]: (i18n: I18n) => () =>
    i18n.t('aggregation_tally_description.reducer.mode'),
  [AggregationTallyReducer.averageMean]: (i18n: I18n) => () =>
    i18n.t('aggregation_tally_description.reducer.average_mean'),
  [AggregationTallyReducer.averageMedian]: (i18n: I18n) => () =>
    i18n.t('aggregation_tally_description.reducer.average_median'),
  [AggregationTallyReducer.deviationStandard]: (i18n: I18n) => () =>
    i18n.t('aggregation_tally_description.reducer.deviation_standard'),
  [AggregationTallyReducer.hashConcatenate]: (i18n: I18n) => () =>
    i18n.t('aggregation_tally_description.reducer.hash_concatenate'),
}

// FIXME(#21): update match operators information
export const operatorInfos: OperatorInfos = {
  [OperatorCode.ArrayCount]: {
    type: Type.Array,
    name: ArrayOperatorName.Count,
    arguments: [],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.array.count'),
  },
  [OperatorCode.ArrayFilter]: {
    type: Type.Array,
    name: ArrayOperatorName.Filter,
    arguments: [
      {
        name: 'function',
        optional: false,
        type: MirArgumentType.FilterFunction,
      },
    ],
    outputType: OutputType.Same,
    description: (i18n: I18n) => (filter: string = 'filter') =>
      i18n.t('operator_info_description.array.filter', { filter }),
  },
  /*[OperatorCode.ArrayFlatten]: {
    type: Type.Array,
    name: ArrayOperatorName.Flatten,
    arguments: [
      {
        name: 'depth',
        optional: true,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Inner,
    description: (i18n: I18n) => (depth: string = 'depth') =>
      i18n.t('operator_info_description.array.flatten', { depth }),
  },*/
  [OperatorCode.ArrayGetArray]: {
    type: Type.Array,
    name: ArrayOperatorName.GetArray,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Array,
    description: (i18n: I18n) => descriptions.getKey(i18n)('Array', 'Array'),
  },
  [OperatorCode.ArrayGetBoolean]: {
    type: Type.Boolean,
    name: ArrayOperatorName.GetBoolean,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Boolean,
    description: (i18n: I18n) => descriptions.getKey(i18n)('Array', 'Boolean'),
  },
  [OperatorCode.ArrayGetBytes]: {
    type: Type.Array,
    name: ArrayOperatorName.GetBytes,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Bytes,
    description: (i18n: I18n) => descriptions.getKey(i18n)('Array', 'Bytes'),
  },
  [OperatorCode.ArrayGetInteger]: {
    type: Type.Array,
    name: ArrayOperatorName.GetInteger,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => descriptions.getKey(i18n)('Array', 'Integer'),
  },
  [OperatorCode.ArrayGetFloat]: {
    type: Type.Array,
    name: ArrayOperatorName.GetFloat,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Float,
    description: (i18n: I18n) => descriptions.getKey(i18n)('Array', 'Float'),
  },
  [OperatorCode.ArrayGetMap]: {
    type: Type.Array,
    name: ArrayOperatorName.GetMap,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Map,
    description: (i18n: I18n) => {
      return descriptions.getKey(i18n)('Array', 'Map')
    },
  },
  [OperatorCode.ArrayGetString]: {
    type: Type.Array,
    name: ArrayOperatorName.GetString,
    arguments: [
      {
        name: 'index',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.String,
    description: (i18n: I18n) => descriptions.getKey(i18n)('Array', 'String'),
  },
  [OperatorCode.ArrayMap]: {
    type: Type.Array,
    name: ArrayOperatorName.Map,
    arguments: [
      {
        name: 'script',
        optional: false,
        type: MirArgumentType.Subscript,
      },
    ],
    outputType: OutputType.SubscriptOutput,
    description: (i18n: I18n) => (subscript) =>
      i18n.t('operator_info_description.array.map', { subscript }),
  },
  [OperatorCode.ArrayReduce]: {
    type: Type.Array,
    name: ArrayOperatorName.Reduce,
    arguments: [
      {
        name: 'function',
        optional: false,
        type: MirArgumentType.ReducerFunction,
      },
    ],
    outputType: OutputType.Inner,
    description: (i18n: I18n) => (outputType: string = 'outputType', reducer: string = 'reducer') =>
      i18n.t('operator_info_description.array.reduce', { outputType, reducer }),
  },
  /*[OperatorCode.ArraySome]: {
    type: Type.Array,
    name: ArrayOperatorName.Some,
    arguments: [
      {
        name: 'function',
        optional: false,
        type: MirArgumentType.FilterFunction,
      },
    ],
    outputType: OutputType.Boolean,
    description: (i18n: I18n) => (filter: string = 'filter') =>
      i18n.t('operator_info_description.array.some', { filter }),
  },*/
  [OperatorCode.ArraySort]: {
    type: Type.Array,
    name: ArrayOperatorName.Sort,
    arguments: [
      {
        name: 'mapFunction',
        optional: false,
        type: MirArgumentType.Subscript,
      },
      {
        name: 'ascending',
        optional: false,
        type: MirArgumentType.Boolean,
      },
    ],
    outputType: OutputType.Same,
    description: (i18n: I18n) => (order: string = 'order') =>
      i18n.t('operator_info_description.array.sort', { order }),
  },
  /*[OperatorCode.ArrayTake]: {
    type: Type.Array,
    name: ArrayOperatorName.Take,
    arguments: [
      { name: 'min', optional: true, type: MirArgumentType.Integer },
      {
        name: 'max',
        optional: true,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Array,
    description: (i18n: I18n) => (min, max) =>
      i18n.t('operator_info_description.array.take', { min, max }),
  },*/
  [OperatorCode.BooleanAsString]: {
    type: Type.Boolean,
    name: BooleanOperatorName.AsString,
    arguments: [],
    outputType: OutputType.String,
    description: (i18n: I18n) => () => descriptions.cast(i18n)('Boolean', 'String'),
  },
  /*[OperatorCode.BooleanMatch]: {
    type: Type.Boolean,
    name: BooleanOperatorName.Match,
    arguments: [
      {
        name: 'categories',
        optional: false,
        type: MirArgumentType.Map,
      },
      {
        name: 'default',
        optional: false,
        type: MirArgumentType.Boolean,
      },
    ],
    outputType: OutputType.MatchOutput,
    description: (i18n: I18n) => (subscript: string = 'subscript') =>
      i18n.t('operator_info_description.boolean.match', { subscript }),
  },*/
  [OperatorCode.BooleanNegate]: {
    type: Type.Boolean,
    name: BooleanOperatorName.Negate,
    arguments: [],
    outputType: OutputType.Boolean,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.boolean.negate'),
  },
  [OperatorCode.BytesAsString]: {
    type: Type.Bytes,
    name: BytesOperatorName.AsString,
    arguments: [],
    outputType: OutputType.String,
    description: (i18n: I18n) => () => descriptions.cast(i18n)('Bytes', 'String'),
  },
  [OperatorCode.BytesHash]: {
    type: Type.Bytes,
    name: BytesOperatorName.Hash,
    arguments: [],
    outputType: OutputType.Bytes,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.bytes.hash'),
  },
  [OperatorCode.IntegerAbsolute]: {
    type: Type.Integer,
    name: IntegerOperatorName.Absolute,
    arguments: [],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.integer.absolute'),
  },
  [OperatorCode.IntegerAsFloat]: {
    type: Type.Integer,
    name: IntegerOperatorName.AsFloat,
    arguments: [],
    outputType: OutputType.Float,
    description: (i18n: I18n) => () => descriptions.cast(i18n)('Integer', 'Float'),
  },
  [OperatorCode.IntegerAsString]: {
    type: Type.Integer,
    name: IntegerOperatorName.AsString,
    arguments: [
      {
        name: 'base',
        optional: true,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.String,
    description: (i18n: I18n) => () => descriptions.cast(i18n)('Integer', 'String'),
  },
  [OperatorCode.IntegerGreaterThan]: {
    type: Type.Integer,
    name: IntegerOperatorName.GreaterThan,
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Boolean,
    description: (i18n: I18n) => (argument: string = 'argument') =>
      i18n.t('operator_info_description.integer.greater_than', { argument }),
  },
  [OperatorCode.IntegerLessThan]: {
    type: Type.Integer,
    name: IntegerOperatorName.LessThan,
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Boolean,
    description: (i18n: I18n) => (argument: string = 'argument') =>
      i18n.t('operator_info_description.integer.less_than', { argument }),
  },
  // [OperatorCode.IntegerMatch]: {
  //   type: Type.Integer,
  //   name: IntegerOperatorName.Match,
  //   arguments: [
  //     {
  //       name: 'categories',
  //       optional: false,
  //       type: MirArgumentType.Map,
  //     },
  //     {
  //       name: 'default',
  //       optional: false,
  //       type: MirArgumentType.Boolean,
  //     },
  //   ],
  //   outputType: OutputType.MatchOutput,
  //   description: (i18n: I18n) => (subscript: string = 'subscript') =>
  //     i18n.t('operator_info_description.integer.match', { subscript }),
  // },
  [OperatorCode.IntegerModulo]: {
    type: Type.Integer,
    name: 'modulo',
    arguments: [
      {
        name: 'modulus',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => (argument: string = 'argument') =>
      i18n.t('operator_info_description.integer.modulo', { argument }),
  },
  [OperatorCode.IntegerMultiply]: {
    type: Type.Integer,
    name: IntegerOperatorName.Multiply,
    arguments: [
      {
        name: 'factor',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => (factor: string = 'factor') =>
      i18n.t('operator_info_description.integer.multiply', { factor }),
  },
  [OperatorCode.IntegerNegate]: {
    type: Type.Integer,
    name: IntegerOperatorName.Negate,
    arguments: [],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.integer.negate'),
  },
  [OperatorCode.IntegerPower]: {
    type: Type.Integer,
    name: IntegerOperatorName.Power,
    arguments: [
      {
        name: 'exponent',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => (exponent: string = 'exponent') =>
      i18n.t('operator_info_description.integer.power', { exponent }),
  },
  /*[OperatorCode.IntegerReciprocal]: {
    type: Type.Integer,
    name: IntegerOperatorName.Reciprocal,
    arguments: [],
    outputType: OutputType.Float,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.integer.reciprocal'),
  },*/
  /*[OperatorCode.IntegerSum]: {
    type: Type.Integer,
    name: IntegerOperatorName.Sum,
    arguments: [
      {
        name: 'addend',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => (addend: string = 'addend') =>
      i18n.t('operator_info_description.integer.sum', { addend }),
  },*/
  [OperatorCode.FloatAbsolute]: {
    type: Type.Float,
    name: IntegerOperatorName.Absolute,
    arguments: [],
    outputType: OutputType.Float,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.float.absolute'),
  },
  [OperatorCode.FloatAsString]: {
    type: Type.Float,
    name: FloatOperatorName.AsString,
    arguments: [
      {
        name: 'decimals',
        optional: false,
        type: MirArgumentType.Integer,
      },
    ],
    outputType: OutputType.String,
    description: (i18n: I18n) => () => descriptions.cast(i18n)('Float', 'String'),
  },
  [OperatorCode.FloatCeiling]: {
    type: Type.Float,
    name: FloatOperatorName.Ceiling,
    arguments: [],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.float.celling'),
  },
  [OperatorCode.FloatGreaterThan]: {
    type: Type.Float,
    name: FloatOperatorName.GreaterThan,
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentType.Float,
      },
    ],
    outputType: OutputType.Boolean,
    description: (i18n: I18n) => (value: string = 'value') =>
      i18n.t('operator_info_description.float.greater_than', { value }),
  },
  [OperatorCode.FloatFloor]: {
    type: Type.Float,
    name: FloatOperatorName.Floor,
    arguments: [],
    outputType: OutputType.Float,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.float.floor'),
  },
  [OperatorCode.FloatLessThan]: {
    type: Type.Float,
    name: FloatOperatorName.LessThan,
    arguments: [
      {
        name: 'value',
        optional: false,
        type: MirArgumentType.Float,
      },
    ],
    outputType: OutputType.Boolean,
    description: (i18n: I18n) => (argument: string = 'argument') =>
      i18n.t('operator_info_description.float.less_than', { argument }),
  },
  [OperatorCode.FloatModulo]: {
    type: Type.Float,
    name: FloatOperatorName.Modulo,
    arguments: [
      {
        name: 'modulus',
        optional: false,
        type: MirArgumentType.Float,
      },
    ],
    outputType: OutputType.Float,
    description: (i18n: I18n) => (argument: string = 'argument') =>
      i18n.t('operator_info_description.float.modulo', { argument }),
  },
  [OperatorCode.FloatMultiply]: {
    type: Type.Float,
    name: FloatOperatorName.Multiply,
    arguments: [
      {
        name: 'factor',
        optional: false,
        type: MirArgumentType.Float,
      },
    ],
    outputType: OutputType.Float,
    description: (i18n: I18n) => (argument: string = 'argument') =>
      i18n.t('operator_info_description.float.multiply', { argument }),
  },
  [OperatorCode.FloatNegate]: {
    type: Type.Float,
    name: FloatOperatorName.Negate,
    arguments: [],
    outputType: OutputType.Float,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.float.negate'),
  },
  [OperatorCode.FloatPower]: {
    type: Type.Float,
    name: 'power',
    arguments: [
      {
        name: FloatOperatorName.Power,
        optional: false,
        type: MirArgumentType.Float,
      },
    ],
    outputType: OutputType.Float,
    description: (i18n: I18n) => (exponent: string = 'exponent') =>
      i18n.t('operator_info_description.float.power', { exponent }),
  },
  /*[OperatorCode.FloatReciprocal]: {
    type: Type.Float,
    name: FloatOperatorName.Reciprocal,
    arguments: [],
    outputType: OutputType.Float,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.float.reciprocal'),
  },*/
  [OperatorCode.FloatRound]: {
    type: Type.Float,
    name: FloatOperatorName.Round,
    arguments: [],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.float.round'),
  },
  /*[OperatorCode.Floatsum]: {
    type: Type.Float,
    name: FloatOperatorName.Sum,
    arguments: [
      {
        name: 'addend',
        optional: false,
        type: MirArgumentType.Float,
      },
    ],
    outputType: OutputType.Float,
    description: (i18n: I18n) => (addend: string = 'addend') =>
      i18n.t('operator_info_description.float.sum', { addend }),
  },*/
  [OperatorCode.FloatTruncate]: {
    type: Type.Float,
    name: FloatOperatorName.Truncate,
    arguments: [],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.float.truncate'),
  },
  /*[OperatorCode.MapEntries]: {
    type: Type.Map,
    name: MapOperatorName.Entries,
    arguments: [],
    outputType: OutputType.Array,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.map.entries'),
  },*/
  [OperatorCode.MapGetArray]: {
    type: Type.Map,
    name: MapOperatorName.GetArray,
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentType.String,
      },
    ],
    outputType: OutputType.Array,
    description: (i18n: I18n) => descriptions.getKey(i18n)('Map', 'Array'),
  },
  [OperatorCode.MapGetBoolean]: {
    type: Type.Map,
    name: MapOperatorName.GetBoolean,
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentType.String,
      },
    ],
    outputType: OutputType.Boolean,
    description: (i18n: I18n) => descriptions.getKey(i18n)('Map', 'Boolean'),
  },
  [OperatorCode.MapGetBytes]: {
    type: Type.Map,
    name: MapOperatorName.GetBytes,
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentType.String,
      },
    ],
    outputType: OutputType.Bytes,
    description: (i18n: I18n) => descriptions.getKey(i18n)('Map', 'Bytes'),
  },
  [OperatorCode.MapGetInteger]: {
    type: Type.Map,
    name: MapOperatorName.GetInteger,
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentType.String,
      },
    ],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => descriptions.getKey(i18n)('Map', 'Integer'),
  },
  [OperatorCode.MapGetFloat]: {
    type: Type.Map,
    name: MapOperatorName.GetFloat,
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentType.String,
      },
    ],
    outputType: OutputType.Float,
    description: (i18n: I18n) => descriptions.getKey(i18n)('Map', 'Float'),
  },
  [OperatorCode.MapGetMap]: {
    type: Type.Map,
    name: MapOperatorName.GetMap,
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentType.String,
      },
    ],
    outputType: OutputType.Map,
    description: (i18n: I18n) => descriptions.getKey(i18n)('Map', 'Map'),
  },
  [OperatorCode.MapGetString]: {
    type: Type.Map,
    name: MapOperatorName.GetString,
    arguments: [
      {
        name: 'key',
        optional: false,
        type: MirArgumentType.String,
      },
    ],
    outputType: OutputType.String,
    description: (i18n: I18n) => descriptions.getKey(i18n)('Map', 'String'),
  },
  [OperatorCode.MapKeys]: {
    type: Type.Map,
    name: MapOperatorName.Keys,
    arguments: [],
    outputType: OutputType.ArrayString,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.map.keys'),
  },
  [OperatorCode.MapValuesArray]: {
    type: Type.Map,
    name: MapOperatorName.valuesArray,
    arguments: [],
    outputType: OutputType.ArrayArray,
    description: (i18n: I18n) => () => descriptions.mapValues(i18n)('Array'),
  },
  /*[OperatorCode.MapValuesBoolean]: {
    type: Type.Map,
    name: MapOperatorName.valuesBoolean,
    arguments: [],
    outputType: OutputType.ArrayBoolean,
    description: (i18n: I18n) => () => descriptions.mapValues(i18n)('Boolean'),
  },*/
  /*[OperatorCode.MapValuesBytes]: {
    type: Type.Map,
    name: MapOperatorName.valuesBytes,
    arguments: [],
    outputType: OutputType.ArrayBytes,
    description: (i18n: I18n) => () => descriptions.mapValues(i18n)('Bytes'),
  },*/
  /*[OperatorCode.MapValuesInteger]: {
    type: Type.Map,
    name: MapOperatorName.valuesInteger,
    arguments: [],
    outputType: OutputType.ArrayInteger,
    description: (i18n: I18n) => () => descriptions.mapValues(i18n)('Integer'),
  },*/
  /*[OperatorCode.MapValuesFloat]: {
    type: Type.Map,
    name: MapOperatorName.valuesFloat,
    arguments: [],
    outputType: OutputType.ArrayFloat,
    description: (i18n: I18n) => () => descriptions.mapValues(i18n)('Float'),
  },*/
  /*[OperatorCode.MapValuesMap]: {
    type: Type.Map,
    name: MapOperatorName.valuesMap,
    arguments: [],
    outputType: OutputType.ArrayMap,
    description: (i18n: I18n) => () => descriptions.mapValues(i18n)('Map'),
  },*/
  /*[OperatorCode.MapValuesString]: {
    type: Type.Map,
    name: MapOperatorName.valuesString,
    arguments: [],
    outputType: OutputType.ArrayString,
    description: (i18n: I18n) => () => descriptions.mapValues(i18n)('String'),
  },*/
  [OperatorCode.StringAsBoolean]: {
    type: Type.String,
    name: StringOperatorName.AsBoolean,
    arguments: [],
    outputType: OutputType.Boolean,
    description: (i18n: I18n) => () => descriptions.cast(i18n)('String', 'Boolean'),
  },
  /*[OperatorCode.StringAsBytes]: {
    type: Type.String,
    name: StringOperatorName.AsBytes,
    arguments: [],
    outputType: OutputType.Bytes,
    description: (i18n: I18n) => () => descriptions.cast(i18n)('String', 'Bytes'),
  },*/
  [OperatorCode.StringAsFloat]: {
    type: Type.String,
    name: StringOperatorName.AsFloat,
    arguments: [],
    outputType: OutputType.Float,
    description: (i18n: I18n) => () => descriptions.cast(i18n)('String', 'Float'),
  },
  [OperatorCode.StringAsInteger]: {
    type: Type.String,
    name: StringOperatorName.AsInteger,
    arguments: [],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => () => descriptions.cast(i18n)('String', 'Integer'),
  },
  [OperatorCode.StringLength]: {
    type: Type.String,
    name: StringOperatorName.Length,
    arguments: [],
    outputType: OutputType.Integer,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.string.length'),
  },
  [OperatorCode.StringMatch]: {
    type: Type.String,
    name: StringOperatorName.Match,
    arguments: [
      {
        name: 'categories',
        optional: false,
        type: MirArgumentType.Map,
      },
      {
        name: 'default',
        optional: false,
        type: MirArgumentType.Boolean,
      },
    ],
    outputType: OutputType.MatchOutput,
    description: (i18n: I18n) => (subscript: string = 'subscript') =>
      i18n.t('operator_info_description.string.match', { subscript }),
  },
  [OperatorCode.StringParseJsonArray]: {
    type: Type.String,
    name: StringOperatorName.ParseJsonArray,
    arguments: [],
    outputType: OutputType.Array,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.string.parse_json_array'),
  },
  [OperatorCode.StringParseJsonMap]: {
    type: Type.String,
    name: StringOperatorName.ParseJsonMap,
    arguments: [],
    outputType: OutputType.Map,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.string.parse_json_map'),
  },
  [OperatorCode.StringParseXmlMap]: {
    type: Type.String,
    name: StringOperatorName.ParseXmlMap,
    arguments: [],
    outputType: OutputType.Map,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.string.parse_xml'),
  },
  [OperatorCode.StringToLowerCase]: {
    type: Type.String,
    name: StringOperatorName.ToLowerCase,
    arguments: [],
    outputType: OutputType.String,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.string.to_lower_case'),
  },
  [OperatorCode.StringToUpperCase]: {
    type: Type.String,
    name: StringOperatorName.ToUpperCase,
    arguments: [],
    outputType: OutputType.String,
    description: (i18n: I18n) => () => i18n.t('operator_info_description.string.to_upper_case'),
  },
}

export class Cache {
  private counter: number = 0

  private cache: {
    [key: number]: CacheItem
  }

  constructor() {
    this.cache = {}
  }

  getLastIndex() {
    return this.counter + 1
  }

  get(cacheId: number): CacheItem {
    return this.cache[cacheId]
  }

  insert(item: CacheItem): CacheRef {
    this.cache[++this.counter] = item
    return { id: this.counter }
  }

  set(id: number, item: CacheItem) {
    this.cache[id] = item
  }
}

function generateOption(label: string, outputType: OutputType) {
  return {
    hierarchicalType: 'operatorOption',
    label,
    markupType: 'option',
    outputType,
  }
}

export const primitiveMarkupOptions = {
  array: Object.entries(typeSystem.Array).map((x) => {
    return generateOption(OperatorCode[x[1][0]], x[1][1])
  }),
  arrayBoolean: [
    { label: 'ArrayCount', outputType: 'integer' },
    { label: 'ArrayFilter', outputType: 'arrayBoolean' },
    //{ label: 'ArrayFlatten', outputType: 'arrayBoolean' },
    { label: 'ArrayGetArray', outputType: 'arrayBoolean' },
    { label: 'ArrayGetBoolean', outputType: 'boolean' },
    { label: 'ArrayGetBytes', outputType: 'bytes' },
    { label: 'ArrayGetString', outputType: 'string' },
    { label: 'ArrayMap', outputType: 'arrayMap' },
    { label: 'ArrayReduce', outputType: 'boolean' },
    //{ label: 'ArraySome', outputType: 'arrayBoolean' },
    { label: 'ArraySort', outputType: 'arrayBoolean' },
    //{ label: 'ArrayTake', outputType: 'arrayBoolean' },
  ].map((x) => {
    return generateOption(x.label, x.outputType as OutputType)
  }),
  arrayArray: [
    { label: 'ArrayCount', outputType: 'integer' },
    { label: 'ArrayFilter', outputType: 'arrayArray' },
    //{ label: 'ArrayFlatten', outputType: 'arrayArray' },
    { label: 'ArrayGetArray', outputType: 'arrayArray' },
    { label: 'ArrayGetBoolean', outputType: 'boolean' },
    { label: 'ArrayGetBytes', outputType: 'bytes' },
    { label: 'ArrayGetString', outputType: 'string' },
    { label: 'ArrayMap', outputType: 'arrayMap' },
    { label: 'ArrayReduce', outputType: '' },
    //{ label: 'ArraySome', outputType: 'arrayArray' },
    { label: 'ArraySort', outputType: 'arrayArray' },
    //{ label: 'ArrayTake', outputType: 'arrayArray' },
  ].map((x) => {
    return generateOption(x.label, x.outputType as OutputType)
  }),
  arrayBytes: [
    { label: 'ArrayCount', outputType: 'integer' },
    { label: 'ArrayFilter', outputType: 'arrayBytes' },
    //{ label: 'ArrayFlatten', outputType: 'arrayBytes' },
    { label: 'ArrayGetArray', outputType: 'arrayBytes' },
    { label: 'ArrayGetBoolean', outputType: 'boolean' },
    { label: 'ArrayGetBytes', outputType: 'bytes' },
    { label: 'ArrayGetString', outputType: 'string' },
    { label: 'ArrayMap', outputType: 'arrayMap' },
    { label: 'ArrayReduce', outputType: 'bytes' },
    //{ label: 'ArraySome', outputType: 'arrayBytes' },
    { label: 'ArraySort', outputType: 'arrayBytes' },
    //{ label: 'ArrayTake', outputType: 'arrayBytes' },
  ].map((x) => {
    return generateOption(x.label, x.outputType as OutputType)
  }),
  arrayFloat: [
    { label: 'ArrayCount', outputType: 'integer' },
    { label: 'ArrayFilter', outputType: 'arrayFloat' },
    //{ label: 'ArrayFlatten', outputType: 'arrayFloat' },
    { label: 'ArrayGetArray', outputType: 'arrayFloat' },
    { label: 'ArrayGetBoolean', outputType: 'boolean' },
    { label: 'ArrayGetBytes', outputType: 'bytes' },
    { label: 'ArrayGetString', outputType: 'string' },
    { label: 'ArrayMap', outputType: 'arrayMap' },
    { label: 'ArrayReduce', outputType: 'float' },
    //{ label: 'ArraySome', outputType: 'arrayFloat' },
    { label: 'ArraySort', outputType: 'arrayFloat' },
    //{ label: 'ArrayTake', outputType: 'arrayFloat' },
  ].map((x) => {
    return generateOption(x.label, x.outputType as OutputType)
  }),
  arrayInteger: [
    { label: 'ArrayCount', outputType: 'integer' },
    { label: 'ArrayFilter', outputType: 'arrayInteger' },
    //{ label: 'ArrayFlatten', outputType: 'arrayInteger' },
    { label: 'ArrayGetArray', outputType: 'arrayInteger' },
    { label: 'ArrayGetBoolean', outputType: 'boolean' },
    { label: 'ArrayGetBytes', outputType: 'bytes' },
    { label: 'ArrayGetString', outputType: 'string' },
    { label: 'ArrayMap', outputType: 'arrayMap' },
    { label: 'ArrayReduce', outputType: 'integer' },
    //{ label: 'ArraySome', outputType: 'arrayInteger' },
    { label: 'ArraySort', outputType: 'arrayInteger' },
    //{ label: 'ArrayTake', outputType: 'arrayInteger' },
  ].map((x) => {
    return generateOption(x.label, x.outputType as OutputType)
  }),
  arrayMap: [
    { label: 'ArrayCount', outputType: 'integer' },
    { label: 'ArrayFilter', outputType: 'arrayMap' },
    //{ label: 'ArrayFlatten', outputType: 'arrayMap' },
    { label: 'ArrayGetArray', outputType: 'arrayMap' },
    { label: 'ArrayGetBoolean', outputType: 'boolean' },
    { label: 'ArrayGetBytes', outputType: 'bytes' },
    { label: 'ArrayGetString', outputType: 'string' },
    { label: 'ArrayMap', outputType: 'arrayMap' },
    { label: 'ArrayReduce', outputType: 'map' },
    //{ label: 'ArraySome', outputType: 'arrayMap' },
    { label: 'ArraySort', outputType: 'arrayMap' },
    //{ label: 'ArrayTake', outputType: 'arrayMap' },
  ].map((x) => {
    return generateOption(x.label, x.outputType as OutputType)
  }),

  arrayString: [
    { label: 'ArrayCount', outputType: 'integer' },
    { label: 'ArrayFilter', outputType: 'arrayString' },
    //{ label: 'ArrayFlatten', outputType: 'arrayString' },
    { label: 'ArrayGetArray', outputType: 'arrayString' },
    { label: 'ArrayGetBoolean', outputType: 'boolean' },
    { label: 'ArrayGetBytes', outputType: 'bytes' },
    { label: 'ArrayGetString', outputType: 'string' },
    { label: 'ArrayMap', outputType: 'arrayMap' },
    { label: 'ArrayReduce', outputType: 'string' },
    //{ label: 'ArraySome', outputType: 'arrayString' },
    { label: 'ArraySort', outputType: 'arrayString' },
    //{ label: 'ArrayTake', outputType: 'arrayString' },
  ].map((x) => {
    return generateOption(x.label, x.outputType as OutputType)
  }),
  boolean: Object.entries(typeSystem.Boolean).map((x) => {
    return generateOption(OperatorCode[x[1][0]], x[1][1])
  }),
  bytes: Object.entries(typeSystem.Bytes).map((x) => {
    return generateOption(OperatorCode[x[1][0]], x[1][1])
  }),
  filterOutput: Object.entries(typeSystem.Array).map((x) => {
    return generateOption(OperatorCode[x[1][0]], x[1][1])
  }),
  float: Object.entries(typeSystem.Float).map((x) => {
    return generateOption(OperatorCode[x[1][0]], x[1][1])
  }),
  matchOutput: null,
  reducerOutput: null,
  string: Object.entries(typeSystem.String).map((x) => {
    return generateOption(OperatorCode[x[1][0]], x[1][1])
  }),
  subscriptOutput: null,
  map: Object.entries(typeSystem.Map).map((x) => {
    return generateOption(OperatorCode[x[1][0]], x[1][1])
  }),
  integer: Object.entries(typeSystem.Integer).map((x) => {
    return generateOption(OperatorCode[x[1][0]], x[1][1])
  }),
}

export const aTFilterMarkupOptions = () =>
  getEnumNames(AggregationTallyFilter).map((filter) =>
    generateOption(filter, OutputType.FilterOutput)
  )

export const aTReducerMarkupOptions = () =>
  getEnumNames(AggregationTallyReducer).map((filter) =>
    generateOption(filter, OutputType.FilterOutput)
  )

export const aTRNGReducerMarkupOptions = () => [
  generateOption(
    AggregationTallyReducer[AggregationTallyReducer.hashConcatenate],
    OutputType.FilterOutput
  ),
]

export const allMarkupOptions = removeRepeatedOptions([
  ...primitiveMarkupOptions.array,
  ...primitiveMarkupOptions.arrayBoolean,
  ...primitiveMarkupOptions.arrayArray,
  ...primitiveMarkupOptions.arrayBytes,
  ...primitiveMarkupOptions.arrayFloat,
  ...primitiveMarkupOptions.arrayInteger,
  ...primitiveMarkupOptions.arrayMap,
  ...primitiveMarkupOptions.arrayString,
  ...primitiveMarkupOptions.boolean,
  ...primitiveMarkupOptions.bytes,
  ...primitiveMarkupOptions.filterOutput,
  ...primitiveMarkupOptions.float,
  // ...primitiveMarkupOptions.matchOutput,
  // ...primitiveMarkupOptions.reducerOutput,
  ...primitiveMarkupOptions.string,
  // ...primitiveMarkupOptions.subscriptOutput,
  ...primitiveMarkupOptions.map,
  ...primitiveMarkupOptions.integer,
])

export const markupOptions: { [key: string]: Array<any> } = {
  [OutputType.Array]: [...primitiveMarkupOptions.array],
  [OutputType.ArrayArray]: [...primitiveMarkupOptions.arrayArray],
  [OutputType.ArrayBoolean]: [...primitiveMarkupOptions.arrayBoolean],
  [OutputType.ArrayBytes]: [...primitiveMarkupOptions.arrayBytes],
  [OutputType.ArrayFloat]: [...primitiveMarkupOptions.arrayFloat],
  [OutputType.ArrayInteger]: [...primitiveMarkupOptions.arrayInteger],
  [OutputType.ArrayMap]: [...primitiveMarkupOptions.arrayMap],
  [OutputType.ArrayString]: [...primitiveMarkupOptions.arrayString],
  [OutputType.Boolean]: [...primitiveMarkupOptions.boolean, ...primitiveMarkupOptions.string],
  [OutputType.Bytes]: [...primitiveMarkupOptions.bytes, ...primitiveMarkupOptions.string],
  [OutputType.FilterOutput]: [...primitiveMarkupOptions.filterOutput],
  [OutputType.Float]: [...primitiveMarkupOptions.float, ...primitiveMarkupOptions.string],
  [OutputType.Integer]: [
    ...primitiveMarkupOptions.integer,
    ...primitiveMarkupOptions.float,
    ...primitiveMarkupOptions.string,
  ],
  [OutputType.Map]: [...primitiveMarkupOptions.map],
  [OutputType.MatchOutput]: allMarkupOptions,
  [OutputType.ReducerOutput]: allMarkupOptions,
  [OutputType.String]: [...primitiveMarkupOptions.string],
  [OutputType.SubscriptOutput]: allMarkupOptions,
}

export function removeRepeatedOptions(array: Array<{ label: string }>) {
  return array.filter(
    (item: { label: string }, index: number, self: Array<{ label: string }>) =>
      index === self.findIndex((t) => t.label === item.label)
  )
}
