import {
  AggregationTallyReducer,
  MarkupHierarchicalType,
  MarkupSelect,
  MarkupType,
  OutputType,
  Context,
} from './types'
import { aggregationTallyReducerDescriptions, aTReducerMarkupOptions } from './structures'

export class AggregationTallyOperatorReducer {
  public context: Context
  public code: AggregationTallyReducer
  public id: number
  public scriptId: number
  public label: string

  constructor(
    context: Context,
    operator: AggregationTallyReducer = AggregationTallyReducer.averageMean,
    scriptId: number
  ) {
    this.id = context.cache.insert(this).id
    this.context = context
    this.code = operator
    this.scriptId = scriptId
    this.label = AggregationTallyReducer[this.code]
  }

  public getJs(): string {
    const reducerName = this.label

    return `Witnet.Types.REDUCERS.${reducerName}`
  }

  public getMarkup(): MarkupSelect {
    return {
      hierarchicalType: MarkupHierarchicalType.Operator,
      id: this.id,
      label: this.label,
      markupType: MarkupType.Select,
      options: aTReducerMarkupOptions(),
      outputType: OutputType.FilterOutput,
      scriptId: this.scriptId,
      selected: {
        arguments: [],
        hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
        label: this.label,
        markupType: MarkupType.Option,
        outputType: OutputType.ReducerOutput,
        description: aggregationTallyReducerDescriptions?.[this.code](this.context.i18n)(),
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
