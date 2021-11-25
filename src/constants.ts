import { OperatorCode, OutputType, Kind } from './types'

export const DEFAULT_OPERATOR = OperatorCode.ArrayCount
export const DEFAULT_INPUT_TYPE = OutputType.Array
export const DEFAULT_SCRIPT_FIRST_TYPE = OutputType.String
export const KIND_OPTIONS = [Kind.HttpGet, Kind.RNG]
export const CONTENT_TYPE_OPTIONS = {
  [Kind.HttpGet]: 'JSON API',
  [Kind.RNG]: 'Binary file'
}
export const DEFAULT_KIND_OPTION = Kind.HttpGet
