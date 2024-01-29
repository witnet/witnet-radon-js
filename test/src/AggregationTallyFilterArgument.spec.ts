import { I18n } from '../../src/i18n.js'
import { AggregationTallyFilterArgument } from '../../src/aggregationTallyFilterArgument.js'
import { Cache } from '../../src/structures.js'

describe('AggregationTallyFilterArgument', () => {
  it('getMarkup', () => {
    const mirArgument = 3

    const context = { cache: new Cache(), i18n: new I18n() }
    const operator = new AggregationTallyFilterArgument(context, mirArgument)

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

    const context = { cache: new Cache(), i18n: new I18n() }
    const operator = new AggregationTallyFilterArgument(context, mirArgument)

    const result = operator.getMir()

    expect(result).toStrictEqual(mirArgument)
  })

  it('update', () => {
    const mirArgument = 3

    const context = { cache: new Cache(), i18n: new I18n() }

    const operator = new AggregationTallyFilterArgument(context, mirArgument)

    operator.update(7)

    expect(operator.value).toStrictEqual(7)
  })
})
