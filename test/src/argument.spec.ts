import { Argument, generateReducerArgumentOptions } from '../../src/argument'
import { Cache, operatorInfos } from '../../src/structures'
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
              description:
                'Access to the “symbol” key of the input Map, and manage the value as String',
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
              description: 'Convert to lowercase the input String, and manage the value as String',
              arguments: [],
              hierarchicalType: 'selectedOperatorOption',
              label: 'toLowerCase',
              markupType: 'option',
              outputType: 'string',
            },
          },
        ],
      }

      expect(result).toStrictEqual(expected)
    })

    it('filter', () => {
      const operator: MirOperator = [OperatorCode.ArraySome, 0x00, 1]
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
          label: 'greaterThan',
          outputType: 'filterOutput',
          markupType: 'option',
        },
      }
      expect(result).toStrictEqual(expected)
    })

    it('filter with subscript', () => {
      const operator: MirOperator = [
        OperatorCode.ArraySome,
        [[OperatorCode.MapGetString, 'symbol'], OperatorCode.StringToLowerCase],
      ]
      const argumentInfo = operatorInfos[operator[0]].arguments[0]
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, operator[1], true)
      const result = argument.getMarkup()
      const expected = {
        id: 1,
        label: 'function',
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
              description:
                'Access to the “symbol” key of the input Map, and manage the value as String',
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
              description: 'Convert to lowercase the input String, and manage the value as String',
              arguments: [],
              hierarchicalType: 'selectedOperatorOption',
              label: 'toLowerCase',
              markupType: 'option',
              outputType: 'string',
            },
          },
        ],
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
