import {
  AggregationTallyFilter,
  MarkupAggregationTallyScript,
  MirAggregationTallyScript,
  Context,
  AggregationTallyReducer,
} from './types.js'
import { AggregationTallyOperatorReducer } from './aggregationTallyOperatorReducer.js'
import { AggregationTallyOperatorFilter } from './aggregationTallyOperatorFilter.js'

export class AggregationTallyScript {
  public context: Context
  public filters: Array<AggregationTallyOperatorFilter>
  public mirScript: MirAggregationTallyScript
  public reducer: AggregationTallyOperatorReducer
  public scriptId: number
  public isRngRequest: boolean

  constructor(context: Context, script: MirAggregationTallyScript, isRngRequest: boolean) {
    this.scriptId = context.cache.insert(this).id
    this.mirScript = script
    this.context = context
    this.isRngRequest = isRngRequest
    this.filters = script.filters.map(
      (filter) => new AggregationTallyOperatorFilter(context, filter, this.scriptId)
    )
    this.reducer = new AggregationTallyOperatorReducer(
      context,
      script.reducer,
      this.scriptId,
      this.isRngRequest
    )
  }

  public addOperator() {
    if (!this.isRngRequest) {
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

  public setIsRngRequest(isRngRequest: boolean) {
    this.isRngRequest = isRngRequest
    if (isRngRequest) {
      this.filters = []
      this.reducer = new AggregationTallyOperatorReducer(
        this.context,
        AggregationTallyReducer.hashConcatenate,
        this.scriptId,
        this.isRngRequest
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
