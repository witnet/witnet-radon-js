import { Operator } from '../src/radon'
import { OperatorCode, OutputType, MirOperator } from '../src/types'
import { Cache, markupOptions, allMarkupOptions, operatorInfos } from '../src/structures'

describe('Operator methods', () => {
  describe('getMarkup', () => {
    it('default operator', () => {
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Array, null, { emit: () => {} })

      const result = operator.getMarkup()
      const expected = {
        hierarchicalType: 'operator',
        id: 1,
        label: 'count',
        markupType: 'select',
        options: allMarkupOptions,
        outputType: 'integer',
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'count',
          markupType: 'option',
          outputType: 'integer',
        },
      }

      expect(result).toStrictEqual(expected)
    })

    it('array', () => {
      const op = OperatorCode.ArrayCount
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Array, op, { emit: () => {} })

      const result = operator.getMarkup()
      const expected = {
        hierarchicalType: 'operator',
        id: 1,
        scriptId: 0,
        label: 'count',
        markupType: 'select',
        options: markupOptions.array,
        outputType: 'integer',
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'count',
          markupType: 'option',
          outputType: 'integer',
        },
      }

      expect(result).toStrictEqual(expected)
    })

    it('boolean', () => {
      const op = OperatorCode.BooleanNegate
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Boolean, op, { emit: () => {} })

      const result = operator.getMarkup()
      const expected = {
        hierarchicalType: 'operator',
        id: 1,
        scriptId: 0,
        label: 'negate',
        markupType: 'select',
        options: markupOptions.boolean,
        outputType: 'boolean',
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'negate',
          markupType: 'option',
          outputType: 'boolean',
        },
      }

      expect(result).toStrictEqual(expected)
    })

    it('bytes', () => {
      const op = OperatorCode.BytesAsString
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Bytes, op, { emit: () => {} })

      const result = operator.getMarkup()
      const expected = {
        hierarchicalType: 'operator',
        id: 1,
        scriptId: 0,
        label: 'asString',
        markupType: 'select',
        options: markupOptions.bytes,
        outputType: 'string',
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asString',
          markupType: 'option',
          outputType: 'string',
        },
      }

      expect(result).toStrictEqual(expected)
    })

    it('integer', () => {
      const op = OperatorCode.IntegerAbsolute
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Integer, op, { emit: () => {} })

      const result = operator.getMarkup()
      const expected = {
        hierarchicalType: 'operator',
        id: 1,
        scriptId: 0,
        label: 'absolute',
        markupType: 'select',
        options: markupOptions.integer,
        outputType: 'integer',
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'absolute',
          markupType: 'option',
          outputType: 'integer',
        },
      }

      expect(result).toStrictEqual(expected)
    })

    it('float', () => {
      const op = OperatorCode.FloatAbsolute
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Float, op, { emit: () => {} })

      const result = operator.getMarkup()
      const expected = {
        hierarchicalType: 'operator',
        id: 1,
        scriptId: 0,
        label: 'absolute',
        markupType: 'select',
        options: markupOptions.float,
        outputType: 'float',
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'absolute',
          markupType: 'option',
          outputType: 'float',
        },
      }

      expect(result).toStrictEqual(expected)
    })

    it('map', () => {
      const op = OperatorCode.MapGetMap
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Map, op, { emit: () => {} })

      const result = operator.getMarkup()
      const expected = {
        hierarchicalType: 'operator',
        id: 1,
        scriptId: 0,
        label: 'get_map',
        markupType: 'select',
        options: markupOptions.map,
        outputType: 'map',
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'get_map',
          markupType: 'option',
          outputType: 'map',
        },
      }

      expect(result).toStrictEqual(expected)
    })

    it('string', () => {
      const op = OperatorCode.StringAsBoolean
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.String, op, { emit: () => {} })

      const result = operator.getMarkup()
      const expected = {
        hierarchicalType: 'operator',
        id: 1,
        scriptId: 0,
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
      }

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMir', () => {
    it('default operator', () => {
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Array, null, { emit: () => {} })

      const result = operator.getMir()
      const expected = OperatorCode.ArrayCount

      expect(result).toStrictEqual(expected)
    })

    it('array', () => {
      const op = OperatorCode.ArrayCount
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Array, op, { emit: () => {} })

      const result = operator.getMir()
      const expected = op

      expect(result).toStrictEqual(expected)
    })

    it('boolean', () => {
      const op = OperatorCode.BooleanNegate
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Boolean, op, { emit: () => {} })

      const result = operator.getMir()
      const expected = op

      expect(result).toStrictEqual(expected)
    })

    it('bytes', () => {
      const op = OperatorCode.BytesAsString
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Bytes, op, { emit: () => {} })

      const result = operator.getMir()
      const expected = op

      expect(result).toStrictEqual(expected)
    })

    it('integer', () => {
      const op = OperatorCode.IntegerAbsolute
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Integer, op, { emit: () => {} })

      const result = operator.getMir()
      const expected = op

      expect(result).toStrictEqual(expected)
    })

    it('float', () => {
      const op = OperatorCode.FloatAbsolute
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Float, op, { emit: () => {} })

      const result = operator.getMir()
      const expected = op

      expect(result).toStrictEqual(expected)
    })

    it('map', () => {
      const op = [OperatorCode.MapGetMap, '']
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.Map, op as MirOperator, { emit: () => {} })

      const result = operator.getMir()
      const expected = op

      expect(result).toStrictEqual(expected)
    })

    it('string', () => {
      const op = OperatorCode.StringAsBoolean
      const cache = new Cache()
      const operator = new Operator(cache, 0, OutputType.String, op, { emit: () => {} })

      const result = operator.getMir()
      const expected = op

      expect(result).toStrictEqual(expected)
    })
  })

  describe('update', () => {
    it('default operator', () => {
      const cache = new Cache()
      const emitMock = jest.fn()
      const operator = new Operator(cache, 0, null, null, { emit: emitMock })
      const newOperatorCode = OperatorCode.BooleanMatch

      expect(operator.default).toBe(true)
      operator.update(newOperatorCode)
      expect(operator.code).toBe(newOperatorCode)
      expect(operator.operatorInfo).toBe(operatorInfos[newOperatorCode])
      expect(operator.default).toBe(false)
      expect(operator.inputType).toBe(OutputType.Array)
      expect(emitMock).toBeCalledTimes(1)
    })

    it('array', () => {
      const cache = new Cache()
      const emitMock = jest.fn()
      const op = OperatorCode.ArrayCount
      const operator = new Operator(cache, 0, OutputType.Array, op, { emit: emitMock })
      const newOperatorCode = OperatorCode.BooleanMatch

      operator.update(newOperatorCode)
      expect(operator.code).toBe(newOperatorCode)
      expect(operator.operatorInfo).toBe(operatorInfos[newOperatorCode])
      expect(operator.inputType).toBe(OutputType.Array)
      expect(emitMock).toBeCalledTimes(1)
    })

    it('boolean', () => {
      const cache = new Cache()
      const emitMock = jest.fn()
      const op = OperatorCode.BooleanMatch
      const operator = new Operator(cache, 0, OutputType.Boolean, op, { emit: emitMock })
      const newOperatorCode = OperatorCode.ArrayCount

      operator.update(newOperatorCode)
      expect(operator.code).toBe(newOperatorCode)
      expect(operator.operatorInfo).toBe(operatorInfos[newOperatorCode])
      expect(operator.inputType).toBe(OutputType.Boolean)
      expect(emitMock).toBeCalledTimes(1)
    })

    it('bytes', () => {
      const cache = new Cache()
      const emitMock = jest.fn()
      const op = OperatorCode.BytesAsString
      const operator = new Operator(cache, 0, OutputType.Bytes, op, { emit: emitMock })
      const newOperatorCode = OperatorCode.ArrayCount

      operator.update(newOperatorCode)
      expect(operator.code).toBe(newOperatorCode)
      expect(operator.operatorInfo).toBe(operatorInfos[newOperatorCode])
      expect(operator.inputType).toBe(OutputType.Bytes)
      expect(emitMock).toBeCalledTimes(1)
    })

    it('integer', () => {
      const cache = new Cache()
      const emitMock = jest.fn()
      const op = OperatorCode.IntegerAsString
      const operator = new Operator(cache, 0, OutputType.Integer, op, { emit: emitMock })
      const newOperatorCode = OperatorCode.FloatGraterThan

      operator.update(newOperatorCode)
      expect(operator.code).toBe(newOperatorCode)
      expect(operator.operatorInfo).toBe(operatorInfos[newOperatorCode])
      expect(operator.inputType).toBe(OutputType.Integer)
      expect(emitMock).toBeCalledTimes(1)
    })

    it('float', () => {
      const cache = new Cache()
      const emitMock = jest.fn()
      const op = OperatorCode.FloatAbsolute
      const operator = new Operator(cache, 0, OutputType.Float, op, { emit: emitMock })
      const newOperatorCode = OperatorCode.FloatCeiling

      operator.update(newOperatorCode)
      expect(operator.code).toBe(newOperatorCode)
      expect(operator.operatorInfo).toBe(operatorInfos[newOperatorCode])
      expect(operator.inputType).toBe(OutputType.Float)
      expect(emitMock).toBeCalledTimes(1)
    })

    it('map', () => {
      const cache = new Cache()
      const emitMock = jest.fn()
      const op = OperatorCode.MapKeys
      const operator = new Operator(cache, 0, OutputType.Map, op, { emit: emitMock })
      const newOperatorCode = OperatorCode.MapGetString

      operator.update(newOperatorCode)
      expect(operator.code).toBe(newOperatorCode)
      expect(operator.operatorInfo).toBe(operatorInfos[newOperatorCode])
      expect(operator.inputType).toBe(OutputType.Map)
      expect(emitMock).toBeCalledTimes(1)
    })

    it('string', () => {
      const cache = new Cache()
      const emitMock = jest.fn()
      const op = OperatorCode.StringAsFloat
      const operator = new Operator(cache, 0, OutputType.String, op, { emit: emitMock })
      const newOperatorCode = OperatorCode.StringAsInteger

      operator.update(newOperatorCode)
      expect(operator.code).toBe(newOperatorCode)
      expect(operator.operatorInfo).toBe(operatorInfos[newOperatorCode])
      expect(operator.inputType).toBe(OutputType.String)
      expect(emitMock).toBeCalledTimes(1)
    })
  })
})
