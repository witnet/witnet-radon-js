import { formatJs } from '../src/utils'

export function formatJsTest(source: string): string {
  return removeBreakLine(formatJs(source))
}

export function removeBreakLine(source: string): string {
  return source.replace(/(?:\r\n|\r|\n)/g, '')
}
