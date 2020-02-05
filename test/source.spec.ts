import { MirScript, OperatorCode } from '../src/types'
import { Source } from '../src/radon'
import { Cache, markupOptions } from '../src/structures'

describe('Script', () => {
  describe('getMarkup method', () => {
    it('empty', () => {
      const mirScript: MirScript = []
      const cache = new Cache()

      const source = new Source(cache, { kind: 'kind', url: 'url', script: mirScript })

      const result = source.getMarkup()
      const expected = { kind: 'kind', url: 'url', script: [], scriptId: 2 }
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
        script: mirScript,
      }

      const result = new Source(cache, mirSource).getMarkup()

      const expected: any = {
        kind: 'kind',
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

      const source = new Source(cache, { kind: 'kind', url: 'url', script: mirScript })

      const result = source.getMir()
      const expected = { kind: 'kind', url: 'url', script: [] }

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
        script: mirScript,
      }

      const result = new Source(cache, mirSource).getMir()

      const expected = mirSource

      expect(result).toStrictEqual(expected)
    })
  })
})
