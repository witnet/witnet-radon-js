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
import { DEFAULT_OPERATOR } from './constants'
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

  // TODO: find a better way to discriminate whether the argument is a subscript
  constructor(cache: Cache, argumentInfo: ArgumentInfo, argument?: MirArgument) {
    this.argumentType = getArgumentInfoType(argumentInfo)
    this.id = cache.insert(this).id
    this.argumentInfo = argumentInfo
    this.cache = cache
    this.value = argument
    if (
      this.argumentInfo.type === MirArgumentType.Boolean ||
      this.argumentInfo.type === MirArgumentType.Float ||
      this.argumentInfo.type === MirArgumentType.Integer ||
      this.argumentInfo.type === MirArgumentType.String
    ) {
      this.argument = null
    } else if (this.argumentInfo.type === MirArgumentType.FilterFunction) {
      // Check if it's custom filter to know if contains a subscript or a filter function
      if (Array.isArray(argument) && Array.isArray(argument[1])) {
        this.argument = new Argument(
          this.cache,
          { name: 'by', optional: false, type: MirArgumentType.Subscript },
          (argument as [Filter, MirScript])[1]
        )
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
      this.argument = new Script(this.cache, argument as MirScript, OutputType.SubscriptOutput)
    } else {
      this.argument = null
    }
  }

  public getJs(): string | number | boolean {
    const type = this.argumentInfo.type

    if (type === MirArgumentType.Boolean) {
      return this.value as boolean
    } else if (type === MirArgumentType.FilterFunction) {
      return (this.argument as Script).getJs()
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
        value: this.value as string | number,
        type: getMarkupInputTypeFromArgumentType(this.argumentInfo.type),
      } as MarkupInput
    } else if (this.argumentType === MarkupArgumentType.SelectBoolean) {
      return {
        hierarchicalType: MarkupHierarchicalType.Argument,
        id: this.id,
        label: this.argumentInfo.name,
        markupType: MarkupType.Select,
        options: generateBooleanArgumentOptions(),
        outputType: OutputType.Boolean,
        selected: {
          arguments: [],
          hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
          label: this.value,
          outputType: generateBooleanArgumentOptions()[0].outputType,
          markupType: MarkupType.Option,
        },
      } as MarkupSelect
    } else if (this.argumentType === MarkupArgumentType.SelectFilter) {
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
          label: Filter[(this.value as [Filter, number | boolean])[0]],
          outputType: generateFilterArgumentOptions()[0].outputType,
          markupType: MarkupType.Option,
        },
      } as MarkupSelect
    } else if (this.argumentType === MarkupArgumentType.Subscript) {
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
          label: Reducer[this.value as Reducer],
          outputType: generateReducerArgumentOptions()[0].outputType,
          markupType: MarkupType.Option,
        },
      } as MarkupSelect
    }
  }

  public getMir(): MirArgument {
    if (this.argumentType === MarkupArgumentType.SelectFilter) {
      if (Array.isArray(this.value) && this.value[0] === Filter.custom) {
        return (this.argument as Argument).getMir()
      } else {
        return [
          (this.value as [Filter, number | string | boolean])[0],
          (this.argument as Argument).getMir(),
        ] as MirArgument
      }
    } else if (this.argumentType === MarkupArgumentType.Subscript) {
      return (this.argument as Script).getMir()
    } else {
      return this.value as MirArgument
    }
  }

  public update(value: string | number | boolean | Filter | Object) {
    if (this.argumentType === MarkupArgumentType.SelectFilter) {
      if (value === 'custom' && (this.value as [Filter, MirScript])[0] !== Filter['custom']) {
        // the current argument is an input argument and the new value is a subscript argument
        this.value = [Filter[value as keyof typeof Filter], [DEFAULT_OPERATOR]]
        this.argument = new Argument(
          this.cache,
          { name: 'by', optional: false, type: MirArgumentType.Subscript },
          (this.value as [Filter, MirScript])[1]
        )
      } else if (
        value !== 'custom' &&
        (this.value as [Filter, MirScript])[0] === Filter['custom']
      ) {
        // the current argument is a subscript argument and the new value is an input argument
        ;(this.value as MirArgument) = [Filter[value as keyof typeof Filter], '']
        this.argument = new Argument(
          this.cache,
          { name: 'by', optional: false, type: MirArgumentType.String },
          ''
        )
      } else if (
        value !== 'custom' &&
        (this.value as [Filter, MirScript])[0] !== Filter['custom']
      ) {
        // the current argument is an input argument and the new value is also an input argument
        ;(this.value as [Filter, MirArgument])[0] = Filter[value as keyof typeof Filter]
      }
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

export function generateBooleanArgumentOptions(): Array<MarkupOption> {
  const markupOptions: Array<MarkupOption> = [
    {
      label: true,
      hierarchicalType: MarkupHierarchicalType.OperatorOption,
      markupType: MarkupType.Option,
      outputType: OutputType.Boolean,
    },
    {
      label: false,
      hierarchicalType: MarkupHierarchicalType.OperatorOption,
      markupType: MarkupType.Option,
      outputType: OutputType.Boolean,
    },
  ]

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
