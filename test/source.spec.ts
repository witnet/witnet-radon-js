import { MirScript, OperatorCode } from '../src/types'
import { Source } from '../src/radon'
import { Cache, markupOptions } from '../src/structures'

describe('Source', () => {
  describe('getMarkup method', () => {
    it('empty', () => {
      const mirScript: MirScript = []
      const cache = new Cache()

      const source = new Source(cache, {
        kind: 'kind',
        url: 'url',
        script: mirScript,
        contentType: 'JSON API',
      })

      const result = source.getMarkup()
      const expected = {
        kind: 'kind',
        url: 'url',
        contentType: 'JSON API',
        script: [],
        scriptId: 2,
      }
      expect(result).toStrictEqual(expected)
    })

    it('multiple operators', () => {
      const cache = new Cache()

      const mirScript: MirScript = [
        OperatorCode.StringAsBoolean,
        OperatorCode.BooleanNegate,
        OperatorCode.BooleanMatch,
      ]

      const mirSource = {
        kind: 'kind',
        url: 'url',
        contentType: 'JSON API',
        script: mirScript,
      }

      const result = new Source(cache, mirSource).getMarkup()

      const expected: any = {
        kind: 'kind',
        contentType: 'JSON API',
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
        ],
        url: 'url',
      }

      expect(result).toStrictEqual(expected)
    })
  })

  describe('getMir method', () => {
    it('empty', () => {
      const mirScript: MirScript = []
      const cache = new Cache()

      const source = new Source(cache, {
        kind: 'kind',
        url: 'url',
        script: mirScript,
        contentType: 'JSON API',
      })

      const result = source.getMir()
      const expected = { kind: 'kind', url: 'url', script: [], contentType: 'JSON API' }

      expect(result).toStrictEqual(expected)
    })

    it('multiple operators', () => {
      const cache = new Cache()

      const mirScript: MirScript = [
        OperatorCode.StringAsBoolean,
        OperatorCode.BooleanNegate,
        [OperatorCode.BooleanMatch, ''],
      ]

      const mirSource = {
        kind: 'kind',
        url: 'url',
        contentType: 'JSON API',
        script: mirScript,
      }

      const result = new Source(cache, mirSource).getMir()

      const expected = mirSource

      expect(result).toStrictEqual(expected)
    })
  })
})
