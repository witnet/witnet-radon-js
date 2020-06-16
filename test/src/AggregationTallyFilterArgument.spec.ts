import { AggregationTallyFilterArgument } from '../../src/aggregationTallyFilterArgument'
import { Cache } from '../../src/structures'

describe('AggregationTallyFilterArgument', () => {
  it('getMarkup', () => {
    const mirArgument = 3

    const cache = new Cache()
    const operator = new AggregationTallyFilterArgument(cache, mirArgument)

    const result = operator.getMarkup()
    const expected = {
      hierarchicalType: 'argument',
      id: 1,
      label: 'by',
      markupType: 'input',
      value: 3,
    }

    expect(result).toStrictEqual(expected)
  })

  it('getMir', () => {
    const mirArgument = 3

    const cache = new Cache()
    const operator = new AggregationTallyFilterArgument(cache, mirArgument)

    const result = operator.getMir()

    expect(result).toStrictEqual(mirArgument)
  })

  it('update', () => {
    const mirArgument = 3

    const cache = new Cache()

    const operator = new AggregationTallyFilterArgument(cache, mirArgument)

    operator.update(7)

    expect(operator.value).toStrictEqual(7)
  })
})
