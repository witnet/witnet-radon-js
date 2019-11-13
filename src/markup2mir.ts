import { typeSystem, operatorInfos } from './structures'
import {
  ArgumentInfo,
  ArrayOperatorName,
  BooleanOperatorName,
  BytesOperatorName,
  Filter,
  FloatOperatorName,
  IntegerOperatorName,
  MapOperatorName,
  Markup,
  MarkupArgument,
  MarkupInput,
  MarkupOperator,
  MarkupScript,
  MarkupSource,
  MarkupType,
  Mir,
  MirArgument,
  MirArgumentKind,
  MirOperator,
  MirRequest,
  MirScript,
  MirSource,
  OperatorCode,
  OperatorInfo,
  OperatorName,
  Reducer,
  ResultOperatorName,
  StringOperatorName,
  Type,
} from './types'
import { areSoftEqualArrays, getEnumValues } from './utils'

export function markup2mir(markup: Markup): Mir {
  const retrieve: Array<MirSource> = generateMirSources(markup.radRequest.retrieve)
  const aggregate: MirScript = generateMirScript(markup.radRequest.aggregate)
  const tally: MirScript = generateMirScript(markup.radRequest.tally)

  const radRequest: MirRequest = {
    notBefore: markup.radRequest.notBefore,
    retrieve,
    aggregate,
    tally,
  }
  const mir: Mir = {
    description: markup.description,
    name: markup.name,
    radRequest: radRequest,
  }

  return mir
}

export function generateMirSources(markupSources: Array<MarkupSource>): Array<MirSource> {
  const mirSources: Array<MirSource> = markupSources.map((source: MarkupSource) => {
    return {
      script: generateMirScript(source.script),
      url: source.url,
    } as MirSource
  })

  return mirSources
}

export function generateMirScript(markupScript: MarkupScript): MirScript {
  const mirScript: MirScript = markupScript.map((operator: MarkupOperator) => {
    const operatorCode: OperatorCode = findOperatorCode(
      operator.selected.label as OperatorName,
      operator.options.map(option => option.label)
    )
    const args: Array<MirArgument> | null = generateMirArguments(operator, operatorCode)
    const mirOperator: MirOperator = generateMirOperator(operatorCode, args)

    return mirOperator
  })

  return mirScript
}

export function generateMirOperator(
  operatorCode: OperatorCode,
  args: Array<MirArgument> | null
): MirOperator {
  if (args) {
    if (args.length === 1) {
      return [operatorCode, args[0]]
    } else {
      return [operatorCode, args[0], args[1]]
    }
  } else {
    return operatorCode
  }
}

// TODO: Add support for subscripts
export function generateMirArguments(
  operator: MarkupOperator,
  operatorCode: OperatorCode
): Array<MirArgument> | null {
  const markupArguments: Array<MarkupArgument> = operator.selected.arguments

  const operatorInfo: OperatorInfo = operatorInfos[operatorCode]
  const args: Array<MirArgument> | null = markupArguments.length
    ? (markupArguments.map((argument, i) =>
        generateMirArgument(argument, operatorInfo.arguments[i])
      ) as Array<MirArgument>)
    : null

  return args as Array<MirArgument> | null
}

export function generateMirArgument(
  argument: MarkupArgument,
  argumentInfo: ArgumentInfo
): MirArgument {
  switch (argument.markupType) {
    case MarkupType.Input:
      // It is assuming that if the argumentInfo specify a type, the value has that type
      return argument.value
    case MarkupType.Select:
      if (argumentInfo.type === MirArgumentKind.Filter) {
        const filterCode = getFilterCode((argument.selected.label as unknown) as Filter)
        const value = (argument.selected.arguments[0] as MarkupInput).value
        return [filterCode, value as number] as MirArgument
        // It is MirArgumentKind.Reducer
      } else {
        const reducerCode = getReducerCode((argument.selected.label as unknown) as Reducer)
        return reducerCode as MirArgument
      }
  }
}

export function getFilterCode(name: Filter): Filter {
  return (Filter[name] as unknown) as Filter
}

export function getReducerCode(name: Reducer): Reducer {
  return (Reducer[name] as unknown) as Reducer
}

// TODO: refactor into a map
export function findOperatorCode(name: OperatorName, optionNames: Array<string>): OperatorCode {
  if (areSoftEqualArrays(optionNames, getEnumValues(BooleanOperatorName))) {
    const operatorCode: OperatorCode = typeSystem[Type.Boolean][name as BooleanOperatorName][0]
    return operatorCode
  } else if (areSoftEqualArrays(optionNames, getEnumValues(IntegerOperatorName))) {
    const operatorCode: OperatorCode = typeSystem[Type.Integer][name as IntegerOperatorName][0]
    return operatorCode
  } else if (areSoftEqualArrays(optionNames, getEnumValues(FloatOperatorName))) {
    const operatorCode: OperatorCode = typeSystem[Type.Float][name as FloatOperatorName][0]
    return operatorCode
  } else if (areSoftEqualArrays(optionNames, getEnumValues(StringOperatorName))) {
    const operatorCode: OperatorCode = typeSystem[Type.String][name as StringOperatorName][0]
    return operatorCode
  } else if (areSoftEqualArrays(optionNames, getEnumValues(ArrayOperatorName))) {
    const operatorCode: OperatorCode = typeSystem[Type.Array][name as ArrayOperatorName][0]
    return operatorCode
  } else if (areSoftEqualArrays(optionNames, getEnumValues(MapOperatorName))) {
    const operatorCode: OperatorCode = typeSystem[Type.Map][name as MapOperatorName][0]
    return operatorCode
  } else if (areSoftEqualArrays(optionNames, getEnumValues(BytesOperatorName))) {
    const operatorCode: OperatorCode = typeSystem[Type.Bytes][name as BytesOperatorName][0]
    return operatorCode
  } else {
    // It is Result type
    const operatorCode: OperatorCode = typeSystem[Type.Result][name as ResultOperatorName][0]
    return operatorCode
  }
}
