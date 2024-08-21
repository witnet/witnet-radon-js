import { OperatorCode, OutputType, Kind } from './types.js'

export const DEFAULT_OPERATOR = OperatorCode.ArrayCount
export const DEFAULT_INPUT_TYPE = OutputType.Array
export const DEFAULT_SCRIPT_FIRST_TYPE = OutputType.String
export const KIND_OPTIONS = {
  [Kind.HttpGet]: 'HTTP-GET',
  [Kind.HttpPost]: 'HTTP-POST',
  [Kind.RNG]: 'RNG',
  // TODO: Support HTTP-HEAD
  // [Kind.HttpHead]: 'HTTP-HEAD',
}
export const CONTENT_TYPE_OPTIONS = {
  [Kind.HttpGet]: 'JSON API',
  [Kind.HttpPost]: 'JSON API',
  [Kind.RNG]: 'Binary file',
  // TODO: Support HTTP-HEAD
  // [Kind.HttpHead]: 'JSON API',
}
export const DEFAULT_KIND_OPTION = Kind.HttpGet
