import {
  AggregationTallyFilter,
  MarkupHierarchicalType,
  MarkupSelect,
  MarkupType,
  MirAggregationTallyFilterOperator,
  OutputType,
} from './types'
import { aggregationTallyFilterDescriptions, aTFilterMarkupOptions, Cache } from './structures'
import { AggregationTallyFilterArgument } from './aggregationTallyFilterArgument'

export class AggregationTallyOperatorFilter {
  public cache: Cache
  public code: AggregationTallyFilter
  public id: number
  public default: boolean
  public argument: AggregationTallyFilterArgument | null
  public scriptId: number

  constructor(cache: Cache, operator: MirAggregationTallyFilterOperator, scriptId: number) {
    this.id = cache.insert(this).id
    this.default = !operator
    this.cache = cache
    this.code = Array.isArray(operator) ? operator[0] : operator
    this.argument = Array.isArray(operator)
      ? new AggregationTallyFilterArgument(cache, operator[1])
      : null
    this.scriptId = scriptId
  }

  public getMarkup(): MarkupSelect {
    const args =
      this.code === AggregationTallyFilter.mode
        ? []
        : [(this.argument as AggregationTallyFilterArgument).getMarkup()]

    return {
      hierarchicalType: MarkupHierarchicalType.Operator,
      id: this.id,
      label: AggregationTallyFilter[this.code],
      markupType: MarkupType.Select,
      options: aTFilterMarkupOptions(),
      outputType: OutputType.FilterOutput,
      scriptId: this.scriptId,
      selected: {
        arguments: args,
        hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
        label: AggregationTallyFilter[this.code],
        markupType: MarkupType.Option,
        outputType: OutputType.FilterOutput,
        description: aggregationTallyFilterDescriptions?.[this.code](args?.[0]?.label),
      },
    } as MarkupSelect
  }

  public getMir(): MirAggregationTallyFilterOperator {
    return this.code === AggregationTallyFilter.mode
      ? this.code
      : ([
          this.code,
          (this.argument as AggregationTallyFilterArgument).getMir(),
        ] as MirAggregationTallyFilterOperator)
  }

  public update(value: AggregationTallyFilter | number) {
    // check if the argument type should change
    if (value === AggregationTallyFilter.mode) {
      this.argument = null
    } else if (!this.argument) {
      this.argument = new AggregationTallyFilterArgument(this.cache, '')
    }
    this.default = false

    if (Number.isInteger(value)) {
      this.code = value
    } else {
      this.code = (AggregationTallyFilter[value] as unknown) as AggregationTallyFilter
    }
  }
}
