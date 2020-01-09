import {
  Argument,
  generateReducerArgumentOptions,
  generateFilterArgumentOptions,
} from '../src/radon'
import { Cache, operatorInfos } from '../src/structures'
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
} from '../src/types'

const reducerOptions = generateReducerArgumentOptions()
const filterOptions = generateFilterArgumentOptions()

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
      }
      expect(result).toStrictEqual(expected)
    })

    it('subscript', () => {
      const operator: MirOperator = [OperatorCode.ArrayMap, 'x => x + 1']
      const argumentInfo = operatorInfos[operator[0]].arguments[0]
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, operator[1])
      const result = argument.getMarkup()
      const expected = {
        hierarchicalType: 'argument',
        id: 1,
        label: 'script',
        markupType: 'input',
        value: 'x => x + 1',
      }
      expect(result).toStrictEqual(expected)
    })

    it('filter', () => {
      const operator: MirOperator = [OperatorCode.ArraySome, 0x00, 1]
      const argumentInfo = operatorInfos[operator[0]].arguments[0]
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, operator[1])
      const result = argument.getMarkup()
      const expected = {
        hierarchicalType: 'argument',
        id: 1,
        label: 'function',
        markupType: 'select',
        options: filterOptions,
        outputType: 'filterOutput',
        selected: {
          arguments: [],
          hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
          label: 'greaterThan',
          markupType: MarkupType.Option,
          outputType: OutputType.FilterOutput,
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
      const cache = new Cache()
      const argument = new Argument(cache, argumentInfo, 'x => x + 1')
      const result = argument.getMir()
      const expected = 'x => x + 1'

      expect(result).toStrictEqual(expected)
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

    it('subscript', () => {
      const cache = new Cache()
      const argumentInfo: ArgumentInfo = {
        name: 'categories',
        optional: false,
        type: MirArgumentType.Subscript,
      }

      const argument = new Argument(cache, argumentInfo, 'subscript_1')
      const newValue = 'subscript_2'
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

      const argument = new Argument(cache, argumentInfo, [Filter.LessThan, 5])
      const newValue = Filter.bottom
      argument.update(newValue)

      expect(argument.value).toStrictEqual([newValue, 5])
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
