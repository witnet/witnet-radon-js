import { Argument, generateReducerArgumentOptions } from '../../src/argument'
import { Cache, operatorInfos } from '../../src/structures'
import { DEFAULT_OPERATOR } from '../../src/constants'
import {
  OutputType,
  OperatorCode,
  MirOperator,
  ArgumentInfo,
  MarkupHierarchicalType,
  MarkupType,
  MirArgumentType,
  Filter,
  Reducer,
  MirScript,
} from '../../src/types'

const reducerOptions = generateReducerArgumentOptions()

describe('Argument methods', () => {
  describe('getMarkup', () => {
    it('string', () => {
      const operator: MirOperator = [OperatorCode.MapGetMap, 'bpi']
      const argumentInfo: ArgumentInfo = operatorInfos[operator[0]].arguments[0]
      const cache: Cache = new Cache()
      const argument = new Argument(cache, argumentInfo, 'bpi')
      const result = argument.getMarkup()
      const expected = {
        hierarchicalType: 'argument',
        id: 1,
        label: 'key',
        markupType: 'input',
        value: 'bpi',
        type: 'string',
      }
      expect(result).toStrictEqual(expected)
    })

    it('float', () => {
      const operator: MirOperator = [OperatorCode.FloatGraterThan, 1.1]
      const argumentInfo: ArgumentInfo = operatorInfos[operator[0]].arguments[0]
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, operator[1])
      const result = argument.getMarkup()
      const expected = {
        hierarchicalType: 'argument',
        id: 1,
        label: 'value',
        markupType: 'input',
        value: 1.1,
        type: 'number',
      }
      expect(result).toStrictEqual(expected)
    })

    it('boolean', () => {
      const operator: MirOperator = [OperatorCode.ArraySort, '', true]
      const argumentInfo: ArgumentInfo = operatorInfos[operator[0]].arguments[1]
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, operator[2])
      const result = argument.getMarkup()
      const expected = {
        hierarchicalType: 'argument',
        id: 1,
        label: 'ascending',
        markupType: 'input',
        value: true,
        type: 'boolean',
      }
      expect(result).toStrictEqual(expected)
    })

    it('subscript', () => {
      const operator: MirOperator = [
        OperatorCode.ArrayMap,
        [[OperatorCode.MapGetString, 'symbol'], OperatorCode.StringToLowerCase],
      ]
      const argumentInfo = operatorInfos[operator[0]].arguments[0]
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, operator[1])
      const result = argument.getMarkup()
      const expected = {
        id: 1,
        label: 'script',
        markupType: 'script',
        outputType: 'subscriptOutput',
        hierarchicalType: 'argument',
        subscript: [
          {
            hierarchicalType: 'operator',
            id: 3,
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
            scriptId: 2,
            selected: {
              arguments: [
                {
                  hierarchicalType: 'argument',
                  id: 4,
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
          {
            hierarchicalType: 'operator',
            id: 5,
            label: 'toLowerCase',
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
            scriptId: 2,
            selected: {
              arguments: [],
              hierarchicalType: 'selectedOperatorOption',
              label: 'toLowerCase',
              markupType: 'option',
              outputType: 'string',
              description: 'Convert to lowercase the input String, and manage the value as String',
            },
          },
        ],
      }

      expect(result).toStrictEqual(expected)
    })

    it('filter', () => {
      const operator: MirOperator = [OperatorCode.ArraySome, 0x03, 1]
      const argumentInfo = operatorInfos[operator[0]].arguments[0]
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, [operator[1], operator[2]] as [
        Filter,
        number
      ])
      const result = argument.getMarkup()
      const expected = {
        hierarchicalType: 'argument',
        id: 1,
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
              hierarchicalType: 'argument',
              id: 2,
              label: 'by',
              markupType: 'input',
              value: 1,
              type: 'string',
            },
          ],
          hierarchicalType: 'selectedOperatorOption',
          label: 'deviationAbsolute',
          outputType: 'filterOutput',
          markupType: 'option',
        },
      }
      expect(result).toStrictEqual(expected)
    })

    it('filter with subscript', () => {
      const operator: MirOperator = [
        OperatorCode.ArrayFilter,
        [
          [OperatorCode.MapGetString, 'symbol'],
          OperatorCode.StringToLowerCase,
          [OperatorCode.StringMatch, '{ "btc": true }', false],
        ],
      ]
      const fakeSelectArgumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentType.FilterFunction,
      }
      const cache = new Cache()
      const argument = new Argument(cache, fakeSelectArgumentInfo, [
        Filter.custom,
        operator[1] as MirScript,
      ])
      const result = argument.getMarkup()
      const expected = {
        hierarchicalType: 'argument',
        id: 1,
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
              id: 2,
              label: 'by',
              markupType: 'script',
              outputType: 'subscriptOutput',
              hierarchicalType: 'argument',
              subscript: [
                {
                  hierarchicalType: 'operator',
                  id: 4,
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
                  scriptId: 3,
                  selected: {
                    arguments: [
                      {
                        hierarchicalType: 'argument',
                        id: 5,
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
                {
                  hierarchicalType: 'operator',
                  id: 6,
                  label: 'toLowerCase',
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
                  scriptId: 3,
                  selected: {
                    arguments: [],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'toLowerCase',
                    markupType: 'option',
                    outputType: 'string',
                    description:
                      'Convert to lowercase the input String, and manage the value as String',
                  },
                },
                {
                  hierarchicalType: 'operator',
                  id: 7,
                  label: 'match',
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
                  outputType: 'matchOutput',
                  scriptId: 3,
                  selected: {
                    arguments: [
                      {
                        hierarchicalType: 'argument',
                        id: 8,
                        label: 'categories',
                        markupType: 'input',
                        value: '{ "btc": true }',
                        type: 'map',
                      },
                      {
                        hierarchicalType: 'argument',
                        id: 9,
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
                      'Match the String input with { "btc": true } and return the value asociated with it. Similar than a switch statement',
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
      }
      expect(result).toStrictEqual(expected)
    })

    it('reducer', () => {
      const operator: MirOperator = [OperatorCode.ArrayReduce, 0x00]
      const argumentInfo = operatorInfos[operator[0]].arguments[0]
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, operator[1])
      const result = argument.getMarkup()
      const expected = {
        hierarchicalType: 'argument',
        id: 1,
        label: 'function',
        markupType: 'select',
        options: reducerOptions,
        outputType: OutputType.ReducerOutput,
        selected: {
          arguments: [],
          hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
          label: 'min',
          markupType: MarkupType.Option,
          outputType: OutputType.ReducerOutput,
        },
      }
      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMir', () => {
    it('string', () => {
      const argumentInfo: ArgumentInfo = operatorInfos[OperatorCode.MapGetMap].arguments[0]
      const cache: Cache = new Cache()
      const argument = new Argument(cache, argumentInfo, 'bpi')
      const result = argument.getMir()
      const expected = 'bpi'

      expect(result).toStrictEqual(expected)
    })

    it('float', () => {
      const argumentInfo: ArgumentInfo = operatorInfos[OperatorCode.FloatGraterThan].arguments[0]
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, 1.1)
      const result = argument.getMir()
      const expected = 1.1

      expect(result).toStrictEqual(expected)
    })

    it('boolean', () => {
      const argumentInfo: ArgumentInfo = operatorInfos[OperatorCode.ArraySort].arguments[1]
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, true)
      const result = argument.getMir()
      const expected = true

      expect(result).toStrictEqual(expected)
    })

    it('subscript', () => {
      const argumentInfo = operatorInfos[OperatorCode.ArrayMap].arguments[0]
      const operator: MirOperator = [
        OperatorCode.ArrayMap,
        [[OperatorCode.MapGetString, 'symbol'], OperatorCode.StringToLowerCase],
      ]
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, operator[1])
      const result = argument.getMir()
      expect(result).toStrictEqual(operator[1])
    })

    it('filter', () => {
      const argumentInfo = operatorInfos[OperatorCode.ArraySome].arguments[0]
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, [0x00, 1])
      const result = argument.getMir()
      const expected = [0x00, 1]

      expect(result).toStrictEqual(expected)
    })

    it('reducer', () => {
      const argumentInfo = operatorInfos[OperatorCode.ArrayReduce].arguments[0]
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, 0x00)
      const result = argument.getMir()
      const expected = 0x00

      expect(result).toStrictEqual(expected)
    })
  })

  describe('update', () => {
    it('optional', () => {
      const cache = new Cache()
      const argumentInfo = {
        name: 'min',
        optional: true,
        type: MirArgumentType.Integer,
      }

      const argument = new Argument(cache, argumentInfo, undefined)
      const newValue = 9
      argument.update(newValue)

      expect(argument.value).toBe(newValue)
    })

    it('integer', () => {
      const cache = new Cache()
      const argumentInfo = {
        name: 'min',
        optional: true,
        type: MirArgumentType.Integer,
      }

      const argument = new Argument(cache, argumentInfo, 0)
      const newValue = 9
      argument.update(newValue)

      expect(argument.value).toBe(newValue)
    })

    it('filter function', () => {
      const cache = new Cache()
      const argumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentType.FilterFunction,
      }
      const argument = new Argument(cache, argumentInfo, [Filter.lessThan, 5])
      argument.update('bottom')
      expect(argument.value).toStrictEqual([Filter.bottom, 5])
    })

    it('filter function from subscript argument to input argument', () => {
      const cache = new Cache()
      const argumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentType.FilterFunction,
      }
      const argument = new Argument(cache, argumentInfo, [
        Filter.custom,
        [DEFAULT_OPERATOR],
      ])
      argument.update('bottom')
      const result = (argument.argument as Argument).argumentInfo.type
      const expected = MirArgumentType.String
      expect(result).toBe(expected)
    })

    it('filter function with subscript', () => {
      const cache = new Cache()
      const argumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentType.FilterFunction,
      }
      const argument = new Argument(cache, argumentInfo, [Filter.lessThan, 5])
      argument.update('custom')
      const result = (argument.argument as Argument).argumentInfo.type
      const expected = MirArgumentType.Subscript
      expect(result).toStrictEqual(expected)
    })

    it('reducer function', () => {
      const cache = new Cache()
      const argumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentType.ReducerFunction,
      }

      const argument = new Argument(cache, argumentInfo, Reducer.averageMeanWeighted)
      const newValue: Reducer = Reducer.averageMean
      argument.update(newValue)

      expect(argument.value).toStrictEqual(newValue)
    })

    it('float', () => {
      const cache = new Cache()
      const argumentInfo = {
        name: 'value',
        optional: false,
        type: MirArgumentType.Float,
      }

      const argument = new Argument(cache, argumentInfo, 0.0)
      const newValue = 1.0
      argument.update(newValue)

      expect(argument.value).toBe(newValue)
    })

    it('string', () => {
      const cache = new Cache()
      const argumentInfo = operatorInfos[OperatorCode.MapGetBoolean].arguments[0]
      const argument = new Argument(cache, argumentInfo, 'key')
      const newValue = 'value'
      argument.update(newValue)

      expect(argument.value).toBe(newValue)
    })

    it('boolean', () => {
      const cache = new Cache()
      const argumentInfo = {
        name: 'ascending',
        optional: false,
        type: MirArgumentType.Boolean,
      }

      const argument = new Argument(cache, argumentInfo, true)
      const newValue = false
      argument.update(newValue)

      expect(argument.value).toBe(newValue)
    })
  })
})
