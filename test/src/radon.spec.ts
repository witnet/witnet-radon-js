import { Radon } from '../../src/radon'
import { Operator } from '../../src/operator'
import {
  MirRequest,
  OperatorCode,
  AggregationTallyReducer,
  AggregationTallyFilter,
} from '../../src/types'
import { markupOptions, aTFilterMarkupOptions, aTReducerMarkupOptions } from '../../src/structures'

describe('Radon', () => {
  it('addOperator', () => {
    const mir: MirRequest = {
      timelock: 0,
      retrieve: [
        {
          kind: 'HTTP-GET',
          url: 'source_1',
          contentType: 'JSON API',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
        {
          kind: 'HTTP-GET',
          url: 'source_2',
          contentType: 'JSON API',
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
          contentType: 'JSON API',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
        {
          kind: 'HTTP-GET',
          url: 'source_2',
          contentType: 'JSON API',
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
          contentType: 'JSON API',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
        {
          kind: 'HTTP-GET',
          url: 'source_2',
          contentType: 'JSON API',
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

  describe('getMarkup', () => {
    it('generic case', () => {
      const mirRequest: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP-GET',
            url: 'source_1',
            contentType: 'JSON API',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
          {
            kind: 'HTTP-GET',
            url: 'source_2',
            contentType: 'JSON API',
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
            contentType: 'JSON API',
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
                  description: 'Cast the String input into Boolean',
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
                      type: 'string',
                    },
                    {
                      hierarchicalType: 'argument',
                      id: 6,
                      label: 'default',
                      markupType: 'input',
                      value: true,
                      type: 'boolean',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'match',
                  description:
                    'Match the Boolean input with "" and return the value asociated with it. Similar than a switch statement',
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
                  description:
                    'Count the number of elements of the input String, and mannage the values as Integer.',
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
            contentType: 'JSON API',
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
                  description: 'Cast the String input into Boolean',
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
                      type: 'string',
                    },
                    {
                      hierarchicalType: 'argument',
                      id: 13,
                      label: 'default',
                      markupType: 'input',
                      value: true,
                      type: 'boolean',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'match',
                  description:
                    'Match the Boolean input with "" and return the value asociated with it. Similar than a switch statement',
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
                  description:
                    'Count the number of elements of the input String, and mannage the values as Integer.',
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
                description:
                  'Discard any result that is different from the mode. Long story short: remove outliers',
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
                description:
                  'Discard any result that is more than by times the absolute deviation times away from the average. Long story short: remove outliers',
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
              description: 'Compute the mode of the values',
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
                description:
                  'Discard any result that is different from the mode. Long story short: remove outliers',
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
                description:
                  'Discard any result that is more than by times the absolute deviation times away from the average. Long story short: remove outliers',
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
              description: 'Compute the mode of the values',
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
            contentType: 'JSON API',
            script: [],
          },
          {
            kind: 'HTTP-GET',
            url: 'https://api-r.bitcoinchain.com/v1/status',
            contentType: 'JSON API',
            script: [119, [103, 'hash']],
          },
          {
            kind: 'HTTP-GET',
            url: 'https://api.blockchair.com/bitcoin/stats',
            contentType: 'JSON API',
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
            contentType: 'JSON API',
            script: [],
            scriptId: 2,
          },
          {
            kind: 'HTTP-GET',
            scriptId: 4,
            contentType: 'JSON API',
            url: 'https://api-r.bitcoinchain.com/v1/status',
            script: [
              {
                hierarchicalType: 'operator',
                id: 5,
                label: 'parseJsonMap',
                markupType: 'select',
                options: markupOptions.string,
                outputType: 'map',
                scriptId: 4,
                selected: {
                  description: 'Interpretate the input String as a JSON-encoded Map structure.',
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'parseJsonMap',
                  markupType: 'option',
                  outputType: 'map',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 6,
                label: 'getString',
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
                      type: 'string',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'getString',
                  description:
                    'Access to the “hash” key of the input Map, and manage the value as String',
                  markupType: 'option',
                  outputType: 'string',
                },
              },
            ],
          },
          {
            kind: 'HTTP-GET',
            contentType: 'JSON API',
            script: [
              {
                hierarchicalType: 'operator',
                id: 10,
                label: 'parseJsonMap',
                markupType: 'select',
                options: markupOptions.string,
                outputType: 'map',
                scriptId: 9,
                selected: {
                  description: 'Interpretate the input String as a JSON-encoded Map structure.',
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'parseJsonMap',
                  markupType: 'option',
                  outputType: 'map',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 11,
                label: 'getMap',
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
                      type: 'string',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'getMap',
                  description:
                    'Access to the “data” key of the input Map, and manage the value as Map',
                  markupType: 'option',
                  outputType: 'map',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 13,
                label: 'getString',
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
                      type: 'string',
                    },
                  ],
                  description:
                    'Access to the “best_block_hash” key of the input Map, and manage the value as String',
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'getString',
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
            options: aTReducerMarkupOptions(),
            outputType: 'filterOutput',
            scriptId: 15,
            selected: {
              description: 'Compute the mode of the values',
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
              options: aTFilterMarkupOptions(),
              outputType: 'filterOutput',
              scriptId: 17,
              selected: {
                description:
                  'Discard any result that is different from the mode. Long story short: remove outliers',
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
            options: aTReducerMarkupOptions(),
            outputType: 'filterOutput',
            scriptId: 17,
            selected: {
              arguments: [],
              hierarchicalType: 'selectedOperatorOption',
              label: 'mode',
              description: 'Compute the mode of the values',
              markupType: 'option',
              outputType: 'reducerOutput',
            },
          },
        },
      }

      expect(result).toStrictEqual(expected)
    })

    it('with subscript', () => {
      const mirRequest: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP-GET',
            url: 'source_1',
            contentType: 'JSON API',
            script: [
              OperatorCode.StringParseJsonMap,
              [OperatorCode.MapGetArray, 'data'],
              [
                OperatorCode.ArrayFilter,
                [
                  [OperatorCode.MapGetArray, 'symbol'],
                  [OperatorCode.StringMatch, '{ "BTC": true, "ETH": true }'],
                ],
              ],
              [OperatorCode.ArraySort, [[OperatorCode.MapGetString, 'symbol']]],
              [OperatorCode.ArrayMap, [[OperatorCode.MapGetString, 'changePercent24h']]],
            ],
          },
          {
            kind: 'HTTP-GET',
            url: 'source_2',
            contentType: 'JSON API',
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
            contentType: 'JSON API',
            script: [
              {
                hierarchicalType: 'operator',
                id: 3,
                label: 'parseJsonMap',
                markupType: 'select',
                options: [
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsFloat',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsInteger',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringLength',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringMatch',
                    markupType: 'option',
                    outputType: 'matchOutput',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringParseJsonArray',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringParseJsonMap',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringParseXML',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringToLowerCase',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringToUpperCase',
                    markupType: 'option',
                    outputType: 'string',
                  },
                ],
                outputType: 'map',
                scriptId: 2,
                selected: {
                  description: 'Interpretate the input String as a JSON-encoded Map structure.',
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'parseJsonMap',
                  markupType: 'option',
                  outputType: 'map',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 4,
                label: 'getArray',
                markupType: 'select',
                options: [
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapEntries',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetArray',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetFloat',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetInteger',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetMap',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapKeys',
                    markupType: 'option',
                    outputType: 'arrayString',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesArray',
                    markupType: 'option',
                    outputType: 'arrayArray',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesBoolean',
                    markupType: 'option',
                    outputType: 'arrayBoolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesBytes',
                    markupType: 'option',
                    outputType: 'arrayBytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesFloat',
                    markupType: 'option',
                    outputType: 'arrayFloat',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesInteger',
                    markupType: 'option',
                    outputType: 'arrayInteger',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesString',
                    markupType: 'option',
                    outputType: 'arrayString',
                  },
                ],
                outputType: 'array',
                scriptId: 2,
                selected: {
                  arguments: [
                    {
                      hierarchicalType: 'argument',
                      id: 5,
                      label: 'key',
                      markupType: 'input',
                      value: 'data',
                      type: 'string',
                    },
                  ],
                  description:
                    'Access to the “data” key of the input Map, and manage the value as Array',
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'getArray',
                  markupType: 'option',
                  outputType: 'array',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 6,
                label: 'filter',
                markupType: 'select',
                options: [
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayCount',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFilter',
                    markupType: 'option',
                    outputType: 'same',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFlatten',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetArray',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetFloat',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetInteger',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetMap',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayReduce',
                    markupType: 'option',
                    outputType: 'inner',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySome',
                    markupType: 'option',
                    outputType: 'filterOutput',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySort',
                    markupType: 'option',
                    outputType: 'same',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayTake',
                    markupType: 'option',
                    outputType: 'array',
                  },
                ],
                outputType: 'same',
                scriptId: 2,
                selected: {
                  description:
                    'Discard the items in the inpuyt array that doesn\'t match the 97,symbol,117,{ "BTC": true, "ETH": true } function',
                  arguments: [
                    {
                      hierarchicalType: 'argument',
                      id: 7,
                      label: 'function',
                      markupType: 'select',
                      options: [
                        {
                          label: 'greaterThan',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'lessThan',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'equals',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'deviationAbsolute',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'deviationRelative',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'deviationStandard',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'top',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'bottom',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'mode',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'lessOrEqualThan',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'greaterOrEqualThan',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'notEquals',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'notDeviationAbsolute',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'notDeviationRelative',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'notDeviationStandard',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'notTop',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                        {
                          label: 'notBottom',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                      ],
                      outputType: 'filterOutput',
                      selected: {
                        arguments: [
                          {
                            hierarchicalType: 'argument',
                            id: 8,
                            label: 'by',
                            markupType: 'input',
                            value: [117, '{ "BTC": true, "ETH": true }'],
                            type: 'string',
                          },
                        ],
                        hierarchicalType: 'selectedOperatorOption',
                        label: 'greaterThan',
                        outputType: 'filterOutput',
                        markupType: 'option',
                      },
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'filter',
                  markupType: 'option',
                  outputType: 'same',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 9,
                label: 'sort',
                markupType: 'select',
                outputType: 'same',
                scriptId: 2,
                options: [
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayCount',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFilter',
                    markupType: 'option',
                    outputType: 'same',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFlatten',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetArray',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetFloat',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetInteger',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetMap',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayReduce',
                    markupType: 'option',
                    outputType: 'inner',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySome',
                    markupType: 'option',
                    outputType: 'filterOutput',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySort',
                    markupType: 'option',
                    outputType: 'same',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayTake',
                    markupType: 'option',
                    outputType: 'array',
                  },
                ],
                selected: {
                  description: 'Sort the input Array in 103,symbol order',
                  arguments: [
                    {
                      hierarchicalType: 'argument',
                      id: 10,
                      label: 'mapFunction',
                      markupType: 'script',
                      outputType: 'subscriptOutput',
                      subscript: [
                        {
                          hierarchicalType: 'operator',
                          id: 12,
                          label: 'getString',
                          markupType: 'select',
                          options: [
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringAsBoolean',
                              markupType: 'option',
                              outputType: 'boolean',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringAsBytes',
                              markupType: 'option',
                              outputType: 'bytes',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringAsFloat',
                              markupType: 'option',
                              outputType: 'float',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringAsInteger',
                              markupType: 'option',
                              outputType: 'integer',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringLength',
                              markupType: 'option',
                              outputType: 'integer',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringMatch',
                              markupType: 'option',
                              outputType: 'matchOutput',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringParseJsonArray',
                              markupType: 'option',
                              outputType: 'array',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringParseJsonMap',
                              markupType: 'option',
                              outputType: 'map',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringParseXML',
                              markupType: 'option',
                              outputType: 'map',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringToLowerCase',
                              markupType: 'option',
                              outputType: 'string',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringToUpperCase',
                              markupType: 'option',
                              outputType: 'string',
                            },
                          ],
                          outputType: 'string',
                          scriptId: 11,
                          selected: {
                            arguments: [
                              {
                                hierarchicalType: 'argument',
                                id: 13,
                                label: 'key',
                                markupType: 'input',
                                value: 'symbol',
                                type: 'string',
                              },
                            ],
                            description:
                              'Access to the “symbol” key of the input Map, and manage the value as String',
                            hierarchicalType: 'selectedOperatorOption',
                            label: 'getString',
                            markupType: 'option',
                            outputType: 'string',
                          },
                        },
                      ],
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'sort',
                  markupType: 'option',
                  outputType: 'same',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 14,
                label: 'map',
                markupType: 'select',
                outputType: 'subscriptOutput',
                scriptId: 2,
                options: [
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayCount',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFilter',
                    markupType: 'option',
                    outputType: 'same',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFlatten',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetArray',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetFloat',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetInteger',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetMap',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayReduce',
                    markupType: 'option',
                    outputType: 'inner',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySome',
                    markupType: 'option',
                    outputType: 'filterOutput',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySort',
                    markupType: 'option',
                    outputType: 'same',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayTake',
                    markupType: 'option',
                    outputType: 'array',
                  },
                ],
                selected: {
                  description:
                    'Apply the 103,changePercent24h script on all the elements of the input Array',

                  arguments: [
                    {
                      hierarchicalType: 'argument',
                      id: 15,
                      label: 'script',
                      markupType: 'script',
                      outputType: 'subscriptOutput',
                      subscript: [
                        {
                          hierarchicalType: 'operator',
                          id: 17,
                          label: 'getString',
                          markupType: 'select',
                          options: [
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringAsBoolean',
                              markupType: 'option',
                              outputType: 'boolean',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringAsBytes',
                              markupType: 'option',
                              outputType: 'bytes',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringAsFloat',
                              markupType: 'option',
                              outputType: 'float',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringAsInteger',
                              markupType: 'option',
                              outputType: 'integer',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringLength',
                              markupType: 'option',
                              outputType: 'integer',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringMatch',
                              markupType: 'option',
                              outputType: 'matchOutput',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringParseJsonArray',
                              markupType: 'option',
                              outputType: 'array',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringParseJsonMap',
                              markupType: 'option',
                              outputType: 'map',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringParseXML',
                              markupType: 'option',
                              outputType: 'map',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringToLowerCase',
                              markupType: 'option',
                              outputType: 'string',
                            },
                            {
                              hierarchicalType: 'operatorOption',
                              label: 'StringToUpperCase',
                              markupType: 'option',
                              outputType: 'string',
                            },
                          ],
                          outputType: 'string',
                          scriptId: 16,
                          selected: {
                            arguments: [
                              {
                                hierarchicalType: 'argument',
                                id: 18,
                                label: 'key',
                                markupType: 'input',
                                value: 'changePercent24h',
                                type: 'string',
                              },
                            ],
                            description:
                              'Access to the “changePercent24h” key of the input Map, and manage the value as String',
                            hierarchicalType: 'selectedOperatorOption',
                            label: 'getString',
                            markupType: 'option',
                            outputType: 'string',
                          },
                        },
                      ],
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'map',
                  markupType: 'option',
                  outputType: 'subscriptOutput',
                },
              },
            ],
            scriptId: 2,
          },
          {
            kind: 'HTTP-GET',
            url: 'source_2',
            script: [
              {
                hierarchicalType: 'operator',
                id: 21,
                label: 'asBoolean',
                markupType: 'select',
                options: [
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsFloat',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsInteger',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringLength',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringMatch',
                    markupType: 'option',
                    outputType: 'matchOutput',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringParseJsonArray',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringParseJsonMap',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringParseXML',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringToLowerCase',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringToUpperCase',
                    markupType: 'option',
                    outputType: 'string',
                  },
                ],
                outputType: 'boolean',
                scriptId: 20,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'asBoolean',
                  description: 'Cast the String input into Boolean',
                  markupType: 'option',
                  outputType: 'boolean',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 22,
                label: 'match',
                markupType: 'select',
                options: [
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'BooleanMatch',
                    markupType: 'option',
                    outputType: 'matchOutput',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'BooleanNegate',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsFloat',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsInteger',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringLength',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringMatch',
                    markupType: 'option',
                    outputType: 'matchOutput',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringParseJsonArray',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringParseJsonMap',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringParseXML',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringToLowerCase',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringToUpperCase',
                    markupType: 'option',
                    outputType: 'string',
                  },
                ],
                outputType: 'matchOutput',
                scriptId: 20,
                selected: {
                  arguments: [
                    {
                      hierarchicalType: 'argument',
                      id: 23,
                      label: 'categories',
                      markupType: 'input',
                      value: '',
                      type: 'string',
                    },
                    {
                      hierarchicalType: 'argument',
                      id: 24,
                      label: 'default',
                      markupType: 'input',
                      value: true,
                      type: 'boolean',
                    },
                  ],
                  description:
                    'Match the Boolean input with "" and return the value asociated with it. Similar than a switch statement',
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'match',
                  markupType: 'option',
                  outputType: 'matchOutput',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 25,
                label: 'length',
                markupType: 'select',
                options: [
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayCount',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFilter',
                    markupType: 'option',
                    outputType: 'same',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFlatten',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetArray',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetFloat',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetInteger',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetMap',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayReduce',
                    markupType: 'option',
                    outputType: 'inner',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySome',
                    markupType: 'option',
                    outputType: 'filterOutput',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySort',
                    markupType: 'option',
                    outputType: 'same',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayTake',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayCount',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFilter',
                    markupType: 'option',
                    outputType: 'arrayBoolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFlatten',
                    markupType: 'option',
                    outputType: 'arrayBoolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetArray',
                    markupType: 'option',
                    outputType: 'arrayBoolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayReduce',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySome',
                    markupType: 'option',
                    outputType: 'arrayBoolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySort',
                    markupType: 'option',
                    outputType: 'arrayBoolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayTake',
                    markupType: 'option',
                    outputType: 'arrayBoolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayCount',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFilter',
                    markupType: 'option',
                    outputType: 'arrayArray',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFlatten',
                    markupType: 'option',
                    outputType: 'arrayArray',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetArray',
                    markupType: 'option',
                    outputType: 'arrayArray',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayReduce',
                    markupType: 'option',
                    outputType: '',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySome',
                    markupType: 'option',
                    outputType: 'arrayArray',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySort',
                    markupType: 'option',
                    outputType: 'arrayArray',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayTake',
                    markupType: 'option',
                    outputType: 'arrayArray',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayCount',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFilter',
                    markupType: 'option',
                    outputType: 'arrayBytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFlatten',
                    markupType: 'option',
                    outputType: 'arrayBytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetArray',
                    markupType: 'option',
                    outputType: 'arrayBytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayReduce',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySome',
                    markupType: 'option',
                    outputType: 'arrayBytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySort',
                    markupType: 'option',
                    outputType: 'arrayBytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayTake',
                    markupType: 'option',
                    outputType: 'arrayBytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayCount',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFilter',
                    markupType: 'option',
                    outputType: 'arrayFloat',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFlatten',
                    markupType: 'option',
                    outputType: 'arrayFloat',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetArray',
                    markupType: 'option',
                    outputType: 'arrayFloat',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayReduce',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySome',
                    markupType: 'option',
                    outputType: 'arrayFloat',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySort',
                    markupType: 'option',
                    outputType: 'arrayFloat',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayTake',
                    markupType: 'option',
                    outputType: 'arrayFloat',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayCount',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFilter',
                    markupType: 'option',
                    outputType: 'arrayInteger',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFlatten',
                    markupType: 'option',
                    outputType: 'arrayInteger',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetArray',
                    markupType: 'option',
                    outputType: 'arrayInteger',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayReduce',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySome',
                    markupType: 'option',
                    outputType: 'arrayInteger',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySort',
                    markupType: 'option',
                    outputType: 'arrayInteger',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayTake',
                    markupType: 'option',
                    outputType: 'arrayInteger',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayCount',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFilter',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFlatten',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetArray',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayReduce',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySome',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySort',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayTake',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayCount',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFilter',
                    markupType: 'option',
                    outputType: 'arrayString',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFlatten',
                    markupType: 'option',
                    outputType: 'arrayString',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetArray',
                    markupType: 'option',
                    outputType: 'arrayString',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayReduce',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySome',
                    markupType: 'option',
                    outputType: 'arrayString',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySort',
                    markupType: 'option',
                    outputType: 'arrayString',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayTake',
                    markupType: 'option',
                    outputType: 'arrayString',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'BooleanMatch',
                    markupType: 'option',
                    outputType: 'matchOutput',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'BooleanNegate',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'BytesAsString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'BytesHash',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayCount',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFilter',
                    markupType: 'option',
                    outputType: 'same',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayFlatten',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetArray',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetFloat',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetInteger',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetMap',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayReduce',
                    markupType: 'option',
                    outputType: 'inner',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySome',
                    markupType: 'option',
                    outputType: 'filterOutput',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArraySort',
                    markupType: 'option',
                    outputType: 'same',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'ArrayTake',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'FloatAbsolute',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'FloatAsString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'FloatCeiling',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'FloatGraterThan',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'FloatFloor',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'FloatLessThan',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'FloatModulo',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'FloatMultiply',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'FloatNegate',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'FloatPower',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'FloatReciprocal',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'FloatRound',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'Floatsum',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'FloatTruncate',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsFloat',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringAsInteger',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringLength',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringMatch',
                    markupType: 'option',
                    outputType: 'matchOutput',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringParseJsonArray',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringParseJsonMap',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringParseXML',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringToLowerCase',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'StringToUpperCase',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapEntries',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetArray',
                    markupType: 'option',
                    outputType: 'array',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetBoolean',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetBytes',
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetFloat',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetInteger',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetMap',
                    markupType: 'option',
                    outputType: 'map',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapGetString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapKeys',
                    markupType: 'option',
                    outputType: 'arrayString',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesArray',
                    markupType: 'option',
                    outputType: 'arrayArray',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesBoolean',
                    markupType: 'option',
                    outputType: 'arrayBoolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesBytes',
                    markupType: 'option',
                    outputType: 'arrayBytes',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesFloat',
                    markupType: 'option',
                    outputType: 'arrayFloat',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesInteger',
                    markupType: 'option',
                    outputType: 'arrayInteger',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesMap',
                    markupType: 'option',
                    outputType: 'arrayMap',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'MapValuesString',
                    markupType: 'option',
                    outputType: 'arrayString',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'IntegerAbsolute',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'IntegerAsFloat',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'IntegerAsString',
                    markupType: 'option',
                    outputType: 'string',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'IntegerGreaterThan',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'IntegerLessThan',
                    markupType: 'option',
                    outputType: 'boolean',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'IntegerMatch',
                    markupType: 'option',
                    outputType: 'matchOutput',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'IntegerModulo',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'IntegerMultiply',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'IntegerNegate',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'IntegerPower',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'IntegerReciprocal',
                    markupType: 'option',
                    outputType: 'float',
                  },
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'IntegerSum',
                    markupType: 'option',
                    outputType: 'integer',
                  },
                ],
                outputType: 'integer',
                scriptId: 20,
                selected: {
                  description:
                    'Count the number of elements of the input String, and mannage the values as Integer.',
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'length',
                  markupType: 'option',
                  outputType: 'integer',
                },
              },
            ],
            contentType: 'JSON API',
            scriptId: 20,
          },
        ],
        aggregate: {
          filters: [
            {
              hierarchicalType: 'operator',
              id: 27,
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
              scriptId: 26,
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'mode',
                description:
                  'Discard any result that is different from the mode. Long story short: remove outliers',
                markupType: 'option',
                outputType: 'filterOutput',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 28,
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
              scriptId: 26,
              selected: {
                description:
                  'Discard any result that is more than by times the absolute deviation times away from the average. Long story short: remove outliers',
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 29,
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
            id: 30,
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
            scriptId: 26,
            selected: {
              description: 'Compute the mode of the values',
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
              id: 32,
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
              scriptId: 31,
              selected: {
                description:
                  'Discard any result that is different from the mode. Long story short: remove outliers',
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'mode',
                markupType: 'option',
                outputType: 'filterOutput',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 33,
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
              scriptId: 31,
              selected: {
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 34,
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
            id: 35,
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
            scriptId: 31,
            selected: {
              description: 'Compute the mode of the values',
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

  describe('getMir', () => {
    it('simple case', () => {
      const mirRequest: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP-GET',
            url: 'source_1',
            contentType: 'JSON API',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
          {
            kind: 'HTTP-GET',
            url: 'source_2',
            contentType: 'JSON API',
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

    it('with subscript', () => {
      const mirRequest: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP-GET',
            url: 'source_1',
            contentType: 'JSON API',
            script: [
              OperatorCode.StringParseJsonMap,
              [OperatorCode.MapGetArray, 'data'],
              [
                OperatorCode.ArrayFilter,
                [
                  [OperatorCode.MapGetArray, 'symbol'],
                  [OperatorCode.StringMatch, '{ "BTC": true, "ETH": true }'],
                ],
              ],
              [OperatorCode.ArraySort, [[OperatorCode.MapGetString, 'symbol']]],
              [OperatorCode.ArrayMap, [[OperatorCode.MapGetString, 'changePercent24h']]],
            ],
          },
          {
            kind: 'HTTP-GET',
            url: 'source_2',
            contentType: 'JSON API',
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
  })

  describe('update', () => {
    it('operator', () => {
      const mirRequest: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP-GET',
            url: 'source_1',
            contentType: 'JSON API',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
          {
            kind: 'HTTP-GET',
            url: 'source_2',
            contentType: 'JSON API',
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
            contentType: 'JSON API',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
          {
            kind: 'HTTP-GET',
            url: 'source_2',
            contentType: 'JSON API',
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
            contentType: 'JSON API',
            script: [
              OperatorCode.StringAsBoolean,
              [OperatorCode.BooleanMatch, '', true],
              OperatorCode.StringLength,
            ],
          },
          {
            kind: 'HTTP-GET',
            url: 'source_2',
            contentType: 'JSON API',
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
