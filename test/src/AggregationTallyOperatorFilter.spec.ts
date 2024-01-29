import { AggregationTallyOperatorFilter } from '../../src/aggregationTallyOperatorFilter.js'
import { Cache } from '../../src/structures.js'
import { AggregationTallyFilter, MirAggregationTallyFilterOperator } from '../../src/types.js'
import { I18n } from '../../src/i18n.js'

describe('AggregationTallyOperatorFilter', () => {
  describe('getJs', () => {
    it('without argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = AggregationTallyFilter.mode

      const context = { cache: new Cache(), i18n: new I18n() }
      const operator = new AggregationTallyOperatorFilter(context, mirOperator, 0)

      const result = operator.getJs()
      const expected = 'Witnet.Types.FILTERS.mode'

      expect(result).toStrictEqual(expected)
    })
    it('with argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = [
        AggregationTallyFilter.deviationStandard,
        3,
      ]

      const context = { cache: new Cache(), i18n: new I18n() }
      const operator = new AggregationTallyOperatorFilter(context, mirOperator, 0)

      const result = operator.getJs()
      const expected = '[Witnet.Types.FILTERS.deviationStandard, 3]'

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMarkup', () => {
    it('without argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = AggregationTallyFilter.mode

      const context = { cache: new Cache(), i18n: new I18n() }
      const operator = new AggregationTallyOperatorFilter(context, mirOperator, 0)

      const result = operator.getMarkup()
      const expected = {
        hierarchicalType: 'operator',
        id: 1,
        label: 'mode',
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'deviationStandard',
            markupType: 'option',
            outputType: 'filterOutput',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'mode',
            markupType: 'option',
            outputType: 'filterOutput',
          },
        ],
        outputType: 'filterOutput',
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'mode',
          description:
            'Discard any result that is different from the mode. Long story short: remove outliers',
          markupType: 'option',
          outputType: 'filterOutput',
        },
      }

      expect(result).toStrictEqual(expected)
    })

    it('with argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = [
        AggregationTallyFilter.deviationStandard,
        3,
      ]

      const context = { cache: new Cache(), i18n: new I18n() }
      const operator = new AggregationTallyOperatorFilter(context, mirOperator, 0)

      const result = operator.getMarkup()
      const expected = {
        hierarchicalType: 'operator',
        id: 1,
        label: 'deviationStandard',
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'deviationStandard',
            markupType: 'option',
            outputType: 'filterOutput',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'mode',
            markupType: 'option',
            outputType: 'filterOutput',
          },
        ],
        outputType: 'filterOutput',
        scriptId: 0,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument',
              id: 2,
              label: 'by',
              markupType: 'input',
              value: 3,
            },
          ],
          description:
            'Discard any result that is more than "by" times the standard deviation times away from the average. Long story short: remove outliers',
          hierarchicalType: 'selectedOperatorOption',
          label: 'deviationStandard',
          markupType: 'option',
          outputType: 'filterOutput',
        },
      }

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMir', () => {
    it('without argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = AggregationTallyFilter.mode

      const context = { cache: new Cache(), i18n: new I18n() }
      const operator = new AggregationTallyOperatorFilter(context, mirOperator, 0)

      const result = operator.getMir()

      expect(result).toStrictEqual(mirOperator)
    })

    it('with argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = [
        AggregationTallyFilter.deviationStandard,
        3,
      ]

      const context = { cache: new Cache(), i18n: new I18n() }
      const operator = new AggregationTallyOperatorFilter(context, mirOperator, 0)

      const result = operator.getMir()
      expect(result).toStrictEqual(mirOperator)
    })
  })

  describe('update', () => {
    it('without argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = AggregationTallyFilter.mode

      const context = { cache: new Cache(), i18n: new I18n() }
      const operator = new AggregationTallyOperatorFilter(context, mirOperator, 0)

      operator.update(AggregationTallyFilter.deviationStandard)

      expect(operator.code).toStrictEqual(AggregationTallyFilter.deviationStandard)
      expect(operator.argument).toBeTruthy()
    })

    it('with argument', () => {
      const mirOperator: MirAggregationTallyFilterOperator = [
        AggregationTallyFilter.deviationStandard,
        3,
      ]

      const context = { cache: new Cache(), i18n: new I18n() }
      const operator = new AggregationTallyOperatorFilter(context, mirOperator, 0)

      operator.update(AggregationTallyFilter.deviationStandard)

      expect(operator.code).toStrictEqual(AggregationTallyFilter.deviationStandard)
      expect(operator.argument).toBeTruthy()
    })
  })
})
