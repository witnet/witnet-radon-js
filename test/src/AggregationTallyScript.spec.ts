import { I18n } from '../../src/i18n'
import { AggregationTallyScript } from '../../src/aggregationTallyScript'
import { Cache } from '../../src/structures'
import { AggregationTallyFilter, MirAggregationTallyScript } from '../../src/types'
import { formatJsTest } from '../utils'

describe('AggregationTallyScript', () => {
  describe('addOperator', () => {
    it('without empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [[AggregationTallyFilter.deviationStandard, 3]],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, false)
      script.addOperator()
      const expected = 2
      expect(script.filters.length).toStrictEqual(expected)
      expect(script.filters[1].code).toStrictEqual(AggregationTallyFilter.deviationStandard)
    })

    it('with empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, false)
      script.addOperator()
      const expected = 1
      expect(script.filters.length).toStrictEqual(expected)
      expect(script.filters[0].code).toStrictEqual(AggregationTallyFilter.deviationStandard)
    })
  })

  describe('deleteOperator', () => {
    it('without repeated filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [[AggregationTallyFilter.deviationStandard, 3], AggregationTallyFilter.mode],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, false)

      script.deleteOperator(script.filters[0].id)

      expect(script.filters[0].code).toStrictEqual(AggregationTallyFilter.mode)
    })

    it('with repeated filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [
          [AggregationTallyFilter.deviationStandard, 3],
          AggregationTallyFilter.mode,
          [AggregationTallyFilter.deviationStandard, 3],
        ],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, false)
      script.deleteOperator(script.filters[2].id)

      expect(script.filters[0].code).toStrictEqual(AggregationTallyFilter.deviationStandard)
      expect(script.filters[1].code).toStrictEqual(AggregationTallyFilter.mode)
      expect(script.filters[2]).toBeUndefined()
    })
  })

  describe('getJs', () => {
    it('with empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [],
        reducer: 0x02,
      }

      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, false)

      const result = formatJsTest(script.getJs('aggregator'))
      const expected = formatJsTest(`const aggregator = new Witnet.aggregator({
        filters: [
        ],
          reducer: Witnet.Types.REDUCERS.mode,
        })`)

      expect(result).toStrictEqual(expected)
    })

    it(' with non-empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [[AggregationTallyFilter.deviationStandard, 3]],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, false)

      const result = formatJsTest(script.getJs('aggregator'))
      const expected = formatJsTest(`const aggregator = new Witnet.aggregator({
        filters: [
          [Witnet.Types.FILTERS.deviationStandard, 3]
        ],
          reducer: Witnet.Types.REDUCERS.mode,
        })`)

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMarkup', () => {
    it('with empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, false)

      const result = script.getMarkup()
      const expected = {
        filters: [],
        reducer: {
          hierarchicalType: 'operator',
          id: 2,
          label: 'mode',
          markupType: 'select',
          options: [
            {
              hierarchicalType: 'operatorOption',
              label: 'mode',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              hierarchicalType: 'operatorOption',
              label: 'averageMean',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              hierarchicalType: 'operatorOption',
              label: 'averageMedian',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              hierarchicalType: 'operatorOption',
              label: 'deviationStandard',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              hierarchicalType: 'operatorOption',
              label: 'hashConcatenate',
              markupType: 'option',
              outputType: 'filterOutput',
            },
          ],
          outputType: 'filterOutput',
          scriptId: 1,
          selected: {
            arguments: [],
            description: 'Compute the mode of the values',
            hierarchicalType: 'selectedOperatorOption',
            label: 'mode',
            markupType: 'option',
            outputType: 'reducerOutput',
          },
        },
      }

      expect(result).toStrictEqual(expected)
    })

    it(' with non-empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [[AggregationTallyFilter.deviationStandard, 3]],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, false)

      const result = script.getMarkup()
      const expected = {
        filters: [
          {
            hierarchicalType: 'operator',
            id: 2,
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
            scriptId: 1,
            selected: {
              arguments: [
                {
                  hierarchicalType: 'argument',
                  id: 3,
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
          },
        ],
        reducer: {
          hierarchicalType: 'operator',
          id: 4,
          label: 'mode',
          markupType: 'select',
          options: [
            {
              hierarchicalType: 'operatorOption',
              label: 'mode',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              hierarchicalType: 'operatorOption',
              label: 'averageMean',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              hierarchicalType: 'operatorOption',
              label: 'averageMedian',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              hierarchicalType: 'operatorOption',
              label: 'deviationStandard',
              markupType: 'option',
              outputType: 'filterOutput',
            },
            {
              hierarchicalType: 'operatorOption',
              label: 'hashConcatenate',
              markupType: 'option',
              outputType: 'filterOutput',
            },
          ],
          outputType: 'filterOutput',
          scriptId: 1,
          selected: {
            arguments: [],
            description: 'Compute the mode of the values',
            hierarchicalType: 'selectedOperatorOption',
            label: 'mode',
            markupType: 'option',
            outputType: 'reducerOutput',
          },
        },
      }

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMir', () => {
    it('with non-empty-filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [[AggregationTallyFilter.deviationStandard, 3]],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, false)

      const result = script.getMir()
      expect(result).toStrictEqual(mirScript)
    })

    it('with empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [[AggregationTallyFilter.deviationStandard, 3]],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, false)

      const result = script.getMir()
      expect(result).toStrictEqual(mirScript)
    })
  })

  describe('push', () => {
    it('without empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [[AggregationTallyFilter.deviationStandard, 3]],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, false)
      script.push(AggregationTallyFilter.deviationStandard as AggregationTallyFilter)
      const expected = AggregationTallyFilter.deviationStandard
      expect(script.filters[1].code).toStrictEqual(expected)
    })

    it('with empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, false)
      script.push(AggregationTallyFilter.deviationStandard as AggregationTallyFilter)
      const expected = AggregationTallyFilter.deviationStandard
      expect(script.filters[0].code).toStrictEqual(expected)
    })
  })
})
