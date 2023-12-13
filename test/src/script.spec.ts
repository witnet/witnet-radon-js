import { MirScript, OperatorCode, OutputType, Kind } from '../../src/types.js'
import { Script } from '../../src/script.js'
import { Operator } from '../../src/operator.js'
import { DEFAULT_SCRIPT_FIRST_TYPE } from '../../src/constants.js'
import { Cache, markupOptions } from '../../src/structures.js'
import { removeBreakLine } from '../utils.js'
import { I18n } from '../../src/i18n.js'

// TODO: validateScript
describe('Script methods', () => {
  describe('addOperator method', () => {
    it('last type is a Type', () => {
      const mirScript: MirScript = [OperatorCode.StringAsBoolean]
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new Script(context, mirScript, Kind.HttpGet)
      script.addOperator()

      expect(script.operators[script.operators.length - 1].code).toStrictEqual(
        OperatorCode.BooleanToString
      )
    })
    it('last type is a pseudotype', () => {
      const mirScript: MirScript = [OperatorCode.StringAsBoolean, OperatorCode.BooleanToString]
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new Script(context, mirScript, Kind.HttpGet)
      script.addOperator()

      expect(script.operators[script.operators.length - 1].code).toStrictEqual(
        OperatorCode.StringAsBoolean
      )
    })
  })

  describe('deleteOperator method', () => {
    it('deletes operator by id', () => {
      const mirScript: MirScript = [OperatorCode.StringAsBoolean, OperatorCode.BooleanToString]
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new Script(context, mirScript, Kind.HttpGet)
      const firstOperatorId = script.operators[0].id
      script.deleteOperator(firstOperatorId)
      expect(script.operators.length).toStrictEqual(1)
    })
  })

  describe('getLastOperator', () => {
    it('empty', () => {
      const mirScript: MirScript = []
      const context = { cache: new Cache(), i18n: new I18n() }

      const script = new Script(context, mirScript, Kind.HttpGet)

      const result = script.getLastOperator()
      expect(result).toBeNull()
    })

    it('multiple operators', () => {
      const mirScript: MirScript = [
        OperatorCode.StringAsBoolean,
        OperatorCode.BooleanNegate,
        OperatorCode.BooleanToString,
      ]
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new Script(context, mirScript, Kind.HttpGet)
      const result = script.getLastOperator()
      const expectedCode = 32
      const expectedArguments: any = []

      expect((result as Operator).code).toStrictEqual(expectedCode)
      expect((result as Operator).mirArguments).toStrictEqual(expectedArguments)
    })
  })

  describe('getJs', () => {
    it('empty', () => {
      const mirScript: MirScript = []
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new Script(context, mirScript, Kind.HttpGet)

      const result = script.getJs()
      expect(result).toStrictEqual('')
    })

    it('one operator', () => {
      const context = { cache: new Cache(), i18n: new I18n() }

      const mirScript: MirScript = [OperatorCode.StringAsBoolean]

      const script = new Script(context, mirScript, Kind.HttpGet)
      const result = script.getJs()
      const expected = '.asBoolean()'

      expect(result).toStrictEqual(expected)
    })

    it('multiple operators', () => {
      const context = { cache: new Cache(), i18n: new I18n() }

      const mirScript: MirScript = [
        OperatorCode.StringAsBoolean,
        OperatorCode.BooleanNegate,
        OperatorCode.BooleanToString,
      ]

      const script = new Script(context, mirScript, Kind.HttpGet)
      const result = removeBreakLine(script.getJs())
      const expected: any = removeBreakLine(`.asBoolean().negate().asString()`)

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMarkup', () => {
    it('empty', () => {
      const mirScript: MirScript = []
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new Script(context, mirScript, Kind.HttpGet)

      const result = script.getMarkup()
      expect(result).toStrictEqual([])
    })

    it('one operator', () => {
      const context = { cache: new Cache(), i18n: new I18n() }

      const mirScript: MirScript = [OperatorCode.StringAsBoolean]

      const script = new Script(context, mirScript, Kind.HttpGet)
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
      const context = { cache: new Cache(), i18n: new I18n() }

      const mirScript: MirScript = [
        OperatorCode.StringAsBoolean,
        OperatorCode.BooleanNegate,
        OperatorCode.BooleanToString,
      ]

      const script = new Script(context, mirScript, Kind.HttpGet)
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
          label: 'asString',
          markupType: 'select',
          options: markupOptions.boolean,
          outputType: 'string',
          selected: {
            description: 'Cast the Boolean input into String',
            arguments: [],
            hierarchicalType: 'selectedOperatorOption',
            label: 'asString',
            markupType: 'option',
            outputType: 'string',
          },
        },
      ]

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMir', () => {
    it('empty', () => {
      const mirScript: MirScript = []
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new Script(context, mirScript, Kind.HttpGet)

      const result = script.getMir()
      expect(result).toStrictEqual([])
    })

    it('one operator', () => {
      const context = { cache: new Cache(), i18n: new I18n() }

      const mirScript: MirScript = [OperatorCode.StringAsBoolean]

      const script = new Script(context, mirScript, Kind.HttpGet)
      const result = script.getMir()
      const expected = mirScript

      expect(result).toStrictEqual(expected)
    })

    it('multiple operators', () => {
      const context = { cache: new Cache(), i18n: new I18n() }

      const mirScript: MirScript = [
        OperatorCode.StringAsBoolean,
        OperatorCode.BooleanNegate,
        OperatorCode.BooleanToString,
      ]

      const script = new Script(context, mirScript, Kind.HttpGet)
      const result = script.getMir()
      const expected: any = mirScript

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getOutputType', () => {
    it('default output type when is empty', () => {
      const mirScript: MirScript = []
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new Script(context, mirScript, Kind.HttpGet)
      const result = script.getOutputType()

      expect(result).toBe(DEFAULT_SCRIPT_FIRST_TYPE)
    })

    it('returns last output type', () => {
      const mirScript: MirScript = [OperatorCode.StringLength, OperatorCode.IntegerAbsolute]
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new Script(context, mirScript, Kind.HttpGet)
      const result = script.getOutputType()

      expect(result).toBe(OutputType.Integer)
    })
  })

  it('push method', () => {
    const mirScript: MirScript = [OperatorCode.StringAsBoolean, OperatorCode.BooleanNegate]

    const context = { cache: new Cache(), i18n: new I18n() }

    const script = new Script(context, mirScript, Kind.HttpGet)

    script.push(OperatorCode.BooleanToString)
    const expectedCode = 32
    const expectedArguments: any = []

    expect(script.operators[script.operators.length - 1].code).toStrictEqual(expectedCode)
    expect(script.operators[script.operators.length - 1].mirArguments).toStrictEqual(
      expectedArguments
    )
  })
})
