import { AggregationTallyScript } from '../src/radon'
import { Cache } from '../src/structures'
import { AggregationTallyFilter, MirAggregationTallyScript } from '../src/types'

describe('AggregationTallyScript', () => {
  describe('getMarkup', () => {
    it('with empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [],
        reducer: 0x02,
      }
      const cache = new Cache()
      const script = new AggregationTallyScript(cache, mirScript)

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
              label: 'averageMeanWeighted',
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
              label: 'averageMedianWeighted',
              markupType: 'option',
              outputType: 'filterOutput',
            },
          ],
          outputType: 'filterOutput',
          scriptId: 1,
          selected: {
            description: 'Compute the mode of the values',
            arguments: [],
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
        filters: [[AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: 0x02,
      }
      const cache = new Cache()
      const script = new AggregationTallyScript(cache, mirScript)

      const result = script.getMarkup()
      const expected = {
        filters: [
          {
            hierarchicalType: 'operator',
            id: 2,
            label: 'deviationAbsolute',
            markupType: 'select',
            options: [
              {
                hierarchicalType: 'operatorOption',
                label: 'deviationAbsolute',
                markupType: 'option',
                outputType: 'filterOutput',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'deviationRelative',
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
                'Discard any result that is more than by times the absolute deviation times away from the average. Long story short: remove outliers',
              hierarchicalType: 'selectedOperatorOption',
              label: 'deviationAbsolute',
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
              label: 'averageMeanWeighted',
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
              label: 'averageMedianWeighted',
              markupType: 'option',
              outputType: 'filterOutput',
            },
          ],
          outputType: 'filterOutput',
          scriptId: 1,
          selected: {
            description: 'Compute the mode of the values',
            arguments: [],
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

  describe('deleteOperator', () => {
    it('without repeated filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [[AggregationTallyFilter.deviationAbsolute, 3], AggregationTallyFilter.mode],
        reducer: 0x02,
      }
      const cache = new Cache()
      const script = new AggregationTallyScript(cache, mirScript)

      script.deleteOperator(script.filters[0].id)

      expect(script.filters[0].code).toStrictEqual(AggregationTallyFilter.mode)
    })

    it('with repeated filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [
          [AggregationTallyFilter.deviationAbsolute, 3],
          AggregationTallyFilter.mode,
          [AggregationTallyFilter.deviationAbsolute, 3],
        ],
        reducer: 0x02,
      }
      const cache = new Cache()
      const script = new AggregationTallyScript(cache, mirScript)
      script.deleteOperator(script.filters[2].id)

      expect(script.filters[0].code).toStrictEqual(AggregationTallyFilter.deviationAbsolute)
      expect(script.filters[1].code).toStrictEqual(AggregationTallyFilter.mode)
      expect(script.filters[2]).toBeUndefined()
    })
  })

  describe('getMir', () => {
    it('with non-empty-filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [[AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: 0x02,
      }
      const cache = new Cache()
      const script = new AggregationTallyScript(cache, mirScript)

      const result = script.getMir()
      expect(result).toStrictEqual(mirScript)
    })

    it('with empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [[AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: 0x02,
      }
      const cache = new Cache()
      const script = new AggregationTallyScript(cache, mirScript)

      const result = script.getMir()
      expect(result).toStrictEqual(mirScript)
    })
  })

  describe('addOperator', () => {
    it('without empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [[AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: 0x02,
      }
      const cache = new Cache()
      const script = new AggregationTallyScript(cache, mirScript)
      script.addOperator()
      const expected = 2
      expect(script.filters.length).toStrictEqual(expected)
      expect(script.filters[1].code).toStrictEqual(AggregationTallyFilter.deviationAbsolute)
    })

    it('with empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [],
        reducer: 0x02,
      }
      const cache = new Cache()
      const script = new AggregationTallyScript(cache, mirScript)
      script.addOperator()
      const expected = 1
      expect(script.filters.length).toStrictEqual(expected)
      expect(script.filters[0].code).toStrictEqual(AggregationTallyFilter.deviationAbsolute)
    })
  })

  describe('push', () => {
    it('without empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [[AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: 0x02,
      }
      const cache = new Cache()
      const script = new AggregationTallyScript(cache, mirScript)
      script.push(AggregationTallyFilter.deviationAbsolute as AggregationTallyFilter)
      const expected = AggregationTallyFilter.deviationAbsolute
      expect(script.filters[1].code).toStrictEqual(expected)
    })

    it('with empty filters', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [],
        reducer: 0x02,
      }
      const cache = new Cache()
      const script = new AggregationTallyScript(cache, mirScript)
      script.push(AggregationTallyFilter.deviationAbsolute as AggregationTallyFilter)
      const expected = AggregationTallyFilter.deviationAbsolute
      expect(script.filters[0].code).toStrictEqual(expected)
    })
  })
})
