import { Radon, Operator } from '../src/radon'
import {
  MirRequest,
  OperatorCode,
  AggregationTallyReducer,
  AggregationTallyFilter,
} from '../src/types'
import { markupOptions, aTFilterMarkupOptions, aTReducerMarkupOptions } from '../src/structures'

describe('Radon', () => {
  it('addOperator', () => {
    const mir: MirRequest = {
      timelock: 0,
      retrieve: [
        {
          kind: 'HTTP-GET',
          url: 'source_1',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
        {
          kind: 'HTTP-GET',
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
          kind: 'HTTP-GET',
          url: 'source_1',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
        {
          kind: 'HTTP-GET',
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
          kind: 'HTTP-GET',
          url: 'source_1',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
        {
          kind: 'HTTP-GET',
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

  describe('getMarkupMethod', () => {
    it('generic case', () => {
      const mirRequest: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP-GET',
            url: 'source_1',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
          {
            kind: 'HTTP-GET',
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
            kind: 'HTTP-GET',
            url: 'source_1',
            scriptId: 2,
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
            kind: 'HTTP-GET',
            url: 'source_2',
            scriptId: 9,
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

    it('with string operator', () => {
      const mirRequest: MirRequest = {
        timelock: 1669852800,
        retrieve: [
          {
            kind: 'HTTP-GET',
            url: 'https://blockchain.info/q/latesthash',
            script: [],
          },
          {
            kind: 'HTTP-GET',
            url: 'https://api-r.bitcoinchain.com/v1/status',
            script: [119, [103, 'hash']],
          },
          {
            kind: 'HTTP-GET',
            url: 'https://api.blockchair.com/bitcoin/stats',
            script: [119, [102, 'data'], [103, 'best_block_hash']],
          },
        ],
        aggregate: {
          filters: [],
          reducer: 2,
        },
        tally: {
          filters: [8],
          reducer: 2,
        },
      }

      const radon = new Radon(mirRequest)
      const result = radon.getMarkup()
      const expected = {
        timelock: 1669852800,
        retrieve: [
          {
            kind: 'HTTP-GET',
            url: 'https://blockchain.info/q/latesthash',
            script: [],
            scriptId: 2,
          },
          {
            kind: 'HTTP-GET',
            scriptId: 4,
            url: 'https://api-r.bitcoinchain.com/v1/status',
            script: [
              {
                hierarchicalType: 'operator',
                id: 5,
                label: 'parseJson_map',
                markupType: 'select',
                options: markupOptions.string,
                outputType: 'map',
                scriptId: 4,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'parseJson_map',
                  markupType: 'option',
                  outputType: 'map',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 6,
                label: 'get_string',
                markupType: 'select',
                options: markupOptions.map,
                outputType: 'string',
                scriptId: 4,
                selected: {
                  arguments: [
                    {
                      hierarchicalType: 'argument',
                      id: 7,
                      label: 'key',
                      markupType: 'input',
                      value: 'hash',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'get_string',
                  markupType: 'option',
                  outputType: 'string',
                },
              },
            ],
          },
          {
            kind: 'HTTP-GET',
            script: [
              {
                hierarchicalType: 'operator',
                id: 10,
                label: 'parseJson_map',
                markupType: 'select',
                options: markupOptions.string,
                outputType: 'map',
                scriptId: 9,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'parseJson_map',
                  markupType: 'option',
                  outputType: 'map',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 11,
                label: 'get_map',
                markupType: 'select',
                options: markupOptions.map,
                outputType: 'map',
                scriptId: 9,
                selected: {
                  arguments: [
                    {
                      hierarchicalType: 'argument',
                      id: 12,
                      label: 'key',
                      markupType: 'input',
                      value: 'data',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'get_map',
                  markupType: 'option',
                  outputType: 'map',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 13,
                label: 'get_string',
                markupType: 'select',
                options: markupOptions.map,
                outputType: 'string',
                scriptId: 9,
                selected: {
                  arguments: [
                    {
                      hierarchicalType: 'argument',
                      id: 14,
                      label: 'key',
                      markupType: 'input',
                      value: 'best_block_hash',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'get_string',
                  markupType: 'option',
                  outputType: 'string',
                },
              },
            ],
            scriptId: 9,
            url: 'https://api.blockchair.com/bitcoin/stats',
          },
        ],
        aggregate: {
          filters: [],
          reducer: {
            hierarchicalType: 'operator',
            id: 16,
            label: 'mode',
            markupType: 'select',
            options: aTReducerMarkupOptions,
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
              id: 18,
              label: 'mode',
              markupType: 'select',
              options: aTFilterMarkupOptions,
              outputType: 'filterOutput',
              scriptId: 17,
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'mode',
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
            options: aTReducerMarkupOptions,
            outputType: 'filterOutput',
            scriptId: 17,
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
  })

  it('getMir', () => {
    const mirRequest: MirRequest = {
      timelock: 0,
      retrieve: [
        {
          kind: 'HTTP-GET',
          url: 'source_1',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
        {
          kind: 'HTTP-GET',
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
            kind: 'HTTP-GET',
            url: 'source_1',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
          {
            kind: 'HTTP-GET',
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
      radon.update(7, 0x73)
      const updatedOperator = radon.retrieve[0].script.operators[2]
      expect(updatedOperator.code).toBe(0x73)
    })
    it('argument', () => {
      const mirRequest: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP-GET',
            url: 'source_1',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
          {
            kind: 'HTTP-GET',
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
            kind: 'HTTP-GET',
            url: 'source_1',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
          {
            kind: 'HTTP-GET',
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
