import { Argument, generateReducerArgumentOptions } from '../../src/argument.js'
import { Cache, operatorInfos } from '../../src/structures.js'
import { DEFAULT_OPERATOR } from '../../src/constants.js'
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
  Context,
} from '../../src/types.js'
import { formatJsTest } from '../utils.js'
import { I18n } from '../../src/i18n.js'

const reducerOptions = generateReducerArgumentOptions()

describe('Argument methods', () => {
  describe('getMarkup', () => {
    it('string', () => {
      const operator: MirOperator = [OperatorCode.MapGetMap, 'bpi']
      const argumentInfo: ArgumentInfo = operatorInfos[operator[0]].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, 'bpi')
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
      const operator: MirOperator = [OperatorCode.FloatGreaterThan, 1.1]
      const argumentInfo: ArgumentInfo = operatorInfos[operator[0]].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, operator[1])
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

    it('with map input', () => {
      const operator: MirOperator = [OperatorCode.StringMatch, { BTC: true }, true]
      const argumentInfo: ArgumentInfo = operatorInfos[operator[0]].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, operator[1])
      const result = argument.getMarkup()
      const expected = {
        hierarchicalType: 'argument',
        id: 1,
        label: 'categories',
        markupType: 'input',
        type: 'map',
        value: {
          BTC: true,
        },
      }

      expect(result).toStrictEqual(expected)
    })

    it('subscript', () => {
      const operator: MirOperator = [
        OperatorCode.ArrayMap,
        [[OperatorCode.MapGetString, 'symbol'], OperatorCode.StringToLowerCase],
      ]
      const argumentInfo = operatorInfos[operator[0]].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, operator[1])

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
                label: 'ArrayJoin',
                markupType: 'option',
                outputType: 'joinOutput',
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
                label: 'ArraySort',
                markupType: 'option',
                outputType: 'same',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'ArrayPick',
                markupType: 'option',
                outputType: 'same',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'BooleanAsString',
                markupType: 'option',
                outputType: 'string',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'BooleanNegate',
                markupType: 'option',
                outputType: 'boolean',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'BytesAsInteger',
                markupType: 'option',
                outputType: 'integer',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'BytesHash',
                markupType: 'option',
                outputType: 'bytes',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'BytesLength',
                markupType: 'option',
                outputType: 'integer',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'BytesSlice',
                markupType: 'option',
                outputType: 'bytes',
              },

              {
                hierarchicalType: 'operatorOption',
                label: 'BytesAsString',
                markupType: 'option',
                outputType: 'string',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'FloatAbsolute',
                markupType: 'option',
                outputType: 'float',
              },

              {
                hierarchicalType: 'operatorOption',
                label: 'FloatCeiling',
                markupType: 'option',
                outputType: 'integer',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'FloatGreaterThan',
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
                label: 'FloatRound',
                markupType: 'option',
                outputType: 'integer',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'FloatAsString',
                markupType: 'option',
                outputType: 'string',
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
                label: 'StringParseXmlMap',
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
                label: 'StringReplace',
                markupType: 'option',
                outputType: 'string',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'StringSlice',
                markupType: 'option',
                outputType: 'string',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'StringSplit',
                markupType: 'option',
                outputType: 'string',
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
                label: 'MapValues',
                markupType: 'option',
                outputType: 'arrayArray',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'MapAlter',
                markupType: 'option',
                outputType: 'map',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'MapPick',
                markupType: 'option',
                outputType: 'map',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'MapStringify',
                markupType: 'option',
                outputType: 'string',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'IntegerAbsolute',
                markupType: 'option',
                outputType: 'integer',
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
                label: 'IntegerToBytes',
                markupType: 'option',
                outputType: 'bytes',
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
                'Access to the "symbol" key of the input Map, and manage the value as String',
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
                label: 'StringParseXmlMap',
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
                label: 'StringReplace',
                markupType: 'option',
                outputType: 'string',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'StringSlice',
                markupType: 'option',
                outputType: 'string',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'StringSplit',
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
      const operator: MirOperator = [OperatorCode.ArrayFilter, 0x05, 1]
      const argumentInfo = operatorInfos[operator[0]].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, [operator[1], operator[2]] as [
        Filter,
        number,
      ])
      const result = argument.getMarkup()
      const expected = {
        hierarchicalType: 'argument',
        id: 1,
        label: 'function',
        markupType: 'select',
        options: [
          {
            label: 'deviationStandard',
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
          label: 'deviationStandard',
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
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, fakeSelectArgumentInfo, [
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
            label: 'deviationStandard',
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
                      label: 'ArrayJoin',
                      markupType: 'option',
                      outputType: 'joinOutput',
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
                      label: 'ArraySort',
                      markupType: 'option',
                      outputType: 'same',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'ArrayPick',
                      markupType: 'option',
                      outputType: 'same',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'BooleanAsString',
                      markupType: 'option',
                      outputType: 'string',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'BooleanNegate',
                      markupType: 'option',
                      outputType: 'boolean',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'BytesAsInteger',
                      markupType: 'option',
                      outputType: 'integer',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'BytesHash',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'BytesLength',
                      markupType: 'option',
                      outputType: 'integer',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'BytesSlice',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'BytesAsString',
                      markupType: 'option',
                      outputType: 'string',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'FloatAbsolute',
                      markupType: 'option',
                      outputType: 'float',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'FloatCeiling',
                      markupType: 'option',
                      outputType: 'integer',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'FloatGreaterThan',
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
                      label: 'FloatRound',
                      markupType: 'option',
                      outputType: 'integer',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'FloatAsString',
                      markupType: 'option',
                      outputType: 'string',
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
                      label: 'StringParseXmlMap',
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
                      label: 'StringReplace',
                      markupType: 'option',
                      outputType: 'string',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'StringSlice',
                      markupType: 'option',
                      outputType: 'string',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'StringSplit',
                      markupType: 'option',
                      outputType: 'string',
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
                      label: 'MapValues',
                      markupType: 'option',
                      outputType: 'arrayArray',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'MapAlter',
                      markupType: 'option',
                      outputType: 'map',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'MapPick',
                      markupType: 'option',
                      outputType: 'map',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'MapStringify',
                      markupType: 'option',
                      outputType: 'string',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'IntegerAbsolute',
                      markupType: 'option',
                      outputType: 'integer',
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
                      label: 'IntegerToBytes',
                      markupType: 'option',
                      outputType: 'bytes',
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
                      'Access to the "symbol" key of the input Map, and manage the value as String',
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
                      label: 'StringParseXmlMap',
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
                      label: 'StringReplace',
                      markupType: 'option',
                      outputType: 'string',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'StringSlice',
                      markupType: 'option',
                      outputType: 'string',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'StringSplit',
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
                      label: 'StringParseXmlMap',
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
                      label: 'StringReplace',
                      markupType: 'option',
                      outputType: 'string',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'StringSlice',
                      markupType: 'option',
                      outputType: 'string',
                    },
                    {
                      hierarchicalType: 'operatorOption',
                      label: 'StringSplit',
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
                        markupType: 'select',
                        options: [
                          {
                            hierarchicalType: 'operatorOption',
                            label: true,
                            markupType: 'option',
                            outputType: 'boolean',
                          },
                          {
                            hierarchicalType: 'operatorOption',
                            label: false,
                            markupType: 'option',
                            outputType: 'boolean',
                          },
                        ],
                        outputType: 'boolean',
                        selected: {
                          arguments: [],
                          hierarchicalType: 'selectedOperatorOption',
                          label: false,
                          markupType: 'option',
                          outputType: 'boolean',
                        },
                      },
                    ],
                    hierarchicalType: 'selectedOperatorOption',
                    label: 'match',
                    markupType: 'option',
                    outputType: 'matchOutput',
                    description:
                      'Match the String input with { "btc": true } and return the value associated with it. Similar than a switch statement',
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
      const operator: MirOperator = [OperatorCode.ArrayReduce, 0x02]
      const argumentInfo = operatorInfos[operator[0]].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, operator[1])
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
          label: 'mode',
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
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, 'bpi')
      const result = argument.getMir()
      const expected = 'bpi'

      expect(result).toStrictEqual(expected)
    })

    it('float', () => {
      const argumentInfo: ArgumentInfo = operatorInfos[OperatorCode.FloatGreaterThan].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, 1.1)
      const result = argument.getMir()
      const expected = 1.1

      expect(result).toStrictEqual(expected)
    })

    it('boolean', () => {
      const argumentInfo: ArgumentInfo = operatorInfos[OperatorCode.StringMatch].arguments[1]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, true)
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
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, operator[1])
      const result = argument.getMir()
      expect(result).toStrictEqual(operator[1])
    })

    it('filter', () => {
      const argumentInfo = operatorInfos[OperatorCode.ArrayFilter].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, [0x00, 1])
      const result = argument.getMir()
      const expected = [0x00, 1]

      expect(result).toStrictEqual(expected)
    })

    it('reducer', () => {
      const argumentInfo = operatorInfos[OperatorCode.ArrayReduce].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, 0x00)
      const result = argument.getMir()
      const expected = 0x00

      expect(result).toStrictEqual(expected)
    })

    describe('with map input', () => {
      it('with well formatted map', () => {
        const operator: MirOperator = [OperatorCode.StringMatch, '{ BTC: true }', true]
        const argumentInfo: ArgumentInfo = operatorInfos[operator[0]].arguments[0]
        const context: Context = { cache: new Cache(), i18n: new I18n() }
        const argument = new Argument(context, argumentInfo, operator[1])
        const result = argument.getMir()

        expect(result).toStrictEqual({ BTC: true })
      })

      it('with malformed map', () => {
        // this test will show a warn log
        const operator: MirOperator = [OperatorCode.StringMatch, '{abc', true]
        const argumentInfo: ArgumentInfo = operatorInfos[operator[0]].arguments[0]
        const context: Context = { cache: new Cache(), i18n: new I18n() }
        const argument = new Argument(context, argumentInfo, operator[1])
        const result = argument.getMir()

        expect(result).toStrictEqual('{abc')
      })
    })
  })

  describe('getJs', () => {
    it('string', () => {
      const argumentInfo: ArgumentInfo = operatorInfos[OperatorCode.MapGetMap].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, 'bpi')
      const result = argument.getJs()
      const expected = '"bpi"'

      expect(result).toStrictEqual(expected)
    })

    it('float', () => {
      const argumentInfo: ArgumentInfo = operatorInfos[OperatorCode.FloatGreaterThan].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, 1.1)
      const result = argument.getJs()
      const expected = 1.1

      expect(result).toStrictEqual(expected)
    })

    it('boolean', () => {
      const argumentInfo: ArgumentInfo = operatorInfos[OperatorCode.StringMatch].arguments[1]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, true)
      const result = argument.getJs()
      const expected = true

      expect(result).toStrictEqual(expected)
    })

    it('subscript', () => {
      const argumentInfo = operatorInfos[OperatorCode.ArrayMap].arguments[0]
      const operator: MirOperator = [
        OperatorCode.ArrayMap,
        [[OperatorCode.MapGetString, 'symbol'], OperatorCode.StringToLowerCase],
      ]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, operator[1])
      const result = formatJsTest(`${argument.getJs()}`)
      const expected = formatJsTest('new Script().getString("symbol").toLowerCase()')

      expect(result).toStrictEqual(expected)
    })

    it('filter', () => {
      const argumentInfo = operatorInfos[OperatorCode.ArrayFilter].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, [0x00, 1])
      const result = argument.getJs()
      const expected = '1'

      expect(result).toStrictEqual(expected)
    })

    it('reducer', () => {
      const argumentInfo = operatorInfos[OperatorCode.ArrayReduce].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, 0x02)
      const result = argument.getJs()
      const expected = 'mode'

      expect(result).toStrictEqual(expected)
    })

    it('with map input', () => {
      const operator: MirOperator = [OperatorCode.StringMatch, { BTC: true }, true]
      const argumentInfo: ArgumentInfo = operatorInfos[operator[0]].arguments[0]
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argument = new Argument(context, argumentInfo, operator[1])
      const result = argument.getJs()

      expect(result).toStrictEqual('{"BTC":true}')
    })
  })

  describe('update', () => {
    it('optional', () => {
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argumentInfo = {
        name: 'min',
        optional: true,
        type: MirArgumentType.Integer,
      }

      const argument = new Argument(context, argumentInfo, undefined)
      const newValue = 9
      argument.update(newValue)

      expect(argument.value).toBe(newValue)
    })

    it('integer', () => {
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argumentInfo = {
        name: 'min',
        optional: true,
        type: MirArgumentType.Integer,
      }

      const argument = new Argument(context, argumentInfo, 0)
      const newValue = 9
      argument.update(newValue)

      expect(argument.value).toBe(newValue)
    })

    it('filter function', () => {
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentType.FilterFunction,
      }
      const argument = new Argument(context, argumentInfo, [Filter.deviationStandard, 5])
      argument.update('mode')
      expect(argument.value).toStrictEqual([Filter.mode, 5])
    })

    it('filter function from subscript argument to input argument', () => {
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentType.FilterFunction,
      }
      const argument = new Argument(context, argumentInfo, [Filter.custom, [DEFAULT_OPERATOR]])
      argument.update('bottom')
      const result = (argument.argument as Argument).argumentInfo.type
      const expected = MirArgumentType.String
      expect(result).toBe(expected)
    })

    it('filter function with subscript', () => {
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentType.FilterFunction,
      }
      const argument = new Argument(context, argumentInfo, [Filter.deviationStandard, 5])
      argument.update('custom')
      const result = (argument.argument as Argument).argumentInfo.type
      const expected = MirArgumentType.Subscript
      expect(result).toStrictEqual(expected)
    })

    it('reducer function', () => {
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentType.ReducerFunction,
      }

      const argument = new Argument(context, argumentInfo, Reducer.averageMean)
      const newValue: Reducer = Reducer.averageMean
      argument.update(Reducer[newValue])

      expect(argument.value).toStrictEqual(newValue)
    })

    it('float', () => {
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argumentInfo = {
        name: 'value',
        optional: false,
        type: MirArgumentType.Float,
      }

      const argument = new Argument(context, argumentInfo, 0.0)
      const newValue = 1.0
      argument.update(newValue)

      expect(argument.value).toBe(newValue)
    })

    it('string', () => {
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argumentInfo = operatorInfos[OperatorCode.MapGetBoolean].arguments[0]
      const argument = new Argument(context, argumentInfo, 'key')
      const newValue = 'value'
      argument.update(newValue)

      expect(argument.value).toBe(newValue)
    })

    it('boolean', () => {
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const argumentInfo = {
        name: 'ascending',
        optional: false,
        type: MirArgumentType.Boolean,
      }

      const argument = new Argument(context, argumentInfo, true)
      const newValue = false
      argument.update(newValue)

      expect(argument.value).toBe(newValue)
    })

    it('map input', () => {
      const context: Context = { cache: new Cache(), i18n: new I18n() }
      const operator: MirOperator = [OperatorCode.StringMatch, { BTC: true }, true]
      const argumentInfo: ArgumentInfo = operatorInfos[operator[0]].arguments[0]
      const argument = new Argument(context, argumentInfo, operator[1])
      const newValue = { ETH: false }
      argument.update(newValue)

      expect(argument.value).toStrictEqual(newValue)
    })
  })
})
