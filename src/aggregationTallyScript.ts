import {
  AggregationTallyFilter,
  MarkupAggregationTallyScript,
  MirAggregationTallyScript,
} from './types'
import { Cache } from './structures'
import { AggregationTallyOperatorReducer } from './aggregationTallyOperatorReducer'
import { AggregationTallyOperatorFilter } from './aggregationTallyOperatorFilter'

export class AggregationTallyScript {
  public cache: Cache
  public filters: Array<AggregationTallyOperatorFilter>
  public mirScript: MirAggregationTallyScript
  public reducer: AggregationTallyOperatorReducer
  public scriptId: number

  constructor(cache: Cache, script: MirAggregationTallyScript) {
    this.scriptId = cache.insert(this).id
    this.mirScript = script
    this.cache = cache
    this.filters = script.filters.map(
      (filter) => new AggregationTallyOperatorFilter(cache, filter, this.scriptId)
    )
    this.reducer = new AggregationTallyOperatorReducer(cache, script.reducer, this.scriptId)
  }

  public addOperator() {
    this.filters.push(
      new AggregationTallyOperatorFilter(
        this.cache,
        [AggregationTallyFilter.deviationStandard, 1],
        this.scriptId
      )
    )
  }

  // Remove the filter from the filter's list by id
  public deleteOperator(operatorId: number) {
    const operatorIndex = this.findIdx(operatorId)
    this.filters.splice(operatorIndex, 1)
  }

  public getJs(stage: 'aggregator' | 'tally'): string {
    const variableName = stage
    const className = stage
    const filters = this.filters.map((filter) => filter.getJs()).join('\n')
    const reducer = this.reducer.getJs()

    return `const ${variableName} = new Witnet.${className}({
        filters: [
          ${filters}
        ],
          reducer: ${reducer},
        })`
  }

  public getMir(): MirAggregationTallyScript {
    return {
      filters: this.filters.map((operator) => operator.getMir()),
      reducer: this.reducer.getMir(),
    }
  }

  public getMarkup(): MarkupAggregationTallyScript {
    return {
      filters: this.filters.map((operator) => {
        return operator.getMarkup()
      }),
      reducer: this.reducer.getMarkup(),
    }
  }

  public findIdx(filterId: number) {
    return this.filters.findIndex((x) => filterId === x.id)
  }

  public push(filter: AggregationTallyFilter) {
    this.filters.push(new AggregationTallyOperatorFilter(this.cache, filter, this.scriptId))
  }
}
