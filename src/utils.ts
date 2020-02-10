import { OperatorName, OperatorCode, MirArgumentType, MarkupInputType } from './types'

// check if contains the same elements
export function areSoftEqualArrays(arr1: any[], arr2: any[]): boolean {
  return (
    arr1.length === arr2.length &&
    arr1.reduce((acc, item) => (acc ? arr2.includes(item) : false), true) &&
    arr2.reduce((acc, item) => (acc ? arr1.includes(item) : false), true)
  )
}

export function getEnumNames(e: any): Array<any> {
  return Object.keys(e).filter(key => !parseInt(key) && !Number.isInteger(parseInt(key)))
}

export function getEnumValues(e: any): Array<any> {
  return Object.values(e)
}

export function getOperatorCodeFromOperatorName(name: OperatorName): OperatorCode {
  return (OperatorCode[name as any] as unknown) as OperatorCode
}

export function getMarkupInputTypeFromArgumentType(argumentType: MirArgumentType): MarkupInputType {
  if (argumentType === MirArgumentType.Float || argumentType === MirArgumentType.Integer) {
    return MarkupInputType.Number
  } else if (argumentType === MirArgumentType.Boolean) {
    return MarkupInputType.Boolean
  } else {
    return MarkupInputType.String
  }
}
