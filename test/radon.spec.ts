import { Radon, Operator } from '../src/radon'
import {
  MirRequest,
  OperatorCode,
  AggregationTallyReducer,
  AggregationTallyFilter,
} from '../src/types'
import { markupOptions } from '../src/structures'

describe('Radon', () => {
  it('addOperator', () => {
    const mir: MirRequest = {
      timelock: 0,
      retrieve: [
        {
          kind: 'HTTP_GET',
          url: 'source_1',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
        {
          kind: 'HTTP_GET',
          url: 'source_2',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
      ],
      aggregate: {
        filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: AggregationTallyReducer.mode,
      },
      tally: {
        filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: AggregationTallyReducer.mode,
      },
    }
    const radon = new Radon(mir)
    radon.addOperator(2)
    const addedOperator = radon.retrieve[0].script.getLastOperator() as Operator
    expect(addedOperator.code).toBe(64)
  })

  it('addSource increase the number of sources', () => {
    const mir: MirRequest = {
      timelock: 0,
      retrieve: [
        {
          kind: 'HTTP_GET',
          url: 'source_1',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
        {
          kind: 'HTTP_GET',
          url: 'source_2',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
      ],
      aggregate: {
        filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: AggregationTallyReducer.mode,
      },
      tally: {
        filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: AggregationTallyReducer.mode,
      },
    }
    const radon = new Radon(mir)
    radon.addSource()
    expect(radon.retrieve.length).toBe(3)
  })

  it('deleteSource remove source by index', () => {
    const mir: MirRequest = {
      timelock: 0,
      retrieve: [
        {
          kind: 'HTTP_GET',
          url: 'source_1',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
        {
          kind: 'HTTP_GET',
          url: 'source_2',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
      ],
      aggregate: {
        filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: AggregationTallyReducer.mode,
      },
      tally: {
        filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: AggregationTallyReducer.mode,
      },
    }
    const radon = new Radon(mir)
    radon.deleteSource(0)
    expect(radon.retrieve.length).toBe(1)
    expect(radon.retrieve[0].url).toBe('source_2')
  })

  it('getMarkup method', () => {
    const mirRequest: MirRequest = {
      timelock: 0,
      retrieve: [
        {
          kind: 'HTTP_GET',
          url: 'source_1',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
        {
          kind: 'HTTP_GET',
          url: 'source_2',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
      ],
      aggregate: {
        filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: AggregationTallyReducer.mode,
      },
      tally: {
        filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: AggregationTallyReducer.mode,
      },
    }

    const radon = new Radon(mirRequest)
    const result = radon.getMarkup()
    const expected = {
      timelock: 0,
      retrieve: [
        {
          kind: 'HTTP_GET',
          url: 'source_1',
          script: [
            {
              hierarchicalType: 'operator',
              id: 3,
              label: 'asBoolean',
              markupType: 'select',
              options: markupOptions.string,
              outputType: 'boolean',
              scriptId: 2,
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'asBoolean',
                markupType: 'option',
                outputType: 'boolean',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 4,
              scriptId: 2,
              label: 'match',
              markupType: 'select',
              options: markupOptions.boolean,
              outputType: 'matchOutput',
              selected: {
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 5,
                    label: 'categories',
                    markupType: 'input',
                    value: '',
                  },
                  {
                    hierarchicalType: 'argument',
                    id: 6,
                    label: 'default',
                    markupType: 'input',
                    value: true,
                  },
                ],
                hierarchicalType: 'selectedOperatorOption',
                label: 'match',
                markupType: 'option',
                outputType: 'matchOutput',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 7,
              label: 'length',
              markupType: 'select',
              options: markupOptions.matchOutput,
              outputType: 'integer',
              scriptId: 2,
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'length',
                markupType: 'option',
                outputType: 'integer',
              },
            },
          ],
        },
        {
          kind: 'HTTP_GET',
          url: 'source_2',
          script: [
            {
              hierarchicalType: 'operator',
              id: 10,
              scriptId: 9,
              label: 'asBoolean',
              markupType: 'select',
              options: markupOptions.string,
              outputType: 'boolean',
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'asBoolean',
                markupType: 'option',
                outputType: 'boolean',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 11,
              scriptId: 9,
              label: 'match',
              markupType: 'select',
              options: markupOptions.boolean,
              outputType: 'matchOutput',
              selected: {
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 12,
                    label: 'categories',
                    markupType: 'input',
                    value: '',
                  },
                  {
                    hierarchicalType: 'argument',
                    id: 13,
                    label: 'default',
                    markupType: 'input',
                    value: true,
                  },
                ],
                hierarchicalType: 'selectedOperatorOption',
                label: 'match',
                markupType: 'option',
                outputType: 'matchOutput',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 14,
              scriptId: 9,
              label: 'length',
              markupType: 'select',
              options: markupOptions.matchOutput,
              outputType: 'integer',
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'length',
                markupType: 'option',
                outputType: 'integer',
              },
            },
          ],
        },
      ],
      aggregate: {
        filters: [
          {
            hierarchicalType: 'operator',
            id: 16,
            label: 'mode',
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
            scriptId: 15,
            selected: {
              arguments: [],
              hierarchicalType: 'selectedOperatorOption',
              label: 'mode',
              markupType: 'option',
              outputType: 'filterOutput',
            },
          },
          {
            hierarchicalType: 'operator',
            id: 17,
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
            scriptId: 15,
            selected: {
              arguments: [
                {
                  hierarchicalType: 'argument',
                  id: 18,
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
          id: 19,
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
          scriptId: 15,
          selected: {
            arguments: [],
            hierarchicalType: 'selectedOperatorOption',
            label: 'mode',
            markupType: 'option',
            outputType: 'reducerOutput',
          },
        },
      },
      tally: {
        filters: [
          {
            hierarchicalType: 'operator',
            id: 21,
            label: 'mode',
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
            scriptId: 20,
            selected: {
              arguments: [],
              hierarchicalType: 'selectedOperatorOption',
              label: 'mode',
              markupType: 'option',
              outputType: 'filterOutput',
            },
          },
          {
            hierarchicalType: 'operator',
            id: 22,
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
            scriptId: 20,
            selected: {
              arguments: [
                {
                  hierarchicalType: 'argument',
                  id: 23,
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
          id: 24,
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
          scriptId: 20,
          selected: {
            arguments: [],
            hierarchicalType: 'selectedOperatorOption',
            label: 'mode',
            markupType: 'option',
            outputType: 'reducerOutput',
          },
        },
      },
    }

    expect(result).toStrictEqual(expected)
  })

  it('getMir', () => {
    const mirRequest: MirRequest = {
      timelock: 0,
      retrieve: [
        {
          kind: 'HTTP_GET',
          url: 'source_1',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
        {
          kind: 'HTTP_GET',
          url: 'source_2',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
      ],
      aggregate: {
        filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: AggregationTallyReducer.mode,
      },
      tally: {
        filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
        reducer: AggregationTallyReducer.mode,
      },
    }

    const radon = new Radon(mirRequest)
    const result = radon.getMir()
    const expected = mirRequest
    expect(result).toStrictEqual(expected)
  })

  describe('update', () => {
    it('operator', () => {
      const mirRequest: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP_GET',
            url: 'source_1',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
          {
            kind: 'HTTP_GET',
            url: 'source_2',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
        ],
        aggregate: {
          filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
          reducer: AggregationTallyReducer.mode,
        },
        tally: {
          filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
          reducer: AggregationTallyReducer.mode,
        },
      }

      const radon = new Radon(mirRequest)
      radon.update(7, 0x83)
      const updatedOperator = radon.retrieve[0].script.operators[2]
      expect(updatedOperator.code).toBe(0x83)
    })
    it('argument', () => {
      const mirRequest: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP_GET',
            url: 'source_1',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
          {
            kind: 'HTTP_GET',
            url: 'source_2',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
        ],
        aggregate: {
          filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
          reducer: AggregationTallyReducer.mode,
        },
        tally: {
          filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
          reducer: AggregationTallyReducer.mode,
        },
      }

      const radon = new Radon(mirRequest)
      radon.update(5, 'new_value')
      const updatedArgument = radon.retrieve[0].script.operators[1].arguments[0]
      expect(updatedArgument.value).toBe('new_value')
    })
  })

  describe('updateSource', () => {
    it('url', () => {
      const mirRequest: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP_GET',
            url: 'source_1',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
          {
            kind: 'HTTP_GET',
            url: 'source_2',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
        ],
        aggregate: {
          filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
          reducer: AggregationTallyReducer.mode,
        },
        tally: {
          filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationAbsolute, 3]],
          reducer: AggregationTallyReducer.mode,
        },
      }

      const radon = new Radon(mirRequest)
      radon.updateSource(0, { kind: 'new_kind', url: 'new_url' })
      const updatedSource = radon.retrieve[0]
      expect(updatedSource.url).toBe('new_url')
      expect(updatedSource.kind).toBe('new_kind')
    })
  })
})
