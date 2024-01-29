import * as prettier from 'prettier'

import {
  ArgumentInfo,
  MarkupInputType,
  MirArgumentType,
  MarkupArgumentType,
  MirOperator,
  OperatorCode,
  MirArgument,
  OutputType,
  Filter,
  Reducer,
  Type,
} from './types.js'
import { DEFAULT_OPERATOR } from './constants.js'
import { markupOptions } from './structures.js'
import { Operator } from './operator.js'

// check if contains the same elements
export function areSoftEqualArrays(arr1: any[], arr2: any[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.reduce((acc, item) => (acc ? arr2.includes(item) : false), true) &&
    arr2.reduce((acc, item) => (acc ? arr1.includes(item) : false), true)
  )
}

export function areValidConsecutiveOperators(operators: Array<Operator>, idx: number) {
  if (operators[idx + 1]) {
    const outputType = operators[idx].operatorInfo.outputType
    const label = operators[idx + 1].operatorInfo.name
    const options = markupOptions[outputType]
    return !!options.find((operatorName) => operatorName === label)
  } else {
    return true
  }
}

export function fromOutputTypeToType(type: OutputType): Type | null {
  if (isArrayType(type)) {
    return Type.Array
  } else if (isBooleanType(type)) {
    return Type.Boolean
  } else if (isBytesType(type)) {
    return Type.Bytes
  } else if (isFloatType(type)) {
    return Type.Float
  } else if (isIntegerType(type)) {
    return Type.Integer
  } else if (isMapType(type)) {
    return Type.Map
  } else if (isStringType(type)) {
    return Type.String
  } else {
    return null
  }
}

export async function formatJs(source: string): Promise<string> {
  return prettier.format(source, { semi: false, parser: 'babel' })
}

export function getEnumNames(e: any): Array<any> {
  return Object.keys(e).filter((key) => !parseInt(key) && !Number.isInteger(parseInt(key)))
}

export function getEnumValues(e: any): Array<any> {
  return Object.values(e)
}

export function getMarkupInputTypeFromArgumentType(argumentType: MirArgumentType): MarkupInputType {
  if (argumentType === MirArgumentType.Float || argumentType === MirArgumentType.Integer) {
    return MarkupInputType.Number
  } else if (argumentType === MirArgumentType.Boolean) {
    return MarkupInputType.Boolean
  } else if (argumentType === MirArgumentType.Map) {
    return MarkupInputType.Map
  } else {
    return MarkupInputType.String
  }
}

export function getArgumentInfoType(info: ArgumentInfo): MarkupArgumentType {
  if (info.type === MirArgumentType.FilterFunction) {
    return MarkupArgumentType.SelectFilter
  } else if (info.type === MirArgumentType.ReducerFunction) {
    return MarkupArgumentType.SelectReduce
  } else if (info.type === MirArgumentType.Subscript) {
    return MarkupArgumentType.Subscript
  } else if (info.type === MirArgumentType.Boolean) {
    return MarkupArgumentType.SelectBoolean
  } else {
    return MarkupArgumentType.Input
  }
}

export function getDefaultMirArgumentByType(type: MirArgumentType): MirArgument {
  switch (type) {
    case MirArgumentType.Boolean:
      return true
    case MirArgumentType.FilterFunction:
      return [Filter.deviationStandard, 1.1]
    case MirArgumentType.Float:
      return 0.0
    case MirArgumentType.Integer:
      return 0
    case MirArgumentType.ReducerFunction:
      return Reducer.averageMean
    case MirArgumentType.String:
      return ''
    case MirArgumentType.Subscript:
      return [DEFAULT_OPERATOR]
    case MirArgumentType.Map:
      return {}
  }
}

// TODO: Refactor to find the first operator instead of repeat code
export function getDefaultMirOperatorByType(type: Type): MirOperator {
  switch (type) {
    case Type.Array:
      return OperatorCode.ArrayCount
    case Type.Boolean:
      return OperatorCode.BooleanAsString
    case Type.Bytes:
      return OperatorCode.BytesAsString
    case Type.Float:
      return OperatorCode.FloatAbsolute
    case Type.Integer:
      return OperatorCode.IntegerAbsolute
    case Type.Map:
      return [OperatorCode.MapGetArray, '']
    case Type.String:
      return OperatorCode.StringAsBoolean
  }
}

export function getMirOperatorInfo(operator: MirOperator): {
  code: OperatorCode
  args: Array<MirArgument>
} {
  return Array.isArray(operator)
    ? {
        code: operator[0] as OperatorCode,
        args: operator.slice(1) as Array<MirArgument>,
      }
    : {
        code: operator as OperatorCode,
        args: [],
      }
}

export function isArrayType(type: OutputType) {
  return type.startsWith('array')
}

export function isBooleanType(type: OutputType) {
  return type === OutputType.Boolean
}

export function isBytesType(type: OutputType) {
  return type === OutputType.Bytes
}

export function isFloatType(type: OutputType) {
  return type === OutputType.Float
}

export function isIntegerType(type: OutputType) {
  return type === OutputType.Integer
}

export function isMapType(type: OutputType) {
  return type === OutputType.Map
}

export function isStringType(type: OutputType) {
  return type === OutputType.String
}
