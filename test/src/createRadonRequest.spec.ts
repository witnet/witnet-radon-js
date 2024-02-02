import { Radon } from '../../src/radon.js'
import { DEFAULT_KIND_OPTION, KIND_OPTIONS, CONTENT_TYPE_OPTIONS } from '../../src/constants.js'
import { MirRequest, AggregationTallyReducer, MarkupInput } from '../../src/types.js'

describe('Radon', () => {
  it('addOperator', () => {
    const mir: MirRequest = {
      timelock: 0,
      retrieve: [
        {
          kind: DEFAULT_KIND_OPTION,
          kindOptions: KIND_OPTIONS,
          url: 'source_1',
          contentType: 'JSON API',
          contentTypeOptions: CONTENT_TYPE_OPTIONS,
          script: [],
          headers: {},
        },
      ],
      aggregate: {
        filters: [],
        reducer: AggregationTallyReducer.mode,
      },
      tally: {
        filters: [],
        reducer: AggregationTallyReducer.mode,
      },
    }
    const radon = new Radon(mir)

    expect(radon.getMarkup().retrieve[0].script).toStrictEqual([])
    radon.addOperator(2)

    expect(radon.getMarkup().retrieve[0].script[0].options[6].label).toBe('StringParseJsonArray')

    // Update operator with stringparsejsonmap option
    radon.update(7, 'StringParseJsonMap')

    // Add operator in first source
    radon.addOperator(2)

    expect(radon.getMarkup().retrieve[0].script[1].options[1].label).toBe('MapGetBoolean')

    radon.update(8, 'MapGetArray')

    // Update the input argument with a value
    radon.update(10, 'dataseries')
    expect(
      (radon.getMarkup().retrieve[0].script[1].selected.arguments[0] as MarkupInput).value
    ).toBe('dataseries')

    // Push new operator
    radon.addOperator(2)

    expect(
      radon
        .getMarkup()
        .retrieve[0].script[2].options.find((option) => option.label === 'ArrayGetMap')
    ).toBeTruthy()

    // select ArrayGetMap option
    radon.update(11, 'ArrayGetMap')

    expect(radon.getMarkup().retrieve[0].script[2].selected.label).toBe('getMap')

    // Write argument value
    radon.update(12, '0')

    expect(
      (radon.getMarkup().retrieve[0].script[2].selected.arguments[0] as MarkupInput).value
    ).toBe('0')

    // Push new operator
    radon.addOperator(2)

    expect(
      radon.getMarkup().retrieve[0].script[3].options.find((option) => option.label === 'MapGetMap')
    ).toBeTruthy()

    // Select MapGetMap option
    radon.update(13, 'MapGetMap')

    expect(radon.getMarkup().retrieve[0].script[3].selected.label).toBe('getMap')

    // // Write argument value
    radon.update(15, 'temp2m')

    expect(
      (radon.getMarkup().retrieve[0].script[3].selected.arguments[0] as MarkupInput).value
    ).toBe('temp2m')

    // Push new operator
    radon.addOperator(2)

    expect(
      radon
        .getMarkup()
        .retrieve[0].script[4].options.find((option) => option.label === 'MapGetFloat')
    ).toBeTruthy()

    // Select MapGetFloat option
    radon.update(16, 'MapGetFloat')

    expect(radon.getMarkup().retrieve[0].script[4].selected.label).toBe('getFloat')

    // Write argument value
    radon.update(18, 'max')

    expect(
      (radon.getMarkup().retrieve[0].script[4].selected.arguments[0] as MarkupInput).value
    ).toBe('max')
  })

  it('deletes operator when it doesn´t match the output type', () => {
    const mir: MirRequest = {
      timelock: 0,
      retrieve: [
        {
          kind: DEFAULT_KIND_OPTION,
          kindOptions: KIND_OPTIONS,
          url: 'source_1',
          contentType: 'JSON API',
          contentTypeOptions: CONTENT_TYPE_OPTIONS,
          script: [],
          headers: {},
        },
      ],
      aggregate: {
        filters: [],
        reducer: AggregationTallyReducer.mode,
      },
      tally: {
        filters: [],
        reducer: AggregationTallyReducer.mode,
      },
    }
    const radon = new Radon(mir)

    expect(radon.getMarkup().retrieve[0].script).toStrictEqual([])
    radon.addOperator(2)

    expect(radon.getMarkup().retrieve[0].script[0].options[6].label).toBe('StringParseJsonArray')

    // Update operator with stringparsejsonmap option
    radon.update(7, 'StringParseJsonMap')

    // Add operator in first source
    radon.addOperator(2)

    expect(radon.getMarkup().retrieve[0].script[1].options[1].label).toBe('MapGetBoolean')

    radon.update(8, 'MapGetBoolean')

    radon.addOperator(2)
    radon.update(11, 'BooleanNegate')

    expect(radon.getMarkup().retrieve[0].script[2].label).toBe('negate')
  })

  it('works with post requests', () => {
    const body = { field: 'value' }
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }

    const mir: MirRequest = {
      timelock: 0,
      retrieve: [
        {
          kind: DEFAULT_KIND_OPTION,
          kindOptions: KIND_OPTIONS,
          url: 'source_1',
          contentType: 'JSON API',
          contentTypeOptions: CONTENT_TYPE_OPTIONS,
          script: [],
          headers,
          body,
        },
      ],
      aggregate: {
        filters: [],
        reducer: AggregationTallyReducer.mode,
      },
      tally: {
        filters: [],
        reducer: AggregationTallyReducer.mode,
      },
    }
    const radon = new Radon(mir)

    const sourceMir = radon.getMir().retrieve[0]
    const sourceMarkup = radon.getMarkup().retrieve[0]

    expect(sourceMir.body).toStrictEqual(body)
    expect(sourceMir.headers).toStrictEqual(headers)
    expect(sourceMarkup.body).toStrictEqual(body)
    expect(sourceMarkup.headers).toStrictEqual(headers)
  })
})
