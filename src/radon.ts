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
} from './types'
import { Cache, operatorInfos, markupOptions, allMarkupOptions } from './structures'
import { getEnumNames, getOperatorCodeFromOperatorName } from './utils'

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
  public aggregate: Script
  public tally: Script

  constructor(radRequest: MirRequest) {
    this.cache = new Cache()
    this.timelock = radRequest.timelock
    this.retrieve = radRequest.retrieve.map(source => new Source(this.cache, source))
    // TODO: Refactor first outputType
    this.aggregate = new Script(this.cache, radRequest.aggregate, OutputType.Array)
    this.tally = new Script(this.cache, radRequest.tally, this.aggregate.getOutputType())
  }

  public getMir(): MirRequest {
    return {
      timelock: this.timelock,
      retrieve: this.retrieve.map(source => source.getMir()),
      aggregate: this.aggregate.getMir(),
      tally: this.tally.getMir(),
    } as MirRequest
  }

  public getMarkup(): MarkupRequest {
    return {
      timelock: this.timelock,
      retrieve: this.retrieve.map(source => source.getMarkup()),
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

  public addSource() {
    this.retrieve.push(
      new Source(this.cache, { url: '', script: [OperatorCode.StringAsFloat], kind: 'HTTP_GET' })
    )
  }
}

export class Source {
  public cache: Cache
  public kind: string
  public url: string
  public script: Script
  public id: number

  constructor(cache: Cache, source: MirSource) {
    this.id = cache.insert(this).id
    this.cache = cache
    this.kind = source.kind
    this.url = source.url
    this.script = new Script(cache, source.script, OutputType.String)
  }

  public update(args: { kind: string; url: string }) {
    const { kind = this.kind, url = this.url } = args
    this.kind = kind
    this.url = url
  }

  public getMir(): MirSource {
    return {
      kind: this.kind,
      url: this.url,
      script: this.script.getMir(),
    } as MirSource
  }

  public getMarkup(): MarkupSource {
    return {
      kind: this.kind,
      url: this.url,
      script: this.script.getMarkup(),
    }
  }

  public getOutputType(): OutputType {
    return this.script.getOutputType()
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
      return op.operatorInfo.outputType
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

  public getMir(): MirScript {
    return this.operators.map(operator => operator.getMir())
  }

  public onChildrenEvent() {
    return {
      emit: (e: Event) => {
        if (e.name === EventName.Update) {
          this.validateScript(e.data.index)
        }
      },
    }
  }

  public getLastOperator(): Operator | null {
    return this.operators.length ? this.operators[this.operators.length - 1] : null
  }

  public getMarkup(): MarkupScript {
    const markup = this.operators.map(operator => {
      return operator.getMarkup()
    })

    // this.cache.set(this.scriptId, markup.map(operator => operator.id))

    return markup
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
    const args = this.arguments.map(argument => argument.getMarkup())
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
      },
    } as MarkupSelect
  }

  public getMir(): MirOperator {
    return this.operatorInfo.arguments.length
      ? ([this.code, ...this.arguments.map(argument => argument.getMir())] as MirOperator)
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
    this.eventEmitter.emit(EventName.Update)
  }
}

export class Argument {
  public argument: Argument | null
  public argumentInfo: ArgumentInfo
  public argumentType: MarkupArgumentType
  public cache: Cache
  public id: number
  public value: MirArgument | undefined

  constructor(cache: Cache, argumentInfo: ArgumentInfo, argument?: MirArgument) {
    this.argumentType = getArgumentInfoType(argumentInfo)
    this.id = cache.insert(this).id
    this.argumentInfo = argumentInfo
    this.cache = cache
    this.value = argument
    this.argument = Array.isArray(argument)
      ? new Argument(
          this.cache,
          { name: 'by', optional: false, type: MirArgumentType.String },
          argument[1]
        )
      : null
  }

  public getMarkup(): MarkupArgument {
    if (this.argumentType === MarkupArgumentType.Input) {
      // TODO: Refactor this ugly code
      return {
        hierarchicalType: MarkupHierarchicalType.Argument,
        id: this.id,
        label: this.argumentInfo.name,
        markupType: MarkupType.Input,
        value: this.value as (string | number | boolean),
      } as MarkupInput
    } else if (this.argumentType === MarkupArgumentType.SelectFilter) {
      const args = this.argument ? [this.argument.getMarkup()] : []
      // TODO: Refactor this ugly code
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
      // } else if (argumentType === MarkupArgumentType.SelectReduce) {
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
    } else {
      return this.value as MirArgument
    }
  }

  public update(value: string | number | boolean | Filter) {
    if (this.argumentType === MarkupArgumentType.SelectFilter) {
      ;(this.value as [Filter, number] | [Filter, string] | [Filter, boolean])[0] = value as Filter
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
    return !options.find(operatorName => operatorName === label)
  } else {
    return true
  }
}

function getArgumentInfoType(info: ArgumentInfo): MarkupArgumentType {
  if (info.type === MirArgumentType.FilterFunction) {
    return MarkupArgumentType.SelectFilter
  } else if (info.type === MirArgumentType.ReducerFunction) {
    return MarkupArgumentType.SelectReduce
  } else {
    return MarkupArgumentType.Input
  }
}

export function generateFilterArgumentOptions(): Array<MarkupOption> {
  const markupOptions: Array<MarkupOption> = getEnumNames(Filter).map(name => {
    return {
      label: name,
      hierarchicalType: MarkupHierarchicalType.OperatorOption,
      markupType: MarkupType.Option,
      // TODO: Add support for pseudotypes
      outputType: OutputType.FilterOutput,
    }
  })
  return markupOptions
}

export function generateReducerArgumentOptions(): Array<MarkupOption> {
  const markupOptions: Array<MarkupOption> = getEnumNames(Reducer).map(name => {
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
      return [Filter.LessThan, 0]
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
