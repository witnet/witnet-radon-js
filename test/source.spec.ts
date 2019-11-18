// import { MirScript, OperatorCode } from '../src/types'
// import { Source } from '../src/newRadon'
// import { Cache } from '../src/structures'

describe.skip('Script', () => {
  it('', () => {
    expect(true).toBeTruthy
  })
  // TODO: add mocks
  // describe('getMarkup method', () => {
  //   it('empty', () => {
  //     const mirScript: MirScript = []
  //     const cache = new Cache()

  //     const source = new Source(cache, { kind: 'kind', url: 'url', script: mirScript })

  //     const result = source.getMarkup()
  //     const expected = { kind: 'kind', url: 'url', script: [] }
  //     expect(result).toStrictEqual(expected)
  //   })

  //   it('multiple operators', () => {
  //     const cache = new Cache()

  //     const mirScript: MirScript = [
  //       OperatorCode.StringAsBoolean,
  //       OperatorCode.BooleanNegate,
  //       OperatorCode.BooleanMatch,
  //     ]

  //     const mirSource = {
  //       kind: 'kind',
  //       url: 'url',
  //       script: mirScript,
  //     }

  //     const result = new Source(cache, mirSource).getMarkup()

  //     const expected: any = {
  //       kind: 'kind',
  //       script: [
  //         {
  //           hierarchicalType: 'operator',
  //           id: 2,
  //           label: 'asBoolean',
  //           markupType: 'select',
  //           options: [
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringAsBoolean',
  //               markupType: 'option',
  //               outputType: 'boolean',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringAsBytes',
  //               markupType: 'option',
  //               outputType: 'bytes',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringAsFloat',
  //               markupType: 'option',
  //               outputType: 'float',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringAsInteger',
  //               markupType: 'option',
  //               outputType: 'integer',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringLength',
  //               markupType: 'option',
  //               outputType: 'integer',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringMatch',
  //               markupType: 'option',
  //               outputType: 'matchOutput',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonBoolean',
  //               markupType: 'option',
  //               outputType: 'array',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonBoolean',
  //               markupType: 'option',
  //               outputType: 'boolean',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonFloat',
  //               markupType: 'option',
  //               outputType: 'float',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonInteger',
  //               markupType: 'option',
  //               outputType: 'integer',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonMap',
  //               markupType: 'option',
  //               outputType: 'map',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonString',
  //               markupType: 'option',
  //               outputType: 'string',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseXML',
  //               markupType: 'option',
  //               outputType: 'map',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringToLowerCase',
  //               markupType: 'option',
  //               outputType: 'string',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringToUpperCase',
  //               markupType: 'option',
  //               outputType: 'string',
  //             },
  //           ],
  //           outputType: 'boolean',
  //           selected: {
  //             arguments: [],
  //             hierarchicalType: 'selectedOperatorOption',
  //             label: 'asBoolean',
  //             markupType: 'option',
  //             outputType: 'boolean',
  //           },
  //         },
  //         {
  //           hierarchicalType: 'operator',
  //           id: 3,
  //           label: 'negate',
  //           markupType: 'select',
  //           options: [
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'BooleanMatch',
  //               markupType: 'option',
  //               outputType: 'matchOutput',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'BooleanNegate',
  //               markupType: 'option',
  //               outputType: 'boolean',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringAsBoolean',
  //               markupType: 'option',
  //               outputType: 'boolean',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringAsBytes',
  //               markupType: 'option',
  //               outputType: 'bytes',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringAsFloat',
  //               markupType: 'option',
  //               outputType: 'float',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringAsInteger',
  //               markupType: 'option',
  //               outputType: 'integer',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringLength',
  //               markupType: 'option',
  //               outputType: 'integer',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringMatch',
  //               markupType: 'option',
  //               outputType: 'matchOutput',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonBoolean',
  //               markupType: 'option',
  //               outputType: 'array',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonBoolean',
  //               markupType: 'option',
  //               outputType: 'boolean',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonFloat',
  //               markupType: 'option',
  //               outputType: 'float',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonInteger',
  //               markupType: 'option',
  //               outputType: 'integer',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonMap',
  //               markupType: 'option',
  //               outputType: 'map',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonString',
  //               markupType: 'option',
  //               outputType: 'string',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseXML',
  //               markupType: 'option',
  //               outputType: 'map',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringToLowerCase',
  //               markupType: 'option',
  //               outputType: 'string',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringToUpperCase',
  //               markupType: 'option',
  //               outputType: 'string',
  //             },
  //           ],
  //           outputType: 'boolean',
  //           selected: {
  //             arguments: [],
  //             hierarchicalType: 'selectedOperatorOption',
  //             label: 'negate',
  //             markupType: 'option',
  //             outputType: 'boolean',
  //           },
  //         },
  //         {
  //           hierarchicalType: 'operator',
  //           id: 4,
  //           label: 'match',
  //           markupType: 'select',
  //           options: [
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'BooleanMatch',
  //               markupType: 'option',
  //               outputType: 'matchOutput',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'BooleanNegate',
  //               markupType: 'option',
  //               outputType: 'boolean',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringAsBoolean',
  //               markupType: 'option',
  //               outputType: 'boolean',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringAsBytes',
  //               markupType: 'option',
  //               outputType: 'bytes',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringAsFloat',
  //               markupType: 'option',
  //               outputType: 'float',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringAsInteger',
  //               markupType: 'option',
  //               outputType: 'integer',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringLength',
  //               markupType: 'option',
  //               outputType: 'integer',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringMatch',
  //               markupType: 'option',
  //               outputType: 'matchOutput',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonBoolean',
  //               markupType: 'option',
  //               outputType: 'array',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonBoolean',
  //               markupType: 'option',
  //               outputType: 'boolean',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonFloat',
  //               markupType: 'option',
  //               outputType: 'float',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonInteger',
  //               markupType: 'option',
  //               outputType: 'integer',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonMap',
  //               markupType: 'option',
  //               outputType: 'map',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseJsonString',
  //               markupType: 'option',
  //               outputType: 'string',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringParseXML',
  //               markupType: 'option',
  //               outputType: 'map',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringToLowerCase',
  //               markupType: 'option',
  //               outputType: 'string',
  //             },
  //             {
  //               hierarchicalType: 'operatorOption',
  //               label: 'StringToUpperCase',
  //               markupType: 'option',
  //               outputType: 'string',
  //             },
  //           ],
  //           outputType: 'matchOutput',
  //           selected: {
  //             arguments: [],
  //             hierarchicalType: 'selectedOperatorOption',
  //             label: 'match',
  //             markupType: 'option',
  //             outputType: 'matchOutput',
  //           },
  //         },
  //       ],
  //       url: 'url',
  //     }

  //     expect(result).toStrictEqual(expected)
  //   })
  // })
})
