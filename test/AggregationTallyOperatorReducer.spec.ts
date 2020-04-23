import { AggregationTallyOperatorReducer } from '../src/radon'
import { Cache } from '../src/structures'
import { AggregationTallyReducer } from '../src/types'

describe('AggregationTallyOperatorReducer', () => {
  it('getMarkup', () => {
    const mirOperator: AggregationTallyReducer = AggregationTallyReducer.averageMean

    const cache = new Cache()
    const operator = new AggregationTallyOperatorReducer(cache, mirOperator, 1)

    const result = operator.getMarkup()
    const expected = {
      hierarchicalType: 'operator',
      id: 1,
      label: 'averageMean',
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
        label: 'averageMean',
        markupType: 'option',
        outputType: 'reducerOutput',
      },
    }

    expect(result).toStrictEqual(expected)
  })

  it('getMir', () => {
    const mirOperator: AggregationTallyReducer = AggregationTallyReducer.averageMean

    const cache = new Cache()
    const operator = new AggregationTallyOperatorReducer(cache, mirOperator, 1)

    const result = operator.getMir()

    expect(result).toStrictEqual(mirOperator)
  })

  it('update', () => {
    const mirOperator: AggregationTallyReducer = AggregationTallyReducer.mode

    const cache = new Cache()
    const operator = new AggregationTallyOperatorReducer(cache, mirOperator, 1)

    operator.update(AggregationTallyReducer.averageMean)

    expect(operator.code).toStrictEqual(AggregationTallyReducer.averageMean)
  })
})
