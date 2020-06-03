import {
  MirRequest,
  MirSource,
  ArgumentInfo,
  MirArgumentType,
  MarkupArgumentType,
  MarkupOption,
  MirOperator,
  OperatorCode,
  MirArgument,
  MirScript,
  MirAggregationTallyScript,
  OutputType,
  MarkupArgument,
  MarkupInput,
  MarkupHierarchicalType,
  MarkupType,
  MarkupSelect,
  Filter,
  Reducer,
  OperatorInfo,
  Type,
  MarkupRequest,
  MarkupSource,
  MarkupScript,
  MarkupOperator,
  OperatorName,
  MirAggregationTallyFilterOperator,
  AggregationTallyFilter,
  AggregationTallyReducer,
  MarkupAggregationTallyScript,
  MarkupArgumentScript,
} from './types'
import {
  Cache,
  operatorInfos,
  markupOptions,
  allMarkupOptions,
  aTFilterMarkupOptions,
  aTReducerMarkupOptions,
  aggregationTallyReducerDescriptions,
  aggregationTallyFilterDescriptions,
} from './structures'
import {
  getEnumNames,
  getOperatorCodeFromOperatorName,
  getMarkupInputTypeFromArgumentType,
} from './utils'

export const DEFAULT_OPERATOR = OperatorCode.ArrayCount
export const DEFAULT_INPUT_TYPE = OutputType.Array
export const DEFAULT_SCRIPT_FIRST_TYPE = OutputType.String

type EventEmitter = {
  emit: Function
}
enum EventName {
  Update,
}
// TODO: remove any
type Event = {
  name: EventName
  data: any
}

export class Radon {
  public cache: Cache

  public timelock: number
  public retrieve: Array<Source>
  public aggregate: AggregationTallyScript
  public tally: AggregationTallyScript

  constructor(radRequest: MirRequest) {
    this.cache = new Cache()
    this.timelock = radRequest.timelock
    this.retrieve = radRequest.retrieve.map((source) => new Source(this.cache, source))
    this.aggregate = new AggregationTallyScript(this.cache, radRequest.aggregate)
    this.tally = new AggregationTallyScript(this.cache, radRequest.tally)
  }

  public getMir(): MirRequest {
    return {
      timelock: this.timelock,
      retrieve: this.retrieve.map((source) => source.getMir()),
      aggregate: this.aggregate.getMir(),
      tally: this.tally.getMir(),
    } as MirRequest
  }

  public getMarkup(): MarkupRequest {
    return {
      timelock: this.timelock,
      retrieve: this.retrieve.map((source) => source.getMarkup()),
      aggregate: this.aggregate.getMarkup(),
      tally: this.tally.getMarkup(),
    }
  }
  public updateSource(sourceIndex: number, args: any) {
    this.retrieve[sourceIndex].update(args)
  }

  public deleteSource(sourceIndex: number) {
    this.retrieve.splice(sourceIndex, 1)
  }

  // TODO: Remove any
  public update(id: number, value: any) {
    ;(this.cache.get(id) as Operator | Argument).update(value)
  }

  public addOperator(scriptId: number) {
    ;(this.cache.get(scriptId) as Script).addOperator()
  }

  public deleteOperator(scriptId: number, operatorId: number) {
    ;(this.cache.get(scriptId) as Script).deleteOperator(operatorId)
  }

  public addSource() {
    this.retrieve.push(
      new Source(this.cache, {
        url: '',
        script: [OperatorCode.StringAsFloat],
        kind: 'HTTP-GET',
        contentType: 'JSON API',
      })
    )
  }
}

export class Source {
  public cache: Cache
  public kind: string
  public url: string
  public contentType: string
  public script: Script
  public id: number

  constructor(cache: Cache, source: MirSource) {
    this.id = cache.insert(this).id
    this.cache = cache
    this.kind = source.kind
    this.url = source.url
    this.contentType = source.contentType
    this.script = new Script(cache, source.script, OutputType.String)
  }

  public update(args: { kind: string; url: string; contentType: string }) {
    const { kind = this.kind, url = this.url, contentType = this.contentType } = args
    this.kind = kind
    this.url = url
    this.contentType = contentType
  }

  public getMir(): MirSource {
    return {
      kind: this.kind,
      url: this.url,
      contentType: this.contentType,
      script: this.script.getMir(),
    } as MirSource
  }

  public getMarkup(): MarkupSource {
    return {
      kind: this.kind,
      url: this.url,
      contentType: this.contentType,
      script: this.script.getMarkup(),
      scriptId: this.script.scriptId,
    }
  }

  public getOutputType(): OutputType {
    return this.script.getOutputType()
  }
}

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
        [AggregationTallyFilter.deviationAbsolute, 1],
        this.scriptId
      )
    )
  }

  // Remove the filter from the filter's list by id
  public deleteOperator(operatorId: number) {
    const operatorIndex = this.findIdx(operatorId)
    this.filters.splice(operatorIndex, 1)
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
      options: aTFilterMarkupOptions,
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
      options: aTReducerMarkupOptions,
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

export class Script {
  public cache: Cache
  public operators: Array<Operator>
  public firstType: OutputType
  public scriptId: number

  constructor(cache: Cache, script: MirScript, firstType: OutputType = DEFAULT_SCRIPT_FIRST_TYPE) {
    this.cache = cache
    this.operators = []
    this.firstType = firstType
    this.scriptId = cache.insert(this).id
    // TODO: Refactor
    script.reduce((acc, item) => {
      let op = new Operator(cache, this.scriptId, acc, item, this.onChildrenEvent())
      this.operators.push(op)

      // If the `outputType` is `same` (a pseudo-type), return the input type
      // so the available methods can be guessed correctly.
      if (op.operatorInfo.outputType === 'same') {
        return acc
      } else {
        return op.operatorInfo.outputType
      }
    }, firstType)
  }

  public addOperator() {
    const lastOutputType = this.getOutputType()
    const type: Type | null = fromOutputTypeToType(lastOutputType)

    if (type) {
      const operator: MirOperator = getDefaultMirOperatorByType(type)
      this.operators.push(
        new Operator(this.cache, this.scriptId, lastOutputType, operator, this.onChildrenEvent())
      )
    } else {
      // TODO: search in operators the type for the regarding types:
      // SubscriptOutput, ReducerOutput, FilterOutput, MatchOutput, Same, Inner
      this.operators.push(
        new Operator(this.cache, this.scriptId, lastOutputType, null, this.onChildrenEvent())
      )
    }
  }

  public findIdx(operatorId: number) {
    return this.operators.findIndex((x) => operatorId === x.id)
  }

  public deleteOperator(operatorId: number) {
    const operatorIndex = this.findIdx(operatorId)
    this.operators.splice(operatorIndex, 1)
    this.validateScript(operatorIndex)
  }

  public getMir(): MirScript {
    return this.operators.map((operator) => operator.getMir())
  }

  public onChildrenEvent() {
    return {
      emit: (e: Event) => {
        if (e.name === EventName.Update) {
          // TODO: create a method in Script to retrieve the index of an operator by operator ID
          const index = this.findIdx(e.data.operator.id)
          this.validateScript(index)
        }
      },
    }
  }

  public getLastOperator(): Operator | null {
    return this.operators.length ? this.operators[this.operators.length - 1] : null
  }

  public getMarkup(): MarkupScript {
    return this.operators.map((operator) => {
      return operator.getMarkup()
    })
  }

  public getOutputType(): OutputType {
    const lastOperator = this.getLastOperator()
    return lastOperator ? lastOperator.operatorInfo.outputType : this.firstType
  }

  public push(operator: MirOperator) {
    this.operators.push(
      new Operator(
        this.cache,
        this.scriptId,
        this.getOutputType(),
        operator,
        this.onChildrenEvent()
      )
    )
  }

  // TODO: Refactor this function to be readable
  public validateScript(index?: number) {
    const removeInvalidOperators = (idx: number) => {
      this.operators.splice(idx)
    }

    if (index && this.operators[index + 1]) {
      if (!areValidConsecutiveOperators(this.operators, index)) {
        removeInvalidOperators(index)
      }
    } else if (!index) {
      index = this.operators.reduce((acc, _operator: Operator, i: number) => {
        return acc > 0 ? acc : areValidConsecutiveOperators(this.operators, i) ? -1 : i
      }, -1)

      if (index > 0) {
        removeInvalidOperators(index)
      }
    }
  }
}

export class Operator {
  public arguments: Array<Argument>
  public cache: Cache
  public code: OperatorCode
  public default: Boolean
  public eventEmitter: EventEmitter
  public id: number
  public inputType: OutputType
  public mirArguments: MirArgument[] | []
  public operatorInfo: OperatorInfo
  public scriptId: number

  constructor(
    cache: Cache,
    scriptId: number,
    inputType: OutputType | null,
    operator: MirOperator | null,
    eventEmitter: EventEmitter
  ) {
    const { code, args } = getMirOperatorInfo(operator || DEFAULT_OPERATOR)
    this.eventEmitter = eventEmitter
    this.id = cache.insert(this).id
    this.default = !operator
    this.cache = cache
    this.code = code
    this.operatorInfo = operatorInfos[code]
    this.mirArguments = args
    this.inputType = inputType || DEFAULT_INPUT_TYPE
    this.arguments = args.map(
      (x, index: number) => new Argument(cache, this.operatorInfo.arguments[index], x)
    )
    this.scriptId = scriptId
  }

  public getMarkup(): MarkupOperator {
    const args = this.arguments.map((argument) => argument.getMarkup())
    return {
      hierarchicalType: MarkupHierarchicalType.Operator,
      id: this.id,
      label: this.operatorInfo.name,
      markupType: MarkupType.Select,
      options: this.default ? allMarkupOptions : markupOptions[this.inputType],
      outputType: this.operatorInfo.outputType,
      scriptId: this.scriptId,
      selected: {
        arguments: args,
        hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
        label: this.operatorInfo.name,
        markupType: MarkupType.Option,
        outputType: this.operatorInfo.outputType,
        description: this.operatorInfo.description(
          this.arguments?.[0]?.value,
          this.arguments?.[1]?.value
        ),
      },
    } as MarkupSelect
  }

  public getMir(): MirOperator {
    return this.operatorInfo.arguments.length
      ? ([this.code, ...this.arguments.map((argument) => argument.getMir())] as MirOperator)
      : this.code
  }

  public update(value: OperatorName | OperatorCode) {
    // check if is updating by operatorCode or OperatorName
    const operatorCode: OperatorCode = (parseInt(value as any)
      ? value
      : getOperatorCodeFromOperatorName(value as OperatorName)) as OperatorCode
    const operatorInfo = operatorInfos[operatorCode]
    const defaultOperatorArguments = operatorInfo.arguments.map((argument: ArgumentInfo) =>
      getDefaultMirArgumentByType(argument.type)
    )
    this.default = false
    this.code = operatorCode
    this.operatorInfo = operatorInfo
    this.mirArguments = defaultOperatorArguments
    this.arguments = defaultOperatorArguments.map(
      (x, index: number) => new Argument(this.cache, this.operatorInfo.arguments[index], x)
    )
    this.eventEmitter.emit({
      name: EventName.Update,
      data: { operator: { id: this.id, scriptId: this.scriptId } },
    })
  }
}

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

function areValidConsecutiveOperators(operators: Array<Operator>, idx: number) {
  if (operators[idx + 1]) {
    const outputType = operators[idx].operatorInfo.outputType
    const label = operators[idx + 1].operatorInfo.name
    const options = markupOptions[outputType]
    return !!options.find((operatorName) => operatorName === label)
  } else {
    return true
  }
}

function getArgumentInfoType(info: ArgumentInfo): MarkupArgumentType {
  if (info.type === MirArgumentType.FilterFunction) {
    return MarkupArgumentType.SelectFilter
  } else if (info.type === MirArgumentType.ReducerFunction) {
    return MarkupArgumentType.SelectReduce
  } else if (info.type === MirArgumentType.Subscript) {
    return MarkupArgumentType.Subscript
  } else {
    return MarkupArgumentType.Input
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

function getMirOperatorInfo(
  operator: MirOperator
): { code: OperatorCode; args: Array<MirArgument> } {
  return Array.isArray(operator)
    ? {
        code: operator[0] as OperatorCode,
        args: operator.slice(1) as Array<MirArgument>,
      }
    : {
        code: operator as OperatorCode,
        args: [],
      }
}

function getDefaultMirArgumentByType(type: MirArgumentType): MirArgument {
  switch (type) {
    case MirArgumentType.Boolean:
      return true
    case MirArgumentType.FilterFunction:
      return [Filter.lessThan, 0]
    case MirArgumentType.Float:
      return 0.0
    case MirArgumentType.Integer:
      return 0
    case MirArgumentType.ReducerFunction:
      return Reducer.averageMean
    case MirArgumentType.String:
      return ''
    case MirArgumentType.Subscript:
      return ''
  }
}

// TODO: Refactor to find the first operator instead of repeat code
function getDefaultMirOperatorByType(type: Type): MirOperator {
  switch (type) {
    case Type.Array:
      return OperatorCode.ArrayCount
    case Type.Boolean:
      return [OperatorCode.BooleanMatch, '', true]
    case Type.Bytes:
      return OperatorCode.BytesAsString
    case Type.Float:
      return OperatorCode.FloatAbsolute
    case Type.Integer:
      return OperatorCode.IntegerAbsolute
    case Type.Map:
      return OperatorCode.MapEntries
    case Type.String:
      return OperatorCode.StringAsBoolean
  }
}

function isArrayType(type: OutputType) {
  return type.startsWith('array')
}

function isBooleanType(type: OutputType) {
  return type === OutputType.Boolean
}

function isBytesType(type: OutputType) {
  return type === OutputType.Bytes
}

function isFloatType(type: OutputType) {
  return type === OutputType.Float
}

function isIntegerType(type: OutputType) {
  return type === OutputType.Integer
}

function isMapType(type: OutputType) {
  return type === OutputType.Map
}

function isStringType(type: OutputType) {
  return type === OutputType.String
}

function fromOutputTypeToType(type: OutputType): Type | null {
  if (isArrayType(type)) {
    return Type.Array
  } else if (isBooleanType(type)) {
    return Type.Boolean
  } else if (isBytesType(type)) {
    return Type.Bytes
  } else if (isFloatType(type)) {
    return Type.Float
  } else if (isIntegerType(type)) {
    return Type.Integer
  } else if (isMapType(type)) {
    return Type.Map
  } else if (isStringType(type)) {
    return Type.String
  } else {
    return null
  }
}
