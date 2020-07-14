import { Radon } from '../../src/radon'
import { Operator } from '../../src/operator'
import {
  MirRequest,
  OperatorCode,
  AggregationTallyReducer,
  AggregationTallyFilter,
} from '../../src/types'
import { markupOptions, aTFilterMarkupOptions, aTReducerMarkupOptions } from '../../src/structures'
import { formatJsTest } from '../utils'

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
                      type: 'map',
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
                      type: 'map',
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
                label: 'parseJSONMap',
                markupType: 'select',
                options: markupOptions.string,
                outputType: 'map',
                scriptId: 4,
                selected: {
                  description: 'Interpretate the input String as a JSON-encoded Map structure.',
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'parseJSONMap',
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
                label: 'parseJSONMap',
                markupType: 'select',
                options: markupOptions.string,
                outputType: 'map',
                scriptId: 9,
                selected: {
                  description: 'Interpretate the input String as a JSON-encoded Map structure.',
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'parseJSONMap',
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
                  [OperatorCode.StringMatch, '{ "BTC": true, "ETH": true }', false],
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
                label: 'parseJSONMap',
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
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'parseJSONMap',
                  markupType: 'option',
                  outputType: 'map',
                  description: 'Interpretate the input String as a JSON-encoded Map structure.',
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
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'getArray',
                  markupType: 'option',
                  outputType: 'array',
                  description:
                    'Access to the “data” key of the input Map, and manage the value as Array',
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
                        {
                          label: 'custom',
                          hierarchicalType: 'operatorOption',
                          markupType: 'option',
                          outputType: 'filterOutput',
                        },
                      ],
                      outputType: 'filterOutput',
                      selected: {
                        arguments: [
                          {
                            id: 8,
                            label: 'by',
                            markupType: 'script',
                            outputType: 'subscriptOutput',
                            hierarchicalType: 'argument',
                            subscript: [
                              {
                                hierarchicalType: 'operator',
                                id: 10,
                                label: 'getArray',
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
                                    label: 'BooleanAsString',
                                    markupType: 'option',
                                    outputType: 'string',
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
                                outputType: 'array',
                                scriptId: 9,
                                selected: {
                                  arguments: [
                                    {
                                      hierarchicalType: 'argument',
                                      id: 11,
                                      label: 'key',
                                      markupType: 'input',
                                      value: 'symbol',
                                      type: 'string',
                                    },
                                  ],
                                  hierarchicalType: 'selectedOperatorOption',
                                  label: 'getArray',
                                  markupType: 'option',
                                  outputType: 'array',
                                  description:
                                    'Access to the “symbol” key of the input Map, and manage the value as Array',
                                },
                              },
                              {
                                hierarchicalType: 'operator',
                                id: 12,
                                label: 'match',
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
                                outputType: 'matchOutput',
                                scriptId: 9,
                                selected: {
                                  arguments: [
                                    {
                                      hierarchicalType: 'argument',
                                      id: 13,
                                      label: 'categories',
                                      markupType: 'input',
                                      value: '{ "BTC": true, "ETH": true }',
                                      type: 'map',
                                    },
                                    {
                                      hierarchicalType: 'argument',
                                      id: 14,
                                      label: 'default',
                                      markupType: 'input',
                                      value: false,
                                      type: 'boolean',
                                    },
                                  ],
                                  hierarchicalType: 'selectedOperatorOption',
                                  label: 'match',
                                  markupType: 'option',
                                  outputType: 'matchOutput',
                                  description:
                                    'Match the String input with { "BTC": true, "ETH": true } and return the value asociated with it. Similar than a switch statement',
                                },
                              },
                            ],
                          },
                        ],
                        hierarchicalType: 'selectedOperatorOption',
                        label: 'custom',
                        outputType: 'filterOutput',
                        markupType: 'option',
                      },
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'filter',
                  markupType: 'option',
                  outputType: 'same',
                  description:
                    'Discard the items in the inpuyt array that doesn\'t match the 255,97,symbol,117,{ "BTC": true, "ETH": true },false function',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 15,
                label: 'sort',
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
                  arguments: [
                    {
                      id: 16,
                      label: 'mapFunction',
                      markupType: 'script',
                      outputType: 'subscriptOutput',
                      hierarchicalType: 'argument',
                      subscript: [
                        {
                          hierarchicalType: 'operator',
                          id: 18,
                          label: 'getString',
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
                              label: 'BooleanAsString',
                              markupType: 'option',
                              outputType: 'string',
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
                          outputType: 'string',
                          scriptId: 17,
                          selected: {
                            arguments: [
                              {
                                hierarchicalType: 'argument',
                                id: 19,
                                label: 'key',
                                markupType: 'input',
                                value: 'symbol',
                                type: 'string',
                              },
                            ],
                            hierarchicalType: 'selectedOperatorOption',
                            label: 'getString',
                            markupType: 'option',
                            outputType: 'string',
                            description:
                              'Access to the “symbol” key of the input Map, and manage the value as String',
                          },
                        },
                      ],
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'sort',
                  markupType: 'option',
                  outputType: 'same',
                  description: 'Sort the input Array in 103,symbol order',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 20,
                label: 'map',
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
                outputType: 'subscriptOutput',
                scriptId: 2,
                selected: {
                  arguments: [
                    {
                      id: 21,
                      label: 'script',
                      markupType: 'script',
                      outputType: 'subscriptOutput',
                      hierarchicalType: 'argument',
                      subscript: [
                        {
                          hierarchicalType: 'operator',
                          id: 23,
                          label: 'getString',
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
                              label: 'BooleanAsString',
                              markupType: 'option',
                              outputType: 'string',
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
                          outputType: 'string',
                          scriptId: 22,
                          selected: {
                            arguments: [
                              {
                                hierarchicalType: 'argument',
                                id: 24,
                                label: 'key',
                                markupType: 'input',
                                value: 'changePercent24h',
                                type: 'string',
                              },
                            ],
                            hierarchicalType: 'selectedOperatorOption',
                            label: 'getString',
                            markupType: 'option',
                            outputType: 'string',
                            description:
                              'Access to the “changePercent24h” key of the input Map, and manage the value as String',
                          },
                        },
                      ],
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'map',
                  markupType: 'option',
                  outputType: 'subscriptOutput',
                  description:
                    'Apply the 103,changePercent24h script on all the elements of the input Array',
                },
              },
            ],
            scriptId: 2,
          },
          {
            kind: 'HTTP-GET',
            url: 'source_2',
            contentType: 'JSON API',
            script: [
              {
                hierarchicalType: 'operator',
                id: 27,
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
                scriptId: 26,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'asBoolean',
                  markupType: 'option',
                  outputType: 'boolean',
                  description: 'Cast the String input into Boolean',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 28,
                label: 'match',
                markupType: 'select',
                options: [
                  {
                    hierarchicalType: 'operatorOption',
                    label: 'BooleanAsString',
                    markupType: 'option',
                    outputType: 'string',
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
                scriptId: 26,
                selected: {
                  arguments: [
                    {
                      hierarchicalType: 'argument',
                      id: 29,
                      label: 'categories',
                      markupType: 'input',
                      value: '',
                      type: 'map',
                    },
                    {
                      hierarchicalType: 'argument',
                      id: 30,
                      label: 'default',
                      markupType: 'input',
                      value: true,
                      type: 'boolean',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'match',
                  markupType: 'option',
                  outputType: 'matchOutput',
                  description:
                    'Match the Boolean input with "" and return the value asociated with it. Similar than a switch statement',
                },
              },
              {
                hierarchicalType: 'operator',
                id: 31,
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
                    label: 'BooleanAsString',
                    markupType: 'option',
                    outputType: 'string',
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
                scriptId: 26,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'length',
                  markupType: 'option',
                  outputType: 'integer',
                  description:
                    'Count the number of elements of the input String, and mannage the values as Integer.',
                },
              },
            ],
            scriptId: 26,
          },
        ],
        aggregate: {
          filters: [
            {
              hierarchicalType: 'operator',
              id: 33,
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
              scriptId: 32,
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'mode',
                markupType: 'option',
                outputType: 'filterOutput',
                description:
                  'Discard any result that is different from the mode. Long story short: remove outliers',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 34,
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
              scriptId: 32,
              selected: {
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 35,
                    label: 'by',
                    markupType: 'input',
                    value: 3,
                  },
                ],
                hierarchicalType: 'selectedOperatorOption',
                label: 'deviationAbsolute',
                markupType: 'option',
                outputType: 'filterOutput',
                description:
                  'Discard any result that is more than by times the absolute deviation times away from the average. Long story short: remove outliers',
              },
            },
          ],
          reducer: {
            hierarchicalType: 'operator',
            id: 36,
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
            scriptId: 32,
            selected: {
              arguments: [],
              hierarchicalType: 'selectedOperatorOption',
              label: 'mode',
              markupType: 'option',
              outputType: 'reducerOutput',
              description: 'Compute the mode of the values',
            },
          },
        },
        tally: {
          filters: [
            {
              hierarchicalType: 'operator',
              id: 38,
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
              scriptId: 37,
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'mode',
                markupType: 'option',
                outputType: 'filterOutput',
                description:
                  'Discard any result that is different from the mode. Long story short: remove outliers',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 39,
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
              scriptId: 37,
              selected: {
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 40,
                    label: 'by',
                    markupType: 'input',
                    value: 3,
                  },
                ],
                hierarchicalType: 'selectedOperatorOption',
                label: 'deviationAbsolute',
                markupType: 'option',
                outputType: 'filterOutput',
                description:
                  'Discard any result that is more than by times the absolute deviation times away from the average. Long story short: remove outliers',
              },
            },
          ],
          reducer: {
            hierarchicalType: 'operator',
            id: 41,
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
            scriptId: 37,
            selected: {
              arguments: [],
              hierarchicalType: 'selectedOperatorOption',
              label: 'mode',
              markupType: 'option',
              outputType: 'reducerOutput',
              description: 'Compute the mode of the values',
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

  describe('getJs method', () => {
    it('case 1', () => {
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
      const js = formatJsTest(radon.getJs())
      const expected = formatJsTest(
        `import * as Witnet from \"witnet-requests\"
        const request = new Witnet.Request()
        const source_0 = new Witnet.Source(\"source_1\")
          .asBoolean()
          .match(\"\", true)
          .length()
        const source_1 = new Witnet.Source(\"source_2\")
          .asBoolean()
          .match(\"\", true)
          .length()
        const aggregator = new Witnet.aggregator({
          filters: [
            Witnet.Types.FILTERS.mode[(Witnet.Types.FILTERS.deviationAbsolute, 3)],
          ],
          reducer: Witnet.Types.REDUCERS.mode,
        })
        const tally = new Witnet.tally({
          filters: [
            Witnet.Types.FILTERS.mode[(Witnet.Types.FILTERS.deviationAbsolute, 3)],
          ],
          reducer: Witnet.Types.REDUCERS.mode,
        })
        const request = new Witnet.Request()
          .addSource(source_0)
          .addSource(source_1)
          .setAggregator(aggregator) // Set the aggregator function
          .setTally(tally) // Set the tally function
          .setQuorum(4, 70) // Set witness count
          .setFees(10, 1, 1, 1) // Set economic incentives
          .schedule(0) // Make this request immediately solvable
        export { request as default }`
      )

      expect(js).toBe(expected)
    })

    it('case 2', () => {
      const mirRequest: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: 'HTTP-GET',
            script: [119, [102, 'data'], [100, 'closing_price']],
            contentType: 'JSON API',
            url: 'https://api.bithumb.com/public/ticker/BTC',
          },
          {
            contentType: 'JSON API',
            kind: 'HTTP-GET',
            script: [119, [100, 'price']],
            url:
              'https://api.coinpaprika.com/v1/price-converter?base_currency_id=btc-bitcoin&quote_currency_id=krw-south-korea-won&amount=1',
          },
          {
            contentType: 'JSON API',
            kind: 'HTTP-GET',
            script: [
              119,
              [102, 'result'],
              [97, 'rows'],
              [
                17, //filter
                [
                  [0x67, 'symbol'],
                  [0x75, '{btc: true}', false],
                ],
              ],
              [
                26, //map
                [[0x64, 'price']],
              ],
              [
                23, // get
                '0',
              ],
            ],
            url: 'https://billboard.service.cryptowat.ch/assets?quote=krw&limit=1&sort=volume',
          },
        ],
        aggregate: {
          filters: [],
          reducer: 2,
        },
        tally: {
          filters: [],
          reducer: 2,
        },
      }
      const radon = new Radon(mirRequest)
      const js = formatJsTest(radon.getJs())
      const expected = formatJsTest(
        `import * as Witnet from \"witnet-requests\"
        const request = new Witnet.Request()
        const source_0 = new Witnet.Source(\"https://api.bithumb.com/public/ticker/BTC\")
          .parseJSONMap()
          .getMap(\"data\")
          .getFloat(\"closing_price\")
        const source_1 = new Witnet
          .Source(  \"https://api.coinpaprika.com/v1/price-converter?base_currency_id=btc-bitcoin&quote_currency_id=krw-south-korea-won&amount=1\")
          .parseJSONMap()
          .getFloat(\"price\")
        const source_2 = new Witnet
          .Source(  \"https://billboard.service.cryptowat.ch/assets?quote=krw&limit=1&sort=volume\")
          .parseJSONMap()
          .getMap(\"result\")
          .getArray(\"rows\")
          .filter(new Script()
          .getString(\"symbol\")
          .match(\"{btc: true}\", false))
          .map(new Script()
          .getFloat(\"price\"))
          .getFloat(0)
        const aggregator = new Witnet
          .aggregator({  filters: [],  reducer: Witnet.Types.REDUCERS.mode,})
        const tally = new Witnet
          .tally({  filters: [],  reducer: Witnet.Types.REDUCERS.mode,})
        const request = new Witnet
          .Request()
          .addSource(source_0)
          .addSource(source_1)
          .addSource(source_2)
          .setAggregator(aggregator) // Set the aggregator function
          .setTally(tally) // Set the tally function
          .setQuorum(4, 70) // Set witness count
          .setFees(10, 1, 1, 1) // Set economic incentives
          .schedule(0) // Make this request immediately solvable
          export { request as default }`
      )

      expect(js).toBe(expected)
    })
  })
})
