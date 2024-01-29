import { formatJs } from '../src/utils.js'

export async function formatJsTest(source: string): Promise<string> {
  return removeBreakLine(await formatJs(source))
}

export function removeBreakLine(source: string): string {
  return source.replace(/(?:\r\n|\r|\n)/g, '')
}
