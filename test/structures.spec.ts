import { getOperatorCodeFromOperatorName } from '../src/utils'
import { OperatorName, OperatorCode } from '../src/types'

describe.skip('structures', () => {
  it('generate codes map correctly', () => {
    const expected = OperatorCode.ArrayCount
    const result = getOperatorCodeFromOperatorName('ArrayCount' as OperatorName)

    expect(result).toBe(expected)
  })
})
