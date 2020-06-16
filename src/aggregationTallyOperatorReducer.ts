import {
  AggregationTallyReducer,
  MarkupHierarchicalType,
  MarkupSelect,
  MarkupType,
  OutputType,
} from './types'
import { aggregationTallyReducerDescriptions, aTReducerMarkupOptions, Cache } from './structures'

export class AggregationTallyOperatorReducer {
  public cache: Cache
  public code: AggregationTallyReducer
  public id: number
  public scriptId: number

  constructor(
    cache: Cache,
    operator: AggregationTallyReducer = AggregationTallyReducer.averageMean,
    scriptId: number
  ) {
    this.id = cache.insert(this).id
    this.cache = cache
    this.code = operator
    this.scriptId = scriptId
  }

  public getMarkup(): MarkupSelect {
    return {
      hierarchicalType: MarkupHierarchicalType.Operator,
      id: this.id,
      label: AggregationTallyReducer[this.code],
      markupType: MarkupType.Select,
      options: aTReducerMarkupOptions(),
      outputType: OutputType.FilterOutput,
      scriptId: this.scriptId,
      selected: {
        arguments: [],
        hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
        label: AggregationTallyReducer[this.code],
        markupType: MarkupType.Option,
        outputType: OutputType.ReducerOutput,
        description: aggregationTallyReducerDescriptions?.[this.code](),
      },
    } as MarkupSelect
  }

  public getMir(): AggregationTallyReducer {
    return this.code
  }

  public update(value: AggregationTallyReducer | number) {
    if (Number.isInteger(value)) {
      this.code = value
    } else {
      this.code = (AggregationTallyReducer[value] as unknown) as AggregationTallyReducer
    }
  }
}
