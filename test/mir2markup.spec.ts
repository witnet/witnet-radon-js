import {
  mir2markup,
  getMirOperatorInfo,
  findOutputType,
  generateSelectedReducerArgument,
  generateReducerArgumentOptions,
  generateOperatorArguments,
  generateFilterArgumentOptions,
  generateSelectedOption,
  generateMarkupOptions,
  generateMarkupOperator,
  generateMarkupScript,
} from '../src/mir2markup'
import { Reducer, Filter, Mir } from '../src/types'
import { operatorInfos } from '../src/structures'
import { getEnumNames } from '../src/utils'

const REDUCERS = getEnumNames(Reducer)
const FILTERS = getEnumNames(Filter)

describe('mir2markup', () => {
  it('getMirOperatorInfo return the correct information', () => {
    expect(getMirOperatorInfo(0x10)).toStrictEqual({ code: 16, args: null })
    expect(getMirOperatorInfo([0x61, 'bpi'])).toStrictEqual({ code: 97, args: ['bpi'] })
  })

  it('findOutputType returns the correct output type', () => {
    expect(findOutputType(0x10)).toBe('argument')
    expect(findOutputType(0x20)).toBe('integer')
    expect(findOutputType(0x30)).toBe('integer')
    expect(findOutputType(0x40)).toBe('bytes')
    expect(findOutputType(0x50)).toBe('bytes')
    expect(findOutputType(0x60)).toBe('bytes')
    expect(findOutputType(0x70)).toBe('bytes')
    expect(findOutputType(0x74)).toStrictEqual(['map', 'bytes'])
    expect(findOutputType(0x80)).toBe('inner')
  })

  it('generateSelectedReducerArgument returns the correct markup', () => {
    expect(generateSelectedReducerArgument(0x00)).toStrictEqual({
      arguments: [],
      label: 'min',
      hierarchicalType: 'selectedOperatorOption',
      markupType: 'option',
      outputType: 'bytes',
    })

    expect(generateSelectedReducerArgument(0x0a)).toStrictEqual({
      arguments: [],
      label: 'deviationMaximum',
      hierarchicalType: 'selectedOperatorOption',
      markupType: 'option',
      outputType: 'bytes',
    })
  })

  it('generateReducerArgumentOptions return the correct markup', () => {
    const result = REDUCERS.map(reducer => ({
      hierarchicalType: 'operatorOption',
      label: reducer,
      markupType: 'option',
      outputType: 'bytes',
    }))
    expect(generateReducerArgumentOptions()).toStrictEqual(result)
  })

  it('generateFilterArgumentOptions return the correct markup', () => {
    const result = FILTERS.map(filter => ({
      hierarchicalType: 'operatorOption',
      label: filter,
      markupType: 'option',
      outputType: 'bytes',
    }))
    expect(generateFilterArgumentOptions()).toStrictEqual(result)
  })

  describe('expect generateOperatorArguments returns the correct markup for each argument type', () => {
    it('string', () => {
      const operatorArguments = generateOperatorArguments(operatorInfos[97], ['bpi'])
      const result = [
        {
          hierarchicalType: 'argument',
          id: 0,
          type: 12,
          label: 'key',
          markupType: 'input',
          value: 'bpi',
        },
      ]
      expect(operatorArguments).toStrictEqual(result)
    })

    it('integer', () => {
      const operatorArguments = generateOperatorArguments(operatorInfos[0x23], [10])
      const result = [
        {
          hierarchicalType: 'argument',
          id: 0,
          label: 'base',
          type: 6,
          markupType: 'input',
          value: 10,
        },
      ]
      expect(operatorArguments).toStrictEqual(result)
    })

    it('float', () => {
      const operatorArguments = generateOperatorArguments(operatorInfos[0x32], [1.1])
      const result = [
        {
          hierarchicalType: 'argument',
          id: 0,
          label: 'decimals',
          type: 4,
          markupType: 'input',
          value: 1.1,
        },
      ]
      expect(operatorArguments).toStrictEqual(result)
    })

    it('filter', () => {
      const operatorArguments = generateOperatorArguments(operatorInfos[0x52], [[0x00, 5]])
      const options = FILTERS.map(filter => ({
        hierarchicalType: 'operatorOption',
        label: filter,
        markupType: 'option',
        outputType: 'bytes',
      }))
      const result = [
        {
          hierarchicalType: 'argument',
          id: 0,
          scriptId: 0,
          label: 'function',
          markupType: 'select',
          options: options,
          selected: {
            arguments: [
              {
                hierarchicalType: 'argument',
                id: 0,
                label: 'by',
                markupType: 'input',
                value: 5,
              },
            ],
            hierarchicalType: 'selectedOperatorOption',
            label: 'greaterThan',
            markupType: 'option',
            outputType: 'bytes',
          },
        },
      ]
      expect(operatorArguments).toStrictEqual(result)
    })
    it('reducer', () => {
      const operatorArguments = generateOperatorArguments(operatorInfos[0x57], [0x00])
      const options = REDUCERS.map(reducer => ({
        hierarchicalType: 'operatorOption',
        label: reducer,
        markupType: 'option',
        outputType: 'bytes',
      }))
      const result = [
        {
          hierarchicalType: 'argument',
          id: 0,
          scriptId: 0,
          label: 'function',
          markupType: 'select',
          options: options,
          outputType: 'integer',
          selected: {
            arguments: [],
            hierarchicalType: 'selectedOperatorOption',
            label: 'min',
            markupType: 'option',
            outputType: 'bytes',
          },
        },
      ]
      expect(operatorArguments).toStrictEqual(result)
    })

    it('multiple', () => {
      const operatorArguments = generateOperatorArguments(operatorInfos[0x10], ['a', 'b'])
      const result = [
        {
          hierarchicalType: 'argument',
          id: 0,
          label: 'categories',
          type: 7,
          markupType: 'input',
          value: 'a',
        },
        {
          hierarchicalType: 'argument',
          id: 0,
          label: 'default',
          markupType: 'input',
          type: 5,
          value: 'b',
        },
      ]
      expect(operatorArguments).toStrictEqual(result)
    })
  })

  it('expect generateSelectedOption without arguments returns the correct markup', () => {
    const selectedOption = generateSelectedOption(operatorInfos[0x11], 0x11, [])
    expect(selectedOption).toStrictEqual({
      arguments: [],
      hierarchicalType: 'selectedOperatorOption',
      label: 'negate',
      markupType: 'option',
      outputType: 'boolean',
    })
  })

  it('expect generateSelectedOption with arguments with simple type returns the correct markup', () => {
    const selectedOption = generateSelectedOption(operatorInfos[0x24], 0x24, [1])
    expect(selectedOption).toStrictEqual({
      arguments: [
        {
          hierarchicalType: 'argument',
          id: 0,
          label: 'value',
          markupType: 'input',
          value: 1,
          type: 6,
        },
      ],
      hierarchicalType: 'selectedOperatorOption',
      label: 'greaterThan',
      markupType: 'option',
      outputType: 'boolean',
    })
  })

  it('expect generateSelectedOption with arguments with pseudotypes returns the correct markup', () => {
    const selectedOption = generateSelectedOption(operatorInfos[0x10], 0x10, ['aaa', 'bbb'])
    expect(selectedOption).toStrictEqual({
      arguments: [
        {
          hierarchicalType: 'argument',
          id: 0,
          label: 'categories',
          type: 7,
          markupType: 'input',
          value: 'aaa',
        },
        {
          hierarchicalType: 'argument',
          id: 0,
          label: 'default',
          markupType: 'input',
          type: 5,
          value: 'bbb',
        },
      ],
      hierarchicalType: 'selectedOperatorOption',
      label: 'match',
      markupType: 'option',
      outputType: 'argument',
    })
  })

  describe('expect generateMarkupOptions returns the correct markup options by each type', () => {
    it('boolean', () => {
      const markupOptions = generateMarkupOptions(operatorInfos[0x10], 0x10, [])
      const expected = [
        {
          hierarchicalType: 'operatorOption',
          label: 'asString',
          markupType: 'option',
          outputType: 'string',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'match',
          markupType: 'option',
          outputType: 'argument',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'negate',
          markupType: 'option',
          outputType: 'boolean',
        },
      ]
      expect(markupOptions).toStrictEqual(expected)
    })

    it('integer', () => {
      const markupOptions = generateMarkupOptions(operatorInfos[0x20], 0x20, [])
      const expected = [
        {
          hierarchicalType: 'operatorOption',
          label: 'absolute',
          markupType: 'option',
          outputType: 'integer',
        },
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
          label: 'asString',
          markupType: 'option',
          outputType: 'string',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'greaterThan',
          markupType: 'option',
          outputType: 'boolean',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'lessThan',
          markupType: 'option',
          outputType: 'boolean',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'match',
          markupType: 'option',
          outputType: 'argument',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'modulo',
          markupType: 'option',
          outputType: 'integer',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'multiply',
          markupType: 'option',
          outputType: 'integer',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'negate',
          markupType: 'option',
          outputType: 'integer',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'power',
          markupType: 'option',
          outputType: 'integer',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'reciprocal',
          markupType: 'option',
          outputType: 'float',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'sum',
          markupType: 'option',
          outputType: 'integer',
        },
      ]
      expect(markupOptions).toStrictEqual(expected)
    })

    it('float', () => {
      const markupOptions = generateMarkupOptions(operatorInfos[0x30], 0x30, [])
      const expected = [
        {
          hierarchicalType: 'operatorOption',
          label: 'absolute',
          markupType: 'option',
          outputType: 'integer',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'asBytes',
          markupType: 'option',
          outputType: 'bytes',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'asString',
          markupType: 'option',
          outputType: 'string',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'ceiling',
          markupType: 'option',
          outputType: 'integer',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'greaterThan',
          markupType: 'option',
          outputType: 'boolean',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'floor',
          markupType: 'option',
          outputType: 'integer',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'lessThan',
          markupType: 'option',
          outputType: 'boolean',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'modulo',
          markupType: 'option',
          outputType: 'float',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'multiply',
          markupType: 'option',
          outputType: 'float',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'negate',
          markupType: 'option',
          outputType: 'float',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'power',
          markupType: 'option',
          outputType: 'float',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'reciprocal',
          markupType: 'option',
          outputType: 'float',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'round',
          markupType: 'option',
          outputType: 'integer',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'sum',
          markupType: 'option',
          outputType: 'float',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'truncate',
          markupType: 'option',
          outputType: 'integer',
        },
      ]
      expect(markupOptions).toStrictEqual(expected)
    })

    it('string', () => {
      const markupOptions = generateMarkupOptions(operatorInfos[0x40], 0x40, [])
      const expected = [
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
      ]
      expect(markupOptions).toStrictEqual(expected)
    })

    it('array', () => {
      const markupOptions = generateMarkupOptions(operatorInfos[0x50], 0x50, [])
      const expected = [
        {
          hierarchicalType: 'operatorOption',
          label: 'asBytes',
          markupType: 'option',
          outputType: 'bytes',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'count',
          markupType: 'option',
          outputType: 'integer',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'every',
          markupType: 'option',
          outputType: 'boolean',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'filter',
          markupType: 'option',
          outputType: 'inner',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'flatten',
          markupType: 'option',
          outputType: 'passthrough',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'get',
          markupType: 'option',
          outputType: 'inner',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'map',
          markupType: 'option',
          outputType: 'argument',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'reduce',
          markupType: 'option',
          outputType: 'inner',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'some',
          markupType: 'option',
          outputType: 'boolean',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'sort',
          markupType: 'option',
          outputType: 'inner',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'take',
          markupType: 'option',
          outputType: 'inner',
        },
      ]
      expect(markupOptions).toStrictEqual(expected)
    })

    it('map', () => {
      const markupOptions = generateMarkupOptions(operatorInfos[0x60], 0x60, [])
      const expected = [
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
      ]
      expect(markupOptions).toStrictEqual(expected)
    })

    it('bytes', () => {
      const markupOptions = generateMarkupOptions(operatorInfos[0x70], 0x70, [])
      const expected = [
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
      ]
      expect(markupOptions).toStrictEqual(expected)
    })

    it('result', () => {
      const markupOptions = generateMarkupOptions(operatorInfos[0x80], 0x80, [])
      const expected = [
        {
          hierarchicalType: 'operatorOption',
          label: 'get',
          markupType: 'option',
          outputType: 'inner',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'getOr',
          markupType: 'option',
          outputType: 'inner',
        },
        {
          hierarchicalType: 'operatorOption',
          label: 'isOk',
          markupType: 'option',
          outputType: 'boolean',
        },
      ]
      expect(markupOptions).toStrictEqual(expected)
    })
  })

  describe('expect generateMarkupOperator returns the correct markup operator', () => {
    it('without arguments', () => {
      const markupOperator = generateMarkupOperator(0x11)
      const expected = {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'match',
            markupType: 'option',
            outputType: 'argument',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'negate',
            markupType: 'option',
            outputType: 'boolean',
          },
        ],
        outputType: 'boolean',
        scriptId: 0,
        selected: {
          arguments: [],
          hierarchicalType: 'selectedOperatorOption',
          label: 'negate',
          markupType: 'option',
          outputType: 'boolean',
        },
      }
      expect(markupOperator).toStrictEqual(expected)
    })

    it('with 1 argument', () => {
      const markupOperator = generateMarkupOperator([0x23, 10])
      const expected = {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'absolute',
            markupType: 'option',
            outputType: 'integer',
          },
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
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'greaterThan',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'lessThan',
            markupType: 'option',
            outputType: 'boolean',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'match',
            markupType: 'option',
            outputType: 'argument',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'modulo',
            markupType: 'option',
            outputType: 'integer',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'multiply',
            markupType: 'option',
            outputType: 'integer',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'negate',
            markupType: 'option',
            outputType: 'integer',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'power',
            markupType: 'option',
            outputType: 'integer',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'reciprocal',
            markupType: 'option',
            outputType: 'float',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'sum',
            markupType: 'option',
            outputType: 'integer',
          },
        ],
        outputType: 'string',
        scriptId: 0,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument',
              id: 0,
              type: 6,
              label: 'base',
              markupType: 'input',
              value: 10,
            },
          ],
          hierarchicalType: 'selectedOperatorOption',
          label: 'asString',
          markupType: 'option',
          outputType: 'string',
        },
      }
      expect(markupOperator).toStrictEqual(expected)
    })

    it('with 2 argument', () => {
      const markupOperator = generateMarkupOperator([0x10, 'a', 'b'])
      const expected = {
        hierarchicalType: 'operator',
        id: 0,
        markupType: 'select',
        options: [
          {
            hierarchicalType: 'operatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'match',
            markupType: 'option',
            outputType: 'argument',
          },
          {
            hierarchicalType: 'operatorOption',
            label: 'negate',
            markupType: 'option',
            outputType: 'boolean',
          },
        ],
        outputType: 'argument',
        scriptId: 0,
        selected: {
          arguments: [
            {
              hierarchicalType: 'argument',
              id: 0,
              label: 'categories',
              type: 7,
              markupType: 'input',
              value: 'a',
            },
            {
              hierarchicalType: 'argument',
              id: 0,
              label: 'default',
              type: 5,
              markupType: 'input',
              value: 'b',
            },
          ],
          hierarchicalType: 'selectedOperatorOption',
          label: 'match',
          markupType: 'option',
          outputType: 'argument',
        },
      }
      expect(markupOperator).toStrictEqual(expected)
    })
  })

  it('expect generateMarkupScript returns the correct markup', () => {
    const markupScript = generateMarkupScript(
      [69, 116, [97, 'bpi'], 116, [97, 'rate_float'], 114],
      {}
    )
    const expected = {
      cache: {},
      script: [
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
                type: 12,
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
                type: 12,
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
      ],
    }
    expect(markupScript).toStrictEqual(expected)
  })

  it('expect mir2markup returns the correct markup', () => {
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

    const result = {
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
                markupType: 'select',
                hierarchicalType: 'operator',
                outputType: 'bytes',
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'parseJson',
                  markupType: 'option',
                  outputType: 'bytes',
                },
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
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select',
                hierarchicalType: 'operator',
                outputType: ['map', 'bytes'],
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'asMap',
                  markupType: 'option',
                  outputType: ['map', 'bytes'],
                },
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
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select',
                hierarchicalType: 'operator',
                outputType: 'inner',
                selected: {
                  arguments: [
                    {
                      hierarchicalType: 'argument',
                      id: 0,
                      label: 'key',
                      type: 12,
                      markupType: 'input',
                      value: 'bpi',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'get',
                  markupType: 'option',
                  outputType: 'inner',
                },
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
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select',
                hierarchicalType: 'operator',
                outputType: ['map', 'bytes'],
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'asMap',
                  markupType: 'option',
                  outputType: ['map', 'bytes'],
                },
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
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select',
                hierarchicalType: 'operator',
                outputType: 'inner',
                selected: {
                  arguments: [
                    {
                      hierarchicalType: 'argument',
                      id: 0,
                      label: 'key',
                      type: 12,
                      markupType: 'input',
                      value: 'VSD',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'get',
                  markupType: 'option',
                  outputType: 'inner',
                },
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
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select',
                hierarchicalType: 'operator',
                outputType: ['map', 'bytes'],
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'asMap',
                  markupType: 'option',
                  outputType: ['map', 'bytes'],
                },
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
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select',
                hierarchicalType: 'operator',
                outputType: 'inner',
                selected: {
                  arguments: [
                    {
                      hierarchicalType: 'argument',
                      id: 0,
                      label: 'key',
                      type: 12,
                      markupType: 'input',
                      value: 'rate_float',
                    },
                  ],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'get',
                  markupType: 'option',
                  outputType: 'inner',
                },
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
              },
              {
                id: 0,
                scriptId: 0,
                markupType: 'select',
                hierarchicalType: 'operator',
                outputType: 'float',
                selected: {
                  arguments: [],
                  hierarchicalType: 'selectedOperatorOption',
                  label: 'asFloat',
                  markupType: 'option',
                  outputType: 'float',
                },
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
              },
            ],
          },
        ],
        aggregate: [
          {
            id: 0,
            scriptId: 0,
            markupType: 'select',
            hierarchicalType: 'operator',
            outputType: 'inner',
            selected: {
              arguments: [
                {
                  hierarchicalType: 'argument',
                  id: 0,
                  markupType: 'select',
                  options: [
                    {
                      label: 'min',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'max',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'mode',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'averageMean',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'averageMeanWeighted',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'averageMedian',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'averageMedianWeighted',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'deviationStandard',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'deviationAverage',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'deviationMedian',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'deviationMaximum',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
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
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                },
              ],
              hierarchicalType: 'selectedOperatorOption',
              label: 'reduce',
              markupType: 'option',
              outputType: 'inner',
            },
            options: [
              {
                hierarchicalType: 'operatorOption',
                label: 'asBytes',
                markupType: 'option',
                outputType: 'bytes',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'count',
                markupType: 'option',
                outputType: 'integer',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'every',
                markupType: 'option',
                outputType: 'boolean',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'filter',
                markupType: 'option',
                outputType: 'inner',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'flatten',
                markupType: 'option',
                outputType: 'passthrough',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'get',
                markupType: 'option',
                outputType: 'inner',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'map',
                markupType: 'option',
                outputType: 'argument',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'reduce',
                markupType: 'option',
                outputType: 'inner',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'some',
                markupType: 'option',
                outputType: 'boolean',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'sort',
                markupType: 'option',
                outputType: 'inner',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'take',
                markupType: 'option',
                outputType: 'inner',
              },
            ],
          },
        ],
        tally: [
          {
            id: 0,
            scriptId: 0,
            markupType: 'select',
            hierarchicalType: 'operator',
            outputType: 'inner',
            selected: {
              arguments: [
                {
                  hierarchicalType: 'argument',
                  id: 0,
                  markupType: 'select',
                  options: [
                    {
                      label: 'min',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'max',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'mode',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'averageMean',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'averageMeanWeighted',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'averageMedian',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'averageMedianWeighted',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'deviationStandard',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'deviationAverage',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'deviationMedian',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
                      outputType: 'bytes',
                    },
                    {
                      label: 'deviationMaximum',
                      hierarchicalType: 'operatorOption',
                      markupType: 'option',
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
                    markupType: 'option',
                    outputType: 'bytes',
                  },
                },
              ],
              hierarchicalType: 'selectedOperatorOption',
              label: 'reduce',
              markupType: 'option',
              outputType: 'inner',
            },
            options: [
              {
                hierarchicalType: 'operatorOption',
                label: 'asBytes',
                markupType: 'option',
                outputType: 'bytes',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'count',
                markupType: 'option',
                outputType: 'integer',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'every',
                markupType: 'option',
                outputType: 'boolean',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'filter',
                markupType: 'option',
                outputType: 'inner',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'flatten',
                markupType: 'option',
                outputType: 'passthrough',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'get',
                markupType: 'option',
                outputType: 'inner',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'map',
                markupType: 'option',
                outputType: 'argument',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'reduce',
                markupType: 'option',
                outputType: 'inner',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'some',
                markupType: 'option',
                outputType: 'boolean',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'sort',
                markupType: 'option',
                outputType: 'inner',
              },
              {
                hierarchicalType: 'operatorOption',
                label: 'take',
                markupType: 'option',
                outputType: 'inner',
              },
            ],
          },
        ],
      },
    }
    const expected = mir2markup(drMir)

    expect(result).toStrictEqual(expected)
  })
})
