import { getOperatorCodeFromOperatorName } from '../../src/utils'
import { removeRepeatedOptions } from '../../src/structures'
// import { getEnumNames } from '../src/utils'
import { OperatorName, OperatorCode } from '../../src/types'

describe('structures', () => {
  it('generate codes map correctly', () => {
    const expected = OperatorCode.ArrayCount
    const result = getOperatorCodeFromOperatorName('ArrayCount' as OperatorName)

    expect(result).toBe(expected)
  })
})

describe('removeRepeatedOptions', () => {
  it('with repeated options', () => {
    const options = [{label: 'cat'}, {label: 'dog'}, {label: 'cat'}]

    const result = removeRepeatedOptions(options)
    const expected = [{label: 'cat'}, {label: 'dog'}]

    expect(result).toStrictEqual(expected)
  })

  it('without repeated options', () => {
    const options = [{label: 'cat'}, {label: 'dog'}, {label: 'lion'}]

    const result = removeRepeatedOptions(options)
    const expected = [{label: 'cat'}, {label: 'dog'}, {label: 'lion'}]

    expect(result).toStrictEqual(expected)
  })
})
