import {
  findOperatorCode,
  generateMirOperator,
  generateMirArgument,
  generateMirArguments,
  getFilterCode,
  getReducerCode,
  generateMirScript,
  generateMirSources,
  markup2mir,
} from '../src/markup2mir'
import { getEnumNames, getEnumValues } from '../src/utils'
import {
  ArrayOperatorName,
  StringOperatorName,
  BooleanOperatorName,
  IntegerOperatorName,
  FloatOperatorName,
  MapOperatorName,
  BytesOperatorName,
  MarkupHierarchicalType,
  MirArgumentKind,
  Filter,
  MarkupInput,
  MarkupType,
  Reducer,
  OutputType,
  MarkupSelect,
  MarkupOption,
  MarkupOperator,
  MarkupScript,
  Mir,
  Markup,
} from '../src/types'

const REDUCERS = getEnumNames(Reducer)
const FILTERS = getEnumNames(Filter)

describe('mir2markup', () => {
  describe('findOperatorCode should return correct code for each type', () => {
    it('boolean', () => {
      expect(
        findOperatorCode('negate' as BooleanOperatorName, getEnumValues(BooleanOperatorName))
      ).toBe(0x11)
    })
    it('integer', () => {
      expect(
        findOperatorCode('absolute' as IntegerOperatorName, getEnumValues(IntegerOperatorName))
      ).toBe(0x20)
    })
    it('float', () => {
      expect(
        findOperatorCode('ceiling' as FloatOperatorName, getEnumValues(FloatOperatorName))
      ).toBe(0x33)
    })
    it('string', () => {
      expect(
        findOperatorCode('asBytes' as StringOperatorName, getEnumValues(StringOperatorName))
      ).toBe(0x40)
    })
    it('array', () => {
      expect(findOperatorCode('count' as ArrayOperatorName, getEnumValues(ArrayOperatorName))).toBe(
        0x51
      )
    })
    it('map', () => {
      expect(findOperatorCode('entries' as MapOperatorName, getEnumValues(MapOperatorName))).toBe(
        0x60
      )
    })
    it('bytes', () => {
      expect(
        findOperatorCode('asArray' as BytesOperatorName, getEnumValues(BytesOperatorName))
      ).toBe(0x70)
    })
  })

  describe('generateMirOperator returns the correct MIR', () => {
    it('without arguments', () => {
      const operatorCode = 0x11
      expect(generateMirOperator(operatorCode, null)).toBe(operatorCode)
    })
    it('with 1 argument', () => {
      const operatorCode = 0x11
      const args = [10]
      expect(generateMirOperator(operatorCode, args)).toStrictEqual([operatorCode, 10])
    })
    it('with 2 argument', () => {
      const operatorCode = 0x5a
      const args = [10, 20]
      expect(generateMirOperator(operatorCode, args)).toStrictEqual([operatorCode, 10, 20])
    })
  })

  it('getFilterCode returns the correct code', () => {
    expect(getFilterCode(('greaterThan' as unknown) as Filter)).toBe(0x00)
    expect(getFilterCode(('notBottom' as unknown) as Filter)).toBe(0x87)
  })

  it('getReducerCode returns the correct code', () => {
    expect(getReducerCode(('min' as unknown) as Reducer)).toBe(0x00)
    expect(getReducerCode(('max' as unknown) as Reducer)).toBe(0x01)
  })

  describe('generateMirArgument should return the correct mir', () => {
    it('markupInput argument', () => {
      // operatorCode = 0x61
      const value = 'bpi'
      const markupInput: MarkupInput = {
        hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
        id: 0,
        label: 'key',
        markupType: 'input' as MarkupType.Input,
        value: value,
      }
      const argumentInfo = {
        name: 'key',
        optional: false,
        type: 12 as MirArgumentKind.String,
      }
      expect(generateMirArgument(markupInput, argumentInfo)).toBe(value)
    })

    it('markupSelect reducer', () => {
      const result: MarkupSelect = {
        hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
        id: 0,
        scriptId: 0,
        label: 'function',
        markupType: 'select' as MarkupType.Select,
        options: REDUCERS.map(reducer => ({
          arguments: [],
          hierarchicalType: 'operatorOption',
          label: reducer,
          markupType: 'option',
          outputType: 'bytes',
        })) as Array<MarkupOption>,
        outputType: 'integer' as OutputType,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
          label: 'min',
          markupType: 'option' as MarkupType.Option,
          outputType: 'bytes' as OutputType.Bytes,
        },
      }

      const argumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Reducer,
      }
      const reducerMin = 0x00
      expect(generateMirArgument(result, argumentInfo)).toStrictEqual(reducerMin)
    })
    it('markupSelect filter', () => {
      const options: Array<MarkupOption> = FILTERS.map(filter => ({
        arguments: [],
        hierarchicalType: 'operatorOption',
        label: filter,
        markupType: 'option',
        outputType: 'bytes',
      })) as Array<MarkupOption>
      const result: MarkupSelect = {
        hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
        id: 0,
        scriptId: 0,
        label: 'function',
        markupType: 'select' as MarkupType.Select,
        options: options,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
              id: 0,
              label: 'by',
              markupType: 'input' as MarkupType.Input,
              value: 5,
            },
          ],
          hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
          label: 'greaterThan',
          markupType: 'option' as MarkupType.Option,
          outputType: 'bytes' as OutputType,
        },
        outputType: 'bytes' as OutputType,
      }

      const argumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentKind.Filter,
      }

      const filter = [0x00, 5]
      expect(generateMirArgument(result, argumentInfo)).toStrictEqual(filter)
    })
  })

  describe('generateMirArguments should return the correct mir', () => {
    it('operator without arguments', () => {
      const markupOperator: MarkupOperator = {
        hierarchicalType: 'operator' as MarkupHierarchicalType.Operator,
        id: 0,
        markupType: 'select' as MarkupType.Select,
        options: [
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'asString',
            markupType: 'option' as MarkupType.Option,
            outputType: 'string' as OutputType.String,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'match',
            markupType: 'option' as MarkupType.Option,
            outputType: 'argument' as OutputType.Argument,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'negate',
            markupType: 'option' as MarkupType.Option,
            outputType: 'boolean' as OutputType.Boolean,
          },
        ],
        outputType: 'boolean' as OutputType.Boolean,
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
          label: 'negate',
          markupType: 'option' as MarkupType.Option,
          outputType: 'boolean' as OutputType.Boolean,
        },
      }
      expect(generateMirArguments(markupOperator, 0x11)).toBe(null)
    })

    it('operator with 1 argument', () => {
      const markupOperator: MarkupOperator = {
        hierarchicalType: 'operator' as MarkupHierarchicalType.Operator,
        id: 0,
        markupType: 'select' as MarkupType.Select,
        options: [
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'absolute',
            markupType: 'option' as MarkupType.Option,
            outputType: 'integer' as OutputType.Integer,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'asBytes',
            markupType: 'option' as MarkupType.Option,
            outputType: 'bytes' as OutputType.Bytes,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'asFloat',
            markupType: 'option' as MarkupType.Option,
            outputType: 'float' as OutputType.Float,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'asString',
            markupType: 'option' as MarkupType.Option,
            outputType: 'string' as OutputType.String,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'greaterThan',
            markupType: 'option' as MarkupType.Option,
            outputType: 'boolean' as OutputType.Boolean,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'lessThan',
            markupType: 'option' as MarkupType.Option,
            outputType: 'boolean' as OutputType.Boolean,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'match',
            markupType: 'option' as MarkupType.Option,
            outputType: 'argument' as OutputType.Argument,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'modulo',
            markupType: 'option' as MarkupType.Option,
            outputType: 'integer' as OutputType.Integer,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'multiply',
            markupType: 'option' as MarkupType.Option,
            outputType: 'integer' as OutputType.Integer,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'negate',
            markupType: 'option' as MarkupType.Option,
            outputType: 'integer' as OutputType.Integer,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'power',
            markupType: 'option' as MarkupType.Option,
            outputType: 'integer' as OutputType.Integer,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'reciprocal',
            markupType: 'option' as MarkupType.Option,
            outputType: 'float' as OutputType.Float,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'sum',
            markupType: 'option' as MarkupType.Option,
            outputType: 'integer' as OutputType.Integer,
          },
        ],
        outputType: 'string' as OutputType.String,
        scriptId: 0,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
              id: 0,
              label: 'base',
              markupType: 'input' as MarkupType.Input,
              value: 10,
            },
          ],
          hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
          label: 'asString',
          markupType: 'option' as MarkupType.Option,
          outputType: 'string' as OutputType.String,
        },
      }
      expect(generateMirArguments(markupOperator, 0x23)).toStrictEqual([10])
    })

    it('with 2 argument', () => {
      // const markupOperator = generateMarkupOperator([0x10, 'a', 'b'])
      const markupOperator: MarkupOperator = {
        hierarchicalType: 'operator' as MarkupHierarchicalType.Operator,
        id: 0,
        markupType: 'select' as MarkupType.Select,
        options: [
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'asString',
            markupType: 'option' as MarkupType.Option,
            outputType: 'string' as OutputType.String,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'match',
            markupType: 'option' as MarkupType.Option,
            outputType: 'argument' as OutputType.Argument,
          },
          {
            hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
            label: 'negate',
            markupType: 'option' as MarkupType.Option,
            outputType: 'boolean' as OutputType.Boolean,
          },
        ],
        outputType: 'argument' as OutputType.Argument,
        scriptId: 0,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
              id: 0,
              label: 'categories',
              markupType: 'input' as MarkupType.Input,
              value: 'a',
            },
            {
              hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
              id: 0,
              label: 'default',
              markupType: 'input' as MarkupType.Input,
              value: 'b',
            },
          ],
          hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
          label: 'match',
          markupType: 'option' as MarkupType.Option,
          outputType: 'argument' as OutputType.Argument,
        },
      }
      expect(generateMirArguments(markupOperator, 0x10)).toStrictEqual(['a', 'b'])
    })
  })

  it('generateMirScript should return the correct mir', () => {
    const expected = [69, 116, [97, 'bpi'], 116, [97, 'rate_float'], 114]
    const markupScript: MarkupScript = [
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asBytes',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'integer',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'length',
            markupType: 'option',
            outputType: 'integer',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'match',
            markupType: 'option',
            outputType: 'argument',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'parseJson',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'parseXml',
            markupType: 'option',
            outputType: 'map',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'toLowerCase',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'toUpperCase',
            markupType: 'option',
            outputType: 'string',
          },
        ],
        outputType: 'bytes',
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'parseJson',
          markupType: 'option',
          outputType: 'bytes',
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asArray',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asMap',
            markupType: 'option',
            outputType: ['map', 'bytes'],
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'hash',
            markupType: 'option',
            outputType: 'bytes',
          },
        ],
        outputType: ['map', 'bytes'],
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asMap',
          markupType: 'option',
          outputType: ['map', 'bytes'],
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'entries',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'get',
            markupType: 'option',
            outputType: 'inner',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'keys',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'values',
            markupType: 'option',
            outputType: 'inner',
          },
        ],
        outputType: 'inner',
        scriptId: 0,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument',
              id: 0,
              label: 'key',
              markupType: 'input',
              value: 'bpi',
            },
          ],
          hierarchicalType: 'selectedOperatorOption',
          label: 'get',
          markupType: 'option',
          outputType: 'inner',
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asArray',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asMap',
            markupType: 'option',
            outputType: ['map', 'bytes'],
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'hash',
            markupType: 'option',
            outputType: 'bytes',
          },
        ],
        outputType: ['map', 'bytes'],
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asMap',
          markupType: 'option',
          outputType: ['map', 'bytes'],
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'entries',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'get',
            markupType: 'option',
            outputType: 'inner',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'keys',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'values',
            markupType: 'option',
            outputType: 'inner',
          },
        ],
        outputType: 'inner',
        scriptId: 0,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument',
              id: 0,
              label: 'key',
              markupType: 'input',
              value: 'rate_float',
            },
          ],
          hierarchicalType: 'selectedOperatorOption',
          label: 'get',
          markupType: 'option',
          outputType: 'inner',
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asArray',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asMap',
            markupType: 'option',
            outputType: ['map', 'bytes'],
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'hash',
            markupType: 'option',
            outputType: 'bytes',
          },
        ],
        outputType: 'float',
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asFloat',
          markupType: 'option',
          outputType: 'float',
        },
      },
    ] as Array<MarkupSelect>

    expect(generateMirScript(markupScript)).toStrictEqual(expected)
  })

  it('generateMirSource should return the correct mir', () => {
    const expected = {
      script: [69, 116, [97, 'bpi'], 116, [97, 'rate'], 114],
      url: 'url',
    }

    const markupScript: MarkupScript = [
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asBytes',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'integer',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'length',
            markupType: 'option',
            outputType: 'integer',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'match',
            markupType: 'option',
            outputType: 'argument',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'parseJson',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'parseXml',
            markupType: 'option',
            outputType: 'map',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'toLowerCase',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'toUpperCase',
            markupType: 'option',
            outputType: 'string',
          },
        ],
        outputType: 'bytes',
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'parseJson',
          markupType: 'option',
          outputType: 'bytes',
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asArray',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asMap',
            markupType: 'option',
            outputType: ['map', 'bytes'],
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'hash',
            markupType: 'option',
            outputType: 'bytes',
          },
        ],
        outputType: ['map', 'bytes'],
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asMap',
          markupType: 'option',
          outputType: ['map', 'bytes'],
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'entries',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'get',
            markupType: 'option',
            outputType: 'inner',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'keys',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'values',
            markupType: 'option',
            outputType: 'inner',
          },
        ],
        outputType: 'inner',
        scriptId: 0,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument',
              id: 0,
              label: 'key',
              markupType: 'input',
              value: 'bpi',
            },
          ],
          hierarchicalType: 'selectedOperatorOption',
          label: 'get',
          markupType: 'option',
          outputType: 'inner',
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asArray',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asMap',
            markupType: 'option',
            outputType: ['map', 'bytes'],
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'hash',
            markupType: 'option',
            outputType: 'bytes',
          },
        ],
        outputType: ['map', 'bytes'],
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asMap',
          markupType: 'option',
          outputType: ['map', 'bytes'],
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'entries',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'get',
            markupType: 'option',
            outputType: 'inner',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'keys',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'values',
            markupType: 'option',
            outputType: 'inner',
          },
        ],
        outputType: 'inner',
        scriptId: 0,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument',
              id: 0,
              label: 'key',
              markupType: 'input',
              value: 'rate',
            },
          ],
          hierarchicalType: 'selectedOperatorOption',
          label: 'get',
          markupType: 'option',
          outputType: 'inner',
        },
      },
      {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asArray',
            markupType: 'option',
            outputType: 'bytes',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asFloat',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asInteger',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asMap',
            markupType: 'option',
            outputType: ['map', 'bytes'],
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'hash',
            markupType: 'option',
            outputType: 'bytes',
          },
        ],
        outputType: 'float',
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asFloat',
          markupType: 'option',
          outputType: 'float',
        },
      },
    ] as Array<MarkupSelect>

    const markupSource = {
      script: markupScript,
      url: 'url',
    }
    expect(generateMirSources([markupSource, markupSource])).toStrictEqual([expected, expected])
  })

  it('markup2mir should return the correct mir', () => {
    const drMir: Mir = {
      name: 'bitcoin',
      description: 'Request the bitcoin price from coindesk, blockchain.info, bitstamp',
      radRequest: {
        notBefore: 1669852800,
        retrieve: [
          {
            url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
            script: [69, 116, [97, 'bpi'], 116, [97, 'VSD'], 116, [97, 'rate_float'], 114],
          },
        ],
        aggregate: [[87, 3]],
        tally: [[87, 3]],
      },
    }

    const drMarkup: Markup = {
      name: 'bitcoin',
      description: 'Request the bitcoin price from coindesk, blockchain.info, bitstamp',
      radRequest: {
        notBefore: 1669852800,
        retrieve: [
          {
            url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
            script: [
              {
                id: 0,
                scriptId: 0,
                markupType: 'select' as MarkupType.Select,
                hierarchicalType: 'operator' as MarkupHierarchicalType.Operator,
                outputType: 'bytes' as OutputType.Bytes,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
                  label: 'parseJson',
                  markupType: 'option' as MarkupType.Option,
                  outputType: 'bytes' as OutputType.Bytes,
                },
                options: [
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asBytes',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asFloat',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'float' as OutputType.Float,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asInteger',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'integer' as OutputType.Integer,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'length',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'integer' as OutputType.Integer,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'match',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'argument' as OutputType.Argument,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'parseJson',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'parseXml',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'map' as OutputType.Map,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asBoolean',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'boolean' as OutputType.Boolean,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'toLowerCase',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'string' as OutputType.String,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'toUpperCase',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'string' as OutputType.String,
                  },
                ],
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select' as MarkupType.Select,
                hierarchicalType: 'operator' as MarkupHierarchicalType.Operator,
                outputType: ['map', 'bytes'] as [OutputType.Map, OutputType.Bytes],
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
                  label: 'asMap',
                  markupType: 'option' as MarkupType.Option,
                  outputType: ['map', 'bytes'] as [OutputType.Map, OutputType.Bytes],
                },
                options: [
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asArray',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asBoolean',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'boolean' as OutputType.Boolean,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asFloat',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'float' as OutputType.Float,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asInteger',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'float' as OutputType.Float,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asMap',
                    markupType: 'option' as MarkupType.Option,
                    outputType: ['map', 'bytes'] as [OutputType.Map, OutputType.Bytes],
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asString',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'string' as OutputType.String,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'hash',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                ],
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select' as MarkupType.Select,
                hierarchicalType: 'operator' as MarkupHierarchicalType.Operator,
                outputType: 'inner' as OutputType.Integer,
                selected: {
                  arguments: [
                    {
                      hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
                      id: 0,
                      label: 'key',
                      markupType: 'input' as MarkupType.Input,
                      value: 'bpi',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
                  label: 'get',
                  markupType: 'option' as MarkupType.Option,
                  outputType: 'inner' as OutputType.Inner,
                },
                options: [
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'entries',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'get',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'inner' as OutputType.Inner,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'keys',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'string' as OutputType.String,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'values',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'inner' as OutputType.Inner,
                  },
                ],
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select' as MarkupType.Select,
                hierarchicalType: 'operator' as MarkupHierarchicalType.Operator,
                outputType: ['map', 'bytes'] as [OutputType.Map, OutputType.Bytes],
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
                  label: 'asMap',
                  markupType: 'option' as MarkupType.Option,
                  outputType: ['map', 'bytes'] as [OutputType.Map, OutputType.Bytes],
                },
                options: [
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asArray',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asBoolean',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'boolean' as OutputType.Boolean,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asFloat',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'float' as OutputType.Float,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asInteger',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'float' as OutputType.Float,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asMap',
                    markupType: 'option' as MarkupType.Option,
                    outputType: ['map', 'bytes'] as [OutputType.Map, OutputType.Bytes],
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asString',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'string' as OutputType.String,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'hash',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                ],
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select' as MarkupType.Select,
                hierarchicalType: 'operator' as MarkupHierarchicalType.Operator,
                outputType: 'inner' as OutputType.Inner,
                selected: {
                  arguments: [
                    {
                      hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
                      id: 0,
                      label: 'key',
                      markupType: 'input' as MarkupType.Input,
                      value: 'VSD',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
                  label: 'get',
                  markupType: 'option' as MarkupType.Option,
                  outputType: 'inner' as OutputType.Inner,
                },
                options: [
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'entries',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'get',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'inner' as OutputType.Inner,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'keys',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'string' as OutputType.String,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'values',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'inner' as OutputType.Inner,
                  },
                ],
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select' as MarkupType.Select,
                hierarchicalType: 'operator' as MarkupHierarchicalType.Operator,
                outputType: ['map', 'bytes'] as [OutputType.Map, OutputType.Bytes],
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
                  label: 'asMap',
                  markupType: 'option' as MarkupType.Option,
                  outputType: ['map', 'bytes'] as [OutputType.Map, OutputType.Bytes],
                },
                options: [
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asArray',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asBoolean',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'boolean' as OutputType.Boolean,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asFloat',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'float' as OutputType.Float,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asInteger',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'float' as OutputType.Float,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asMap',
                    markupType: 'option' as MarkupType.Option,
                    outputType: ['map', 'bytes'] as [OutputType.Map, OutputType.Bytes],
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asString',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'string' as OutputType.String,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'hash',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                ],
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select' as MarkupType.Select,
                hierarchicalType: 'operator' as MarkupHierarchicalType.Operator,
                outputType: 'inner' as OutputType.Inner,
                selected: {
                  arguments: [
                    {
                      hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
                      id: 0,
                      label: 'key',
                      markupType: 'input' as MarkupType.Input,
                      value: 'rate_float',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
                  label: 'get',
                  markupType: 'option' as MarkupType.Option,
                  outputType: 'inner' as OutputType.Inner,
                },
                options: [
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'entries',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'get',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'inner' as OutputType.Inner,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'keys',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'string' as OutputType.String,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'values',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'inner' as OutputType.Inner,
                  },
                ],
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select' as MarkupType.Select,
                hierarchicalType: 'operator' as MarkupHierarchicalType.Operator,
                outputType: 'float' as OutputType.Float,
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
                  label: 'asFloat',
                  markupType: 'option' as MarkupType.Option,
                  outputType: 'float' as OutputType.Float,
                },
                options: [
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asArray',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asBoolean',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'boolean' as OutputType.Boolean,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asFloat',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'float' as OutputType.Float,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asInteger',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'float' as OutputType.Float,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asMap',
                    markupType: 'option' as MarkupType.Option,
                    outputType: ['map', 'bytes'] as [OutputType.Map, OutputType.Bytes],
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'asString',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'string' as OutputType.String,
                  },
                  {
                    hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                    label: 'hash',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                ],
              },
            ],
          },
        ],
        aggregate: [
          {
            id: 0,
            scriptId: 0,
            markupType: 'select' as MarkupType.Select,
            hierarchicalType: 'operator' as MarkupHierarchicalType.Operator,
            outputType: 'inner' as OutputType.Integer,
            selected: {
              arguments: [
                {
                  hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
                  id: 0,
                  markupType: 'select' as MarkupType.Select,
                  options: [
                    {
                      label: 'min',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'max',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'mode',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'averageMean',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'averageMeanWeighted',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'averageMedian',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'averageMedianWeighted',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'deviationStandard',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'deviationAverage',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'deviationMedian',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'deviationMaximum',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                  ],
                  outputType: 'integer' as OutputType.Integer,
                  scriptId: 0,
                  label: 'function',
                  selected: {
                    arguments: [],
                    label: 'averageMean',
                    hierarchicalType: 'selectedOperatorOption',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes' as OutputType.Bytes,
                  },
                },
              ] as Array<MarkupSelect | MarkupInput>,
              hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
              label: 'reduce',
              markupType: 'option' as MarkupType.Option,
              outputType: 'inner' as OutputType.Inner,
            },
            options: [
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'asBytes',
                markupType: 'option' as MarkupType.Option,
                outputType: 'bytes' as OutputType.Bytes,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'count',
                markupType: 'option' as MarkupType.Option,
                outputType: 'integer' as OutputType.Integer,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'every',
                markupType: 'option' as MarkupType.Option,
                outputType: 'boolean' as OutputType.Boolean,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'filter',
                markupType: 'option' as MarkupType.Option,
                outputType: 'inner' as OutputType.Inner,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'flatten',
                markupType: 'option' as MarkupType.Option,
                outputType: 'passthrough' as OutputType.Passthrough,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'get',
                markupType: 'option' as MarkupType.Option,
                outputType: 'inner' as OutputType.Inner,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'map',
                markupType: 'option' as MarkupType.Option,
                outputType: 'argument' as OutputType.Argument,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'reduce',
                markupType: 'option' as MarkupType.Option,
                outputType: 'inner' as OutputType.Inner,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'some',
                markupType: 'option' as MarkupType.Option,
                outputType: 'boolean' as OutputType.Boolean,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'sort',
                markupType: 'option' as MarkupType.Option,
                outputType: 'inner' as OutputType.Inner,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'take',
                markupType: 'option' as MarkupType.Option,
                outputType: 'inner' as OutputType.Inner,
              },
            ],
          },
        ],
        tally: [
          {
            id: 0,
            scriptId: 0,
            markupType: 'select' as MarkupType.Select,
            hierarchicalType: 'operator' as MarkupHierarchicalType.Operator,
            outputType: 'inner' as OutputType.Inner,
            selected: {
              arguments: [
                {
                  hierarchicalType: 'argument' as MarkupHierarchicalType.Argument,
                  id: 0,
                  markupType: 'select' as MarkupType.Select,
                  options: [
                    {
                      label: 'min',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'max',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'mode',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'averageMean',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'averageMeanWeighted',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'averageMedian',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes' as OutputType.Bytes,
                    },
                    {
                      label: 'averageMedianWeighted',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes',
                    },
                    {
                      label: 'deviationStandard',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes',
                    },
                    {
                      label: 'deviationAverage',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes',
                    },
                    {
                      label: 'deviationMedian',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes',
                    },
                    {
                      label: 'deviationMaximum',
                      hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                      markupType: 'option' as MarkupType.Option,
                      outputType: 'bytes',
                    },
                  ],
                  outputType: 'integer',
                  scriptId: 0,
                  label: 'function',
                  selected: {
                    arguments: [],
                    label: 'averageMean',
                    hierarchicalType: 'selectedOperatorOption',
                    markupType: 'option' as MarkupType.Option,
                    outputType: 'bytes',
                  },
                },
              ] as Array<MarkupSelect | MarkupInput>,
              hierarchicalType: 'selectedOperatorOption' as MarkupHierarchicalType.SelectedOperatorOption,
              label: 'reduce',
              markupType: 'option' as MarkupType.Option,
              outputType: 'inner' as OutputType.Inner,
            },
            options: [
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'asBytes',
                markupType: 'option' as MarkupType.Option,
                outputType: 'bytes' as OutputType.Bytes,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'count',
                markupType: 'option' as MarkupType.Option,
                outputType: 'integer' as OutputType.Integer,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'every',
                markupType: 'option' as MarkupType.Option,
                outputType: 'boolean' as OutputType.Boolean,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'filter',
                markupType: 'option' as MarkupType.Option,
                outputType: 'inner' as OutputType.Inner,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'flatten',
                markupType: 'option' as MarkupType.Option,
                outputType: 'passthrough' as OutputType.Passthrough,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'get',
                markupType: 'option' as MarkupType.Option,
                outputType: 'inner' as OutputType.Inner,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'map',
                markupType: 'option' as MarkupType.Option,
                outputType: 'argument' as OutputType.Argument,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'reduce',
                markupType: 'option' as MarkupType.Option,
                outputType: 'inner' as OutputType.Inner,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'some',
                markupType: 'option' as MarkupType.Option,
                outputType: 'boolean' as OutputType.Boolean,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'sort',
                markupType: 'option' as MarkupType.Option,
                outputType: 'inner' as OutputType.Inner,
              },
              {
                hierarchicalType: 'operatorOption' as MarkupHierarchicalType.OperatorOption,
                label: 'take',
                markupType: 'option' as MarkupType.Option,
                outputType: 'inner' as OutputType.Inner,
              },
            ],
          },
        ],
      },
    }

    expect(markup2mir(drMarkup)).toStrictEqual(drMir)
  })
})
