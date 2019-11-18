import { Radon } from '../src/radon'
import { MirRequest, OperatorCode } from '../src/types'
import { markupOptions } from '../src/structures'

describe('Radon', () => {
  it('getMarkup method', () => {
    const mirRequest: MirRequest = {
      timelock: 0,
      retrieve: [{ url: '', kind: 'HTTP_GET', script: [128] }],
      aggregate: [16],
      tally: [],
    }

    const radon = new Radon(mirRequest)
    const result = radon.getMarkup()
    const expected = {
      notBefore: 0,
      retrieve: [
        {
          kind: 'HTTP_GET',
          url: 'source_1',
          script: [
            {
              hierarchicalType: 'operator',
              id: 3,
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
              label: 'match',
              markupType: 'select',
              options: markupOptions.boolean,
              outputType: 'matchOutput',
              selected: {
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 5,
                    label: 'categories',
                    markupType: 'input',
                    value: '',
                  },
                  {
                    hierarchicalType: 'argument',
                    id: 6,
                    label: 'default',
                    markupType: 'input',
                    value: true,
                  },
                ],
                hierarchicalType: 'selectedOperatorOption',
                label: 'match',
                markupType: 'option',
                outputType: 'matchOutput',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 7,
              label: 'length',
              markupType: 'select',
              options: markupOptions.matchOutput,
              outputType: 'integer',
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'length',
                markupType: 'option',
                outputType: 'integer',
              },
            },
          ],
        },
        {
          kind: 'HTTP_GET',
          url: 'source_2',
          script: [
            {
              hierarchicalType: 'operator',
              id: 10,
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
              id: 11,
              label: 'match',
              markupType: 'select',
              options: markupOptions.boolean,
              outputType: 'matchOutput',
              selected: {
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 12,
                    label: 'categories',
                    markupType: 'input',
                    value: '',
                  },
                  {
                    hierarchicalType: 'argument',
                    id: 13,
                    label: 'default',
                    markupType: 'input',
                    value: true,
                  },
                ],
                hierarchicalType: 'selectedOperatorOption',
                label: 'match',
                markupType: 'option',
                outputType: 'matchOutput',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 14,
              label: 'length',
              markupType: 'select',
              options: markupOptions.matchOutput,
              outputType: 'integer',
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'length',
                markupType: 'option',
                outputType: 'integer',
              },
            },
          ],
        },
      ],
      aggregate: [
        {
          hierarchicalType: 'operator',
          id: 16,
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
        },
        {
          hierarchicalType: 'operator',
          id: 17,
          label: 'sum',
          markupType: 'select',
          options: markupOptions.integer,
          outputType: 'integer',
          selected: {
            arguments: [
              {
                hierarchicalType: 'argument',
                id: 18,
                label: 'addend',
                markupType: 'input',
                value: 2,
              },
            ],
            hierarchicalType: 'selectedOperatorOption',
            label: 'sum',
            markupType: 'option',
            outputType: 'integer',
          },
        },
      ],
      tally: [],
    }
    expect(result).toStrictEqual(expected)
  })
  it.skip('getMarkup method', () => {
    const mirRequest: MirRequest = {
      timelock: 0,
      retrieve: [
        {
          kind: 'HTTP_GET',
          url: 'source_1',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
        {
          kind: 'HTTP_GET',
          url: 'source_2',
          script: [
            OperatorCode.StringAsBoolean,
            [OperatorCode.BooleanMatch, '', true],
            OperatorCode.StringLength,
          ],
        },
      ],
      aggregate: [OperatorCode.ArrayCount, [OperatorCode.IntegerSum, 2]],
      tally: [],
    }

    const radon = new Radon(mirRequest)
    const result = radon.getMarkup()
    const expected = {
      notBefore: 0,
      retrieve: [
        {
          kind: 'HTTP_GET',
          url: 'source_1',
          script: [
            {
              hierarchicalType: 'operator',
              id: 3,
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
              label: 'match',
              markupType: 'select',
              options: markupOptions.boolean,
              outputType: 'matchOutput',
              selected: {
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 5,
                    label: 'categories',
                    markupType: 'input',
                    value: '',
                  },
                  {
                    hierarchicalType: 'argument',
                    id: 6,
                    label: 'default',
                    markupType: 'input',
                    value: true,
                  },
                ],
                hierarchicalType: 'selectedOperatorOption',
                label: 'match',
                markupType: 'option',
                outputType: 'matchOutput',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 7,
              label: 'length',
              markupType: 'select',
              options: markupOptions.matchOutput,
              outputType: 'integer',
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'length',
                markupType: 'option',
                outputType: 'integer',
              },
            },
          ],
        },
        {
          kind: 'HTTP_GET',
          url: 'source_2',
          script: [
            {
              hierarchicalType: 'operator',
              id: 10,
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
              id: 11,
              label: 'match',
              markupType: 'select',
              options: markupOptions.boolean,
              outputType: 'matchOutput',
              selected: {
                arguments: [
                  {
                    hierarchicalType: 'argument',
                    id: 12,
                    label: 'categories',
                    markupType: 'input',
                    value: '',
                  },
                  {
                    hierarchicalType: 'argument',
                    id: 13,
                    label: 'default',
                    markupType: 'input',
                    value: true,
                  },
                ],
                hierarchicalType: 'selectedOperatorOption',
                label: 'match',
                markupType: 'option',
                outputType: 'matchOutput',
              },
            },
            {
              hierarchicalType: 'operator',
              id: 14,
              label: 'length',
              markupType: 'select',
              options: markupOptions.matchOutput,
              outputType: 'integer',
              selected: {
                arguments: [],
                hierarchicalType: 'selectedOperatorOption',
                label: 'length',
                markupType: 'option',
                outputType: 'integer',
              },
            },
          ],
        },
      ],
      aggregate: [
        {
          hierarchicalType: 'operator',
          id: 16,
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
        },
        {
          hierarchicalType: 'operator',
          id: 17,
          label: 'sum',
          markupType: 'select',
          options: markupOptions.integer,
          outputType: 'integer',
          selected: {
            arguments: [
              {
                hierarchicalType: 'argument',
                id: 18,
                label: 'addend',
                markupType: 'input',
                value: 2,
              },
            ],
            hierarchicalType: 'selectedOperatorOption',
            label: 'sum',
            markupType: 'option',
            outputType: 'integer',
          },
        },
      ],
      tally: [],
    }
    expect(result).toStrictEqual(expected)
  })
})
