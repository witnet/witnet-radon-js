import { MirScript, OperatorCode, Kind } from '../../src/types'
import { Source } from '../../src/source'
import { Cache, markupOptions } from '../../src/structures'
import { formatJsTest } from '../utils'
import { I18n } from '../../src/i18n'
import { KIND_OPTIONS, CONTENT_TYPE_OPTIONS } from '../../src/constants'

const onChildrenEvent = () => {
  return {
    emit: (e: Event) => {
      return e
    },
  }
}

describe('Source', () => {
  describe('getJs method', () => {
    it('empty', () => {
      const mirScript: MirScript = []
      const context = { cache: new Cache(), i18n: new I18n() }

      const source = new Source(context, {
        kind: Kind.HttpGet,
        kindOptions: KIND_OPTIONS,
        url: 'url',
        script: mirScript,
        contentType: 'JSON API',
        contentTypeOptions: CONTENT_TYPE_OPTIONS,
      }, Kind.HttpGet, onChildrenEvent())

      const result = formatJsTest(source.getJs(0))
      const expected = formatJsTest('const source_0 = new Witnet.Source("url")')
      expect(result).toStrictEqual(expected)
    })

    it('multiple operators', () => {
      const context = { cache: new Cache(), i18n: new I18n() }

      const mirScript: MirScript = [
        OperatorCode.StringAsBoolean,
        OperatorCode.BooleanNegate,
        OperatorCode.BooleanAsString,
      ]

      const mirSource = {
        kind: Kind.HttpGet,
        kindOptions: KIND_OPTIONS,
        url: 'url',
        contentType: 'JSON API',
        contentTypeOptions: CONTENT_TYPE_OPTIONS,
        script: mirScript,
      }

      const result = formatJsTest(new Source(context, mirSource, Kind.HttpGet, onChildrenEvent()).getJs(0))

      const expected = 'const source_0 = new Witnet.Source("url").asBoolean().negate().asString()'

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMarkup method', () => {
    it('empty', () => {
      const mirScript: MirScript = []
      const context = { cache: new Cache(), i18n: new I18n() }

      const source = new Source(context, {
        kind: Kind.HttpGet,
        kindOptions: KIND_OPTIONS,
        url: 'url',
        script: mirScript,
        contentType: 'JSON API',
        contentTypeOptions: CONTENT_TYPE_OPTIONS,
      }, Kind.HttpGet, onChildrenEvent())

      const result = source.getMarkup()
      const expected = {
        kind: Kind.HttpGet,
        kindOptions: KIND_OPTIONS,
        url: 'url',
        contentType: 'JSON API',
        contentTypeOptions: CONTENT_TYPE_OPTIONS,
        script: [],
        scriptId: 2,
      }
      expect(result).toStrictEqual(expected)
    })

    it('multiple operators', () => {
      const context = { cache: new Cache(), i18n: new I18n() }

      const mirScript: MirScript = [
        OperatorCode.StringAsBoolean,
        OperatorCode.BooleanNegate,
        OperatorCode.BooleanAsString,
      ]

      const mirSource = {
        kind: Kind.HttpGet,
        kindOptions: KIND_OPTIONS,
        url: 'url',
        contentType: 'JSON API',
        contentTypeOptions: CONTENT_TYPE_OPTIONS,
        script: mirScript,
      }

      const result = new Source(context, mirSource, Kind.HttpGet, onChildrenEvent()).getMarkup()

      const expected: any = {
        kind: Kind.HttpGet,
        kindOptions: KIND_OPTIONS,
        contentType: 'JSON API',
        contentTypeOptions: CONTENT_TYPE_OPTIONS,
        scriptId: 2,
        script: [
          {
            hierarchicalType: 'operator',
            id: 3,
            scriptId: 2,
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
            id: 4,
            scriptId: 2,
            label: 'negate',
            markupType: 'select',
            options: markupOptions.boolean,
            outputType: 'boolean',
            selected: {
              description:
                'Negate the input Boolean (make it True if it was False, or make it False if it was True)',
              arguments: [],
              hierarchicalType: 'selectedOperatorOption',
              label: 'negate',
              markupType: 'option',
              outputType: 'boolean',
            },
          },
          {
            hierarchicalType: 'operator',
            id: 5,
            scriptId: 2,
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
        ],
        url: 'url',
      }

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMir method', () => {
    it('empty', () => {
      const mirScript: MirScript = []
      const context = { cache: new Cache(), i18n: new I18n() }

      const source = new Source(context, {
        kind: Kind.HttpGet,
        kindOptions: KIND_OPTIONS,
        url: 'url',
        script: mirScript,
        contentType: 'JSON API',
        contentTypeOptions: CONTENT_TYPE_OPTIONS,
      }, Kind.HttpGet, onChildrenEvent())

      const result = source.getMir()
      const expected = { kind: Kind.HttpGet, kindOptions: KIND_OPTIONS, url: 'url', script: [], contentType: 'JSON API', contentTypeOptions: CONTENT_TYPE_OPTIONS, }

      expect(result).toStrictEqual(expected)
    })

    it('multiple operators', () => {
      const context = { cache: new Cache(), i18n: new I18n() }

      const mirScript: MirScript = [
        OperatorCode.StringAsBoolean,
        OperatorCode.BooleanNegate,
        OperatorCode.BooleanAsString,
      ]

      const mirSource = {
        kind: Kind.HttpGet,
        kindOptions: KIND_OPTIONS,
        url: 'url',
        contentType: 'JSON API',
        contentTypeOptions: CONTENT_TYPE_OPTIONS,
        script: mirScript,
      }

      const result = new Source(context, mirSource, Kind.HttpGet, onChildrenEvent()).getMir()

      const expected = mirSource

      expect(result).toStrictEqual(expected)
    })
  })
})
