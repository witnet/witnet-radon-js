import { AggregationTallyScript } from '../src/radon'
import { Cache } from '../src/structures'
import { AggregationTallyFilter, MirAggregationTallyScript } from '../src/types'

describe('AggregationTallyScript', () => {
  it('getMarkup', () => {
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

  it('getMir', () => {
    const mirScript: MirAggregationTallyScript = {
      filters: [[AggregationTallyFilter.deviationAbsolute, 3]],
      reducer: 0x02,
    }
    const cache = new Cache()
    const script = new AggregationTallyScript(cache, mirScript)

    const result = script.getMir()
    expect(result).toStrictEqual(mirScript)
  })

  it('addOperator', () => {
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

  it('push', () => {
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
})
