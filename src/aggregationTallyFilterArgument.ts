import {
  Filter,
  MarkupHierarchicalType,
  MarkupInput,
  MarkupType,
  MirArgument,
  Context,
} from './types.js'

export class AggregationTallyFilterArgument {
  public context: Context
  public id: number
  public value: string | number | boolean

  constructor(context: Context, argument: string | number | boolean) {
    this.id = context.cache.insert(this).id
    this.context = context
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

  public getJs(): string | number | boolean {
    if (typeof this.value === 'string') {
      return JSON.stringify(this.value)
    } else {
      return this.value
    }
  }

  public getMir(): MirArgument {
    return this.value as MirArgument
  }

  public update(value: string | number | boolean | Filter) {
    this.value = value
  }
}
