import {
  ArgumentInfo,
  EventEmitter,
  EventName,
  MarkupHierarchicalType,
  MarkupOperator,
  MarkupSelect,
  MarkupType,
  MirArgument,
  MirOperator,
  OperatorCode,
  OperatorInfo,
  OutputType,
  MirArgumentType,
  Filter,
} from './types.js'
import { operatorInfos, markupOptions, allMarkupOptions } from './structures.js'
import { getDefaultMirArgumentByType, getMirOperatorInfo } from './utils.js'
import { Argument } from './argument.js'
import { DEFAULT_OPERATOR, DEFAULT_INPUT_TYPE } from './constants.js'
import { MirScript, Context } from './types.js'

export class Operator {
  public arguments: Array<Argument>
  public context: Context
  public code: OperatorCode
  public default: Boolean
  public eventEmitter: EventEmitter
  public id: number
  public inputType: OutputType
  public mirArguments: MirArgument[]
  public operatorInfo: OperatorInfo
  public scriptId: number

  constructor(
    context: Context,
    scriptId: number,
    inputType: OutputType | null,
    operator: MirOperator | null,
    eventEmitter: EventEmitter
  ) {
    const { code, args } = getMirOperatorInfo(operator || DEFAULT_OPERATOR)
    this.eventEmitter = eventEmitter
    this.id = context.cache.insert(this).id
    this.default = !operator
    this.context = context
    this.code = code
    this.operatorInfo = operatorInfos[code]
    this.mirArguments = args
    this.inputType = inputType || DEFAULT_INPUT_TYPE
    if (code === OperatorCode.ArrayFilter && Array.isArray(args[0])) {
      // is array filter operator and contains subscript
      const filterArgumentInfo: ArgumentInfo = {
        name: 'function',
        optional: false,
        type: MirArgumentType.FilterFunction,
      }
      this.arguments = [
        new Argument(context, filterArgumentInfo, [Filter.custom, args[0] as MirScript]),
      ]
    } else {
      this.arguments = args.map(
        (x, index: number) => new Argument(context, this.operatorInfo.arguments[index], x)
      )
    }
    this.scriptId = scriptId
  }

  public getJs(): string {
    const operatorName = this.operatorInfo.name
    const args = this.arguments.map((arg: Argument) => arg.getJs()).join(',')

    return `.${operatorName}(${args})`
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
        description: this.operatorInfo.description(this.context.i18n)(
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

  public update(value: keyof typeof OperatorCode | OperatorCode) {
    const operatorCode: OperatorCode =
      typeof value === 'number'
        ? value
        : // Use operatorCode as reverse mapping
          OperatorCode[value]
    const operatorInfo = operatorInfos[operatorCode]
    const defaultOperatorArguments = operatorInfo.arguments.map((argument: ArgumentInfo) =>
      getDefaultMirArgumentByType(argument.type)
    )
    this.default = false
    this.code = operatorCode
    this.operatorInfo = operatorInfo
    this.mirArguments = defaultOperatorArguments
    this.arguments = defaultOperatorArguments.map((x, index: number) => {
      return new Argument(this.context, this.operatorInfo.arguments[index], x)
    })
    this.eventEmitter.emit({
      name: EventName.Update,
      data: { operator: { id: this.id, scriptId: this.scriptId } },
    })
  }
}
