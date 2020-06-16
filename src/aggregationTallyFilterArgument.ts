import { Filter, MarkupHierarchicalType, MarkupInput, MarkupType, MirArgument } from './types'
import { Cache } from './structures'

export class AggregationTallyFilterArgument {
  public cache: Cache
  public id: number
  public value: string | number | boolean

  constructor(cache: Cache, argument: string | number | boolean) {
    this.id = cache.insert(this).id
    this.cache = cache
    this.value = argument
  }

  public getMarkup(): MarkupInput {
    return {
      hierarchicalType: MarkupHierarchicalType.Argument,
      id: this.id,
      label: 'by',
      markupType: MarkupType.Input,
      value: this.value as string | number | boolean,
    } as MarkupInput
  }

  public getMir(): MirArgument {
    return this.value as MirArgument
  }

  public update(value: string | number | boolean | Filter) {
    this.value = value
  }
}
