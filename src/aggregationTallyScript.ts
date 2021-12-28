import {
  AggregationTallyFilter,
  MarkupAggregationTallyScript,
  MirAggregationTallyScript,
  Context,
  Kind,
  AggregationTallyReducer,
} from './types'
import { AggregationTallyOperatorReducer } from './aggregationTallyOperatorReducer'
import { AggregationTallyOperatorFilter } from './aggregationTallyOperatorFilter'

export class AggregationTallyScript {
  public context: Context
  public filters: Array<AggregationTallyOperatorFilter>
  public mirScript: MirAggregationTallyScript
  public reducer: AggregationTallyOperatorReducer
  public scriptId: number
  public sourceType: Kind

  constructor(context: Context, script: MirAggregationTallyScript, sourceType: Kind) {
    this.scriptId = context.cache.insert(this).id
    this.mirScript = script
    this.context = context
    this.sourceType = sourceType
    this.filters = script.filters.map(
      (filter) => new AggregationTallyOperatorFilter(context, filter, this.scriptId)
    )
    this.reducer = new AggregationTallyOperatorReducer(
      context,
      script.reducer,
      this.scriptId,
      this.sourceType
    )
  }

  public addOperator() {
    if (this.sourceType !== Kind.RNG) {
      this.filters.push(
        new AggregationTallyOperatorFilter(
          this.context,
          [AggregationTallyFilter.deviationStandard, 1],
          this.scriptId
        )
      )
    }
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

  public updateSourceType(sourceType: Kind) {
    this.sourceType = sourceType
    if (this.sourceType === Kind.RNG) {
      this.filters = []
      this.reducer = new AggregationTallyOperatorReducer(
        this.context,
        AggregationTallyReducer.hashConcatenate,
        this.scriptId,
        this.sourceType
      )
    }
  }

  public findIdx(filterId: number) {
    return this.filters.findIndex((x) => filterId === x.id)
  }

  public push(filter: AggregationTallyFilter) {
    this.filters.push(new AggregationTallyOperatorFilter(this.context, filter, this.scriptId))
  }
}
