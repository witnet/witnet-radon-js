import { Radon } from '../../src/radon'
import { KIND_OPTIONS, DEFAULT_KIND_OPTION, CONTENT_TYPE_OPTIONS } from '../../src/constants'
import { I18n } from '../../src/i18n'
import { Cache } from '../../src/structures'
import {
  MirRequest,
  AggregationTallyReducer,
  Kind,
  MirAggregationTallyScript,
  AggregationTallyFilter,
  OperatorCode,
} from '../../src/types'
import { AggregationTallyScript } from '../../src/aggregationTallyScript'
import { formatJsTest } from '../utils'

describe('RandomNumberGenerator request', () => {
  const mir: MirRequest = {
    timelock: 0,
    retrieve: [
      {
        kind: DEFAULT_KIND_OPTION,
        kindOptions: KIND_OPTIONS,
        url: 'source_1',
        contentType: 'JSON API',
        contentTypeOptions: CONTENT_TYPE_OPTIONS,
        script: [OperatorCode.StringAsBoolean, OperatorCode.BooleanNegate],
      },
      {
        kind: DEFAULT_KIND_OPTION,
        kindOptions: KIND_OPTIONS,
        url: 'source_2',
        contentType: 'JSON API',
        contentTypeOptions: CONTENT_TYPE_OPTIONS,
        script: [OperatorCode.StringAsBoolean, OperatorCode.BooleanNegate],
      },
    ],
    aggregate: {
      filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationStandard, 1.1]],
      reducer: AggregationTallyReducer.mode,
    },
    tally: {
      filters: [AggregationTallyFilter.mode, [AggregationTallyFilter.deviationStandard, 1.1]],
      reducer: AggregationTallyReducer.mode,
    },
  }
  describe('it deletes unsupported operators when the source type is RNG', () => {
    it('maintain empty script', () => {
      const mir: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: Kind.RNG,
            kindOptions: KIND_OPTIONS,
            url: 'source_1',
            contentType: 'JSON API',
            contentTypeOptions: CONTENT_TYPE_OPTIONS,
            script: [],
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

      radon.addOperator(2)
      expect(radon.retrieve[0].script.operators.length).toBeFalsy()
      // Add operator in first source
    })
    it('creates an aggregation/tally script with RNG source', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, Kind.RNG)
      expect(script.filters.length).toStrictEqual(0)
    })
    it('correctly updates the source deleting source script operators', () => {
      const radon = new Radon(mir)
      radon.addOperator(2)
      radon.retrieve[0].update({
        kind: Kind.RNG,
        url: '',
        contentType: Kind.RNG,
      })
      expect(radon.retrieve[0].script.operators.length).toBe(0)
    })
    it('correctly updates the source deleting filters', () => {
      const radon = new Radon(mir)
      radon.addOperator(2)
      radon.retrieve[0].update({
        kind: Kind.RNG,
        url: '',
        contentType: Kind.RNG,
      })
      expect(radon.aggregate.filters.length).toBe(0)
    })
    it('correctly updates the source deleting url', () => {
      const radon = new Radon(mir)
      radon.addOperator(2)
      radon.retrieve[0].update({
        kind: Kind.RNG,
        url: '',
        contentType: Kind.RNG,
      })
      expect(radon.retrieve[0].url).toBe('')
    })
  })
  describe('Markup', () => {
    it('maintain empty script', () => {
      const mir: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: Kind.RNG,
            kindOptions: KIND_OPTIONS,
            url: 'source_1',
            contentType: 'JSON API',
            contentTypeOptions: CONTENT_TYPE_OPTIONS,
            script: [],
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

      radon.addOperator(2)
      expect(radon.getMarkup().retrieve[0].script.length).toBeFalsy()
      // Add operator in first source
    })
    it('creates an aggregation/tally script with RNG source', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, Kind.RNG)
      expect(script.getMarkup().filters.length).toStrictEqual(0)
    })
    it('correctly updates the source deleting source script operators', () => {
      const radon = new Radon(mir)
      radon.addOperator(2)
      radon.retrieve[0].update({
        kind: Kind.RNG,
        url: '',
        contentType: Kind.RNG,
      })
      expect(radon.getMarkup().retrieve[0].script.length).toBe(0)
    })
    it('correctly updates the source deleting filters', () => {
      const radon = new Radon(mir)
      radon.addOperator(2)
      radon.retrieve[0].update({
        kind: Kind.RNG,
        url: '',
        contentType: Kind.RNG,
      })
      expect(radon.getMarkup().aggregate.filters.length).toBe(0)
    })
    it('correctly updates the source deleting url', () => {
      const radon = new Radon(mir)
      radon.addOperator(2)
      radon.retrieve[0].update({
        kind: Kind.RNG,
        url: '',
        contentType: Kind.RNG,
      })
      expect(radon.getMarkup().retrieve[0].url).toBe('')
    })
  })
  describe('Mir', () => {
    it('maintain empty script', () => {
      const mir: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: Kind.RNG,
            kindOptions: KIND_OPTIONS,
            url: 'source_1',
            contentType: 'JSON API',
            contentTypeOptions: CONTENT_TYPE_OPTIONS,
            script: [],
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

      radon.addOperator(2)
      expect(radon.getMir().retrieve[0].script.length).toBeFalsy()
      // Add operator in first source
    })
    it('updates all sources type and content-type', () => {
      const mirExample: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: Kind.RNG,
            kindOptions: KIND_OPTIONS,
            url: 'source_1',
            contentType: 'JSON API',
            contentTypeOptions: CONTENT_TYPE_OPTIONS,
            script: [],
          },
          {
            kind: Kind.RNG,
            kindOptions: KIND_OPTIONS,
            url: 'source_1',
            contentType: 'JSON API',
            contentTypeOptions: CONTENT_TYPE_OPTIONS,
            script: [],
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
      const radon = new Radon(mirExample)
      radon.addOperator(2)
      radon.retrieve[0].update({
        kind: Kind.HttpGet,
        url: '',
        contentType: 'JSON API',
      })
      expect(radon.getMir().retrieve[0].kind).toBe('HTTP-GET')
    })
    it('creates an aggregation/tally script with RNG source', () => {
      const mirScript: MirAggregationTallyScript = {
        filters: [],
        reducer: 0x02,
      }
      const context = { cache: new Cache(), i18n: new I18n() }
      const script = new AggregationTallyScript(context, mirScript, Kind.RNG)
      expect(script.getMir().filters.length).toStrictEqual(0)
    })
    it('correctly updates the source deleting source script operators', () => {
      const radon = new Radon(mir)
      radon.addOperator(2)
      radon.retrieve[0].update({
        kind: Kind.RNG,
        url: '',
        contentType: Kind.RNG,
      })
      expect(radon.getMir().retrieve[0].script.length).toBe(0)
    })
    it('correctly updates the source leaving just one source', () => {
      const radon = new Radon(mir)
      radon.addOperator(2)
      radon.retrieve[0].update({
        kind: Kind.RNG,
        url: '',
        contentType: Kind.RNG,
      })
      expect(radon.getMir().retrieve.length).toBe(1)
    })
    it('correctly updates the source deleting filters', () => {
      const radon = new Radon(mir)
      radon.addOperator(2)
      radon.retrieve[0].update({
        kind: Kind.RNG,
        url: '',
        contentType: Kind.RNG,
      })
      expect(radon.getMir().aggregate.filters.length).toBe(0)
    })
    it('correctly updates the source deleting url', () => {
      const radon = new Radon(mir)
      radon.addOperator(2)
      radon.retrieve[0].update({
        kind: Kind.RNG,
        url: '',
        contentType: Kind.RNG,
      })
      expect(radon.getMir().retrieve[0].url).toBe('')
    })
  })
  describe('JS', () => {
    it('maintain empty script', () => {
      const mir: MirRequest = {
        timelock: 0,
        retrieve: [
          {
            kind: Kind.RNG,
            kindOptions: KIND_OPTIONS,
            url: 'source_1',
            contentType: 'RNG',
            contentTypeOptions: CONTENT_TYPE_OPTIONS,
            script: [],
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

      radon.addOperator(2)
      const expected = formatJsTest(`import * as Witnet from "witnet-requests"
        const request = new Witnet.Request()
        const source_0 = new Witnet.Source("")
        const aggregator = new Witnet.aggregator({  filters: [],  reducer: Witnet.Types.REDUCERS.hashConcatenate,})
        const tally = new Witnet.tally({  filters: [],  reducer: Witnet.Types.REDUCERS.hashConcatenate,})
        const request = new Witnet.Request()  
          .addSource(source_0)  
          .setAggregator(aggregator) // Set the aggregator function  
          .setTally(tally) // Set the tally function  
          .setQuorum(4, 70) // Set witness count  
          .setFees(10, 1, 1, 1) // Set economic incentives  
          .schedule(0) // Make this request immediately solvable
        export { request as default }`)
      expect(formatJsTest(radon.getJs())).toBe(expected)
    })
    it('correctly updates the source deleting source script operators', () => {
      const radon = new Radon(mir)
      radon.addOperator(2)
      radon.retrieve[0].update({
        kind: Kind.RNG,
        url: '',
        contentType: Kind.RNG,
      })
      const expected = formatJsTest(`import * as Witnet from "witnet-requests"
        const request = new Witnet.Request()
        const source_0 = new Witnet.Source("")
        const aggregator = new Witnet.aggregator({  filters: [],  reducer: Witnet.Types.REDUCERS.hashConcatenate,})
        const tally = new Witnet.tally({  filters: [],  reducer: Witnet.Types.REDUCERS.hashConcatenate,})
        const request = new Witnet.Request()  
          .addSource(source_0)
          .setAggregator(aggregator) // Set the aggregator function  
          .setTally(tally) // Set the tally function  
          .setQuorum(4, 70) // Set witness count  
          .setFees(10, 1, 1, 1) // Set economic incentives  
          .schedule(0) // Make this request immediately solvable
        export { request as default }`)
      expect(formatJsTest(radon.getJs())).toBe(expected)
    })
  })
})
