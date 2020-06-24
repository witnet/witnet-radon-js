import {
  ArgumentInfo,
  Filter,
  MarkupArgument,
  MarkupArgumentScript,
  MarkupArgumentType,
  MarkupHierarchicalType,
  MarkupInput,
  MarkupOption,
  MarkupSelect,
  MarkupType,
  MirArgument,
  MirArgumentType,
  MirScript,
  OutputType,
  Reducer,
} from './types'
import { Cache } from './structures'
import { getArgumentInfoType, getEnumNames, getMarkupInputTypeFromArgumentType } from './utils'
import { Script } from './script'

export class Argument {
  public argument: Argument | Script | null
  public argumentInfo: ArgumentInfo
  public argumentType: MarkupArgumentType
  public cache: Cache
  public id: number
  public value: MirArgument | undefined
  public subscript: boolean

  // TODO: find a better way to discriminate whether the argument is a subscript
  constructor(
    cache: Cache,
    argumentInfo: ArgumentInfo,
    argument?: MirArgument,
    subscript: boolean = false
  ) {
    this.argumentType = getArgumentInfoType(argumentInfo)
    this.id = cache.insert(this).id
    this.argumentInfo = argumentInfo
    this.cache = cache
    this.value = argument
    this.subscript = subscript
    if (
      this.argumentInfo.type === MirArgumentType.Boolean ||
      this.argumentInfo.type === MirArgumentType.Float ||
      this.argumentInfo.type === MirArgumentType.Integer ||
      this.argumentInfo.type === MirArgumentType.String
    ) {
      this.argument = null
    } else if (this.argumentInfo.type === MirArgumentType.FilterFunction) {
      if (this.subscript) {
        this.argument = new Script(this.cache, argument as MirScript)
      } else {
        this.argument = new Argument(
          this.cache,
          { name: 'by', optional: false, type: MirArgumentType.String },
          (argument as [Filter, boolean | string | number])[1]
        )
      }
    } else if (this.argumentInfo.type === MirArgumentType.ReducerFunction) {
      this.argument = new Argument(
        this.cache,
        { name: 'by', optional: false, type: MirArgumentType.String },
        argument as Reducer
      )
    } else if (this.argumentInfo.type === MirArgumentType.Subscript) {
      this.argument = new Script(this.cache, argument as MirScript)
    } else {
      this.argument = null
    }
  }

  public getJs(): string | number{
    const type = this.argumentInfo.type

      if (type === MirArgumentType.Boolean) {
        return this.value as string
      } else if (type === MirArgumentType.FilterFunction) {
        // FIXME: how filter argument is represented
        return JSON.stringify(this.value)
      } else if (type === MirArgumentType.Float) {
        return this.value as number
      } else if (type === MirArgumentType.Integer) {
        return this.value as number
      } else if (type === MirArgumentType.ReducerFunction) {
        // FIXME: how filter argument is represented
        return Reducer[this.value as Reducer]
      } else if (type === MirArgumentType.String) {
        return JSON.stringify(this.value)
      } else if (type === MirArgumentType.Subscript) {
        return `new Script()${(this.argument as Script).getJs()}`
      } else {
        return JSON.stringify(this.value)
      }
  }

  public getMarkup(): MarkupArgument {
    if (this.argumentType === MarkupArgumentType.Input) {
      return {
        hierarchicalType: MarkupHierarchicalType.Argument,
        id: this.id,
        label: this.argumentInfo.name,
        markupType: MarkupType.Input,
        value: this.value as string | number | boolean,
        type: getMarkupInputTypeFromArgumentType(this.argumentInfo.type),
      } as MarkupInput
    } else if (this.argumentType === MarkupArgumentType.SelectFilter && !this.subscript) {
      const args = this.argument ? [this.argument.getMarkup()] : []
      return {
        hierarchicalType: MarkupHierarchicalType.Argument,
        id: this.id,
        label: this.argumentInfo.name,
        markupType: MarkupType.Select,
        options: generateFilterArgumentOptions(),
        outputType: OutputType.FilterOutput,
        selected: {
          arguments: args,
          hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
          label: generateFilterArgumentOptions()[0].label,
          outputType: generateFilterArgumentOptions()[0].outputType,
          markupType: MarkupType.Option,
        },
      } as MarkupSelect
    } else if (this.argumentType === MarkupArgumentType.Subscript || this.subscript) {
      return {
        id: this.id,
        label: this.argumentInfo.name,
        markupType: MarkupType.Script,
        outputType: OutputType.SubscriptOutput,
        hierarchicalType: MarkupHierarchicalType.Argument,
        subscript: (this.argument as Script).getMarkup(),
      } as MarkupArgumentScript
    } else {
      // TODO: Refactor this ugly code
      return {
        hierarchicalType: MarkupHierarchicalType.Argument,
        id: this.id,
        label: this.argumentInfo.name,
        markupType: MarkupType.Select,
        options: generateReducerArgumentOptions(),
        outputType: OutputType.ReducerOutput,
        selected: {
          arguments: [],
          hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
          label: generateReducerArgumentOptions()[0].label,
          outputType: generateReducerArgumentOptions()[0].outputType,
          markupType: MarkupType.Option,
        },
      } as MarkupSelect
    }
  }

  public getMir(): MirArgument {
    if (this.argumentType === MarkupArgumentType.SelectFilter) {
      return [
        (this.value as [Filter, number | string | boolean])[0],
        (this.argument as Argument).getMir(),
      ] as MirArgument
    } else if (this.argumentType === MarkupArgumentType.Subscript) {
      return (this.argument as Script).getMir()
    } else {
      return this.value as MirArgument
    }
  }

  public update(value: string | number | boolean | Filter) {
    if (this.argumentType === MarkupArgumentType.SelectFilter) {
      ;(this.value as [Filter, number] | [Filter, string] | [Filter, boolean])[0] = (Filter[
        value as number
      ] as unknown) as Filter
    } else {
      this.value = value
    }
  }
}

export function generateFilterArgumentOptions(): Array<MarkupOption> {
  const markupOptions: Array<MarkupOption> = getEnumNames(Filter).map((name) => {
    return {
      label: name,
      hierarchicalType: MarkupHierarchicalType.OperatorOption,
      markupType: MarkupType.Option,
      outputType: OutputType.FilterOutput,
    }
  })

  return markupOptions
}

export function generateReducerArgumentOptions(): Array<MarkupOption> {
  const markupOptions: Array<MarkupOption> = getEnumNames(Reducer).map((name) => {
    return {
      label: name,
      hierarchicalType: MarkupHierarchicalType.OperatorOption,
      markupType: MarkupType.Option,
      outputType: OutputType.ReducerOutput,
    }
  })

  return markupOptions
}
