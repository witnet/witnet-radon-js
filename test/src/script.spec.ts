import { MirScript, OperatorCode, OutputType } from '../../src/types'
import { Script } from '../../src/script'
import { Operator } from '../../src/operator'
import { DEFAULT_SCRIPT_FIRST_TYPE, DEFAULT_OPERATOR } from '../../src/constants'
import { Cache, markupOptions } from '../../src/structures'

// TODO: validateScript
describe('Script methods', () => {
  describe('addOperator method', () => {
    it('last type is a Type', () => {
      const mirScript: MirScript = [OperatorCode.StringAsBoolean]
      const cache = new Cache()
      const script = new Script(cache, mirScript)
      script.addOperator()

      expect(script.operators[script.operators.length - 1].code).toStrictEqual(
        OperatorCode.BooleanMatch
      )
    })
    it('last type is a pseudotype', () => {
      const mirScript: MirScript = [OperatorCode.StringAsBoolean, OperatorCode.BooleanMatch]
      const cache = new Cache()
      const script = new Script(cache, mirScript)
      script.addOperator()

      expect(script.operators[script.operators.length - 1].code).toStrictEqual(DEFAULT_OPERATOR)
    })
  })

  describe('deleteOperator method', () => {
    it('deletes operator by id', () => {
      const mirScript: MirScript = [OperatorCode.StringAsBoolean, OperatorCode.BooleanMatch]
      const cache = new Cache()
      const script = new Script(cache, mirScript)
      const firstOperatorId = script.operators[0].id
      script.deleteOperator(firstOperatorId)
      expect(script.operators.length).toStrictEqual(1)
    })
  })

  describe('getLastOperator', () => {
    it('empty', () => {
      const mirScript: MirScript = []
      const cache = new Cache()

      const script = new Script(cache, mirScript)

      const result = script.getLastOperator()
      expect(result).toBeNull()
    })

    it('multiple operators', () => {
      const mirScript: MirScript = [
        OperatorCode.StringAsBoolean,
        OperatorCode.BooleanNegate,
        [OperatorCode.BooleanMatch, '', true],
      ]
      const cache = new Cache()
      const script = new Script(cache, mirScript)
      const result = script.getLastOperator()
      const expectedCode = 32
      const expectedArguments: any = ['', true]

      expect((result as Operator).code).toStrictEqual(expectedCode)
      expect((result as Operator).mirArguments).toStrictEqual(expectedArguments)
    })
  })

  describe('getMarkup', () => {
    it('empty', () => {
      const mirScript: MirScript = []
      const cache = new Cache()
      const script = new Script(cache, mirScript)

      const result = script.getMarkup()
      expect(result).toStrictEqual([])
    })

    it('one operator', () => {
      const cache = new Cache()

      const mirScript: MirScript = [OperatorCode.StringAsBoolean]

      const script = new Script(cache, mirScript)
      const result = script.getMarkup()
      const expected = [
        {
          hierarchicalType: 'operator',
          id: 2,
          scriptId: 1,
          label: 'asBoolean',
          markupType: 'select',
          options: markupOptions.string,
          outputType: 'boolean',
          selected: {
            description: 'Cast the String input into Boolean',
            arguments: [],
            hierarchicalType: 'selectedOperatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
        },
      ]

      expect(result).toStrictEqual(expected)
    })

    it('multiple operators', () => {
      const cache = new Cache()

      const mirScript: MirScript = [
        OperatorCode.StringAsBoolean,
        OperatorCode.BooleanNegate,
        OperatorCode.BooleanMatch,
      ]

      const script = new Script(cache, mirScript)
      const result = script.getMarkup()
      const expected: any = [
        {
          hierarchicalType: 'operator',
          id: 2,
          scriptId: 1,
          label: 'asBoolean',
          markupType: 'select',
          options: markupOptions.string,
          outputType: 'boolean',
          selected: {
            description: 'Cast the String input into Boolean',
            arguments: [],
            hierarchicalType: 'selectedOperatorOption',
            label: 'asBoolean',
            markupType: 'option',
            outputType: 'boolean',
          },
        },
        {
          hierarchicalType: 'operator',
          id: 3,
          scriptId: 1,
          label: 'negate',
          markupType: 'select',
          options: markupOptions.boolean,
          outputType: 'boolean',
          selected: {
            arguments: [],
            hierarchicalType: 'selectedOperatorOption',
            label: 'negate',
            description:
              'Negate the input Boolean (make it True if it was False, or make it False if it was True)',
            markupType: 'option',
            outputType: 'boolean',
          },
        },
        {
          hierarchicalType: 'operator',
          id: 4,
          scriptId: 1,
          label: 'match',
          markupType: 'select',
          options: markupOptions.boolean,
          outputType: 'matchOutput',
          selected: {
            description:
              'Match the Boolean input with "subscript" and return the value asociated with it. Similar than a switch statement',
            arguments: [],
            hierarchicalType: 'selectedOperatorOption',
            label: 'match',
            markupType: 'option',
            outputType: 'matchOutput',
          },
        },
      ]

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMir', () => {
    it('empty', () => {
      const mirScript: MirScript = []
      const cache = new Cache()
      const script = new Script(cache, mirScript)

      const result = script.getMir()
      expect(result).toStrictEqual([])
    })

    it('one operator', () => {
      const cache = new Cache()

      const mirScript: MirScript = [OperatorCode.StringAsBoolean]

      const script = new Script(cache, mirScript)
      const result = script.getMir()
      const expected = mirScript

      expect(result).toStrictEqual(expected)
    })

    it('multiple operators', () => {
      const cache = new Cache()

      const mirScript: MirScript = [
        OperatorCode.StringAsBoolean,
        OperatorCode.BooleanNegate,
        [OperatorCode.BooleanMatch, ''],
      ]

      const script = new Script(cache, mirScript)
      const result = script.getMir()
      const expected: any = mirScript

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getOutputType', () => {
    it('default output type when is empty', () => {
      const mirScript: MirScript = []
      const cache = new Cache()
      const script = new Script(cache, mirScript)
      const result = script.getOutputType()

      expect(result).toBe(DEFAULT_SCRIPT_FIRST_TYPE)
    })

    it('returns last output type', () => {
      const mirScript: MirScript = [OperatorCode.StringLength, OperatorCode.IntegerAbsolute]
      const cache = new Cache()
      const script = new Script(cache, mirScript)
      const result = script.getOutputType()

      expect(result).toBe(OutputType.Integer)
    })
  })

  it('push method', () => {
    const mirScript: MirScript = [OperatorCode.StringAsBoolean, OperatorCode.BooleanNegate]

    const cache = new Cache()

    const script = new Script(cache, mirScript)

    script.push([OperatorCode.BooleanMatch, '', true])
    const expectedCode = 32
    const expectedArguments: any = ['', true]

    expect(script.operators[script.operators.length - 1].code).toStrictEqual(expectedCode)
    expect(script.operators[script.operators.length - 1].mirArguments).toStrictEqual(
      expectedArguments
    )
  })
})
