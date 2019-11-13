import { operatorInfos, typeSystem } from './structures'
import {
  Reducer,
  Filter,
  OutputType,
  MarkupHierarchicalType,
  MarkupOption,
  MarkupSelectedOption,
  MarkupInput,
  MarkupSelect,
  MarkupType,
  MarkupOperator,
  MarkupSource,
  MarkupScript,
  MarkupRequest,
  Markup,
  OperatorCode,
  MirArgumentKind,
  MirArgument,
  MirOperator,
  MirScript,
  MirSource,
  Mir,
  GeneratedMarkupScript,
  OperatorInfo,
  TypeSystemEntry,
  TypeSystemValue,
  FilterArgument,
} from './types'
import { getEnumNames } from './utils'

export function mir2markup(mir: Mir): Markup {
  let cache = {}

  const aggregateScript: MarkupScript = generateMarkupScript(mir.radRequest.aggregate, cache).script
  const tallyScript: MarkupScript = generateMarkupScript(mir.radRequest.tally, cache).script
  const radRequest: MarkupRequest = {
    notBefore: mir.radRequest.notBefore,
    retrieve: mir.radRequest.retrieve.map((source: MirSource) => {
      let generatedMarkupScript: GeneratedMarkupScript = generateMarkupScript(source.script, cache)
      return {
        url: source.url,
        script: generatedMarkupScript.script,
      } as MarkupSource
    }),
    aggregate: aggregateScript,
    tally: tallyScript,
  }

  return {
    name: mir.name,
    description: mir.description,
    radRequest,
  }
}

export function generateMarkupScript(script: MirScript, cache: any): GeneratedMarkupScript {
  const markupScript: MarkupScript = script.map((operator: MirOperator) => {
    return generateMarkupOperator(operator)
  })

  return { cache, script: markupScript }
}

export function generateMarkupOperator(operator: MirOperator): MarkupOperator {
  const { code, args } = getMirOperatorInfo(operator)
  const operatorInfo: OperatorInfo = operatorInfos[code]
  const outputType = findOutputType(code)

  const markupOperator: MarkupSelect = {
    id: 0,
    scriptId: 0,
    markupType: MarkupType.Select,
    hierarchicalType: MarkupHierarchicalType.Operator,
    outputType,
    selected: generateSelectedOption(operatorInfo, code, args),
    options: generateMarkupOptions(operatorInfo, code, args),
  }

  return markupOperator
}

export function generateMarkupOptions(
  operatorInfo: OperatorInfo,
  _code: OperatorCode,
  _args: Array<MirArgument> | null
): Array<MarkupOption> {
  const markupOptions: Array<MarkupOption> = Object.entries(typeSystem[operatorInfo.type]).map(
    (x: TypeSystemValue) => {
      return {
        hierarchicalType: MarkupHierarchicalType.OperatorOption,
        label: x[0],
        markupType: MarkupType.Option,
        // TODO: Add support for Pseudotypes
        outputType: x[1][1].length > 1 ? x[1][1] : x[1][1][0],
      }
    }
  )

  return markupOptions
}

export function generateSelectedOption(
  operatorInfo: OperatorInfo,
  code: OperatorCode,
  args: Array<MirArgument> | null
): MarkupSelectedOption {
  const outputType = findOutputType(code)
  const markupSelectedOption: MarkupSelectedOption = {
    arguments: args ? generateOperatorArguments(operatorInfo, args) : [],
    hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
    label: operatorInfo.name,
    markupType: MarkupType.Option,
    // TODO: Add support for pseudotypes
    outputType: outputType,
  }

  return markupSelectedOption
}

export function generateOperatorArguments(
  operatorInfo: OperatorInfo,
  args: Array<MirArgument>
): Array<MarkupInput | MarkupSelect> {
  const operatorArguments: Array<MarkupInput | MarkupSelect> = args.map(
    (argument: MirArgument, index: number) => {
      let argumentInfo = operatorInfo.arguments[index]
      switch (argumentInfo.type) {
        // TODO: Add support for pseudotypes
        case MirArgumentKind.Array:
        case MirArgumentKind.Boolean:
        case MirArgumentKind.Bytes:
        case MirArgumentKind.Mapper:
        case MirArgumentKind.Passthrough:
        case MirArgumentKind.Result:
        case MirArgumentKind.Float:
        case MirArgumentKind.Inner:
        case MirArgumentKind.Integer:
        case MirArgumentKind.Map:
        case MirArgumentKind.String:
          return {
            hierarchicalType: MarkupHierarchicalType.Argument,
            id: 0,
            label: argumentInfo.name,
            markupType: MarkupType.Input,
            type: argumentInfo.type,
            value: argument,
          } as MarkupInput
        case MirArgumentKind.Filter:
          return {
            hierarchicalType: MarkupHierarchicalType.Argument,
            id: 0,
            markupType: MarkupType.Select,
            options: generateFilterArgumentOptions(),
            scriptId: 0,
            label: argumentInfo.name,
            selected: generateSelectedFilterArgument(argument as FilterArgument),
          } as MarkupSelect
        case MirArgumentKind.Reducer:
          return {
            hierarchicalType: MarkupHierarchicalType.Argument,
            id: 0,
            markupType: MarkupType.Select,
            options: generateReducerArgumentOptions(),
            outputType: OutputType.Integer,
            scriptId: 0,
            label: argumentInfo.name,
            selected: generateSelectedReducerArgument(argument as Reducer),
          } as MarkupSelect
      }
    }
  )
  return operatorArguments
}

// TODO: Call this function just at the beginning
export function generateFilterArgumentOptions(): Array<MarkupOption> {
  const markupOptions: Array<MarkupOption> = getEnumNames(Filter).map(name => {
    return {
      label: name,
      hierarchicalType: MarkupHierarchicalType.OperatorOption,
      markupType: MarkupType.Option,
      // TODO: Add support for pseudotypes
      outputType: OutputType.Bytes,
    }
  })
  return markupOptions
}

// TODO: Call this function just at the beginning
export function generateReducerArgumentOptions(): Array<MarkupOption> {
  const markupOptions: Array<MarkupOption> = getEnumNames(Reducer).map(name => {
    return {
      label: name,
      hierarchicalType: MarkupHierarchicalType.OperatorOption,
      markupType: MarkupType.Option,
      outputType: OutputType.Bytes,
    }
  })
  return markupOptions
}

export function generateSelectedFilterArgument(
  filterArgument: FilterArgument
): MarkupSelectedOption {
  const filter: Filter = filterArgument[0]
  const argument = filterArgument[1]
  const selectedArgument: MarkupSelectedOption = {
    arguments: [
      {
        hierarchicalType: MarkupHierarchicalType.Argument,
        id: 0,
        label: 'by',
        markupType: MarkupType.Input,
        value: argument,
      } as MarkupInput,
    ],
    label: Filter[filter],
    hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
    markupType: MarkupType.Option,
    outputType: OutputType.Bytes,
  }
  return selectedArgument
}

export function generateSelectedReducerArgument(reducer: Reducer): MarkupSelectedOption {
  const selectedArgument: MarkupSelectedOption = {
    arguments: [],
    label: Reducer[reducer],
    hierarchicalType: MarkupHierarchicalType.SelectedOperatorOption,
    markupType: MarkupType.Option,
    outputType: OutputType.Bytes,
  }
  return selectedArgument
}

export function findOutputType(code: OperatorCode): OutputType | Array<OutputType> {
  const entry: TypeSystemEntry = Object.entries(typeSystem).find(entry => {
    return Object.values(entry[1]).find(x => x[0] === code)
  }) as TypeSystemEntry
  const operatorEntry: [OperatorCode, OutputType[]] = Object.values(entry[1]).find(
    x => x[0] === code
  ) as [OperatorCode, OutputType[]]
  const outputType: Array<OutputType> = operatorEntry[1] as Array<OutputType>
  return outputType.length > 1 ? outputType : outputType[0]
}

export function getMirOperatorInfo(
  operator: MirOperator
): { code: OperatorCode; args: Array<MirArgument> | null } {
  return Array.isArray(operator)
    ? {
        code: operator[0] as OperatorCode,
        args: operator.slice(1) as Array<MirArgument>,
      }
    : {
        code: operator as OperatorCode,
        args: null,
      }
}
