import {
  Event,
  EventName,
  MarkupScript,
  MirOperator,
  MirScript,
  OutputType,
  Type,
  Context,
  Kind,
} from './types.js'
import { Operator } from './operator.js'
import { DEFAULT_SCRIPT_FIRST_TYPE } from './constants.js'
import {
  fromOutputTypeToType,
  getDefaultMirOperatorByType,
  areValidConsecutiveOperators,
} from './utils.js'

export class Script {
  public context: Context
  public operators: Array<Operator>
  public firstType: OutputType
  public scriptId: number
  public sourceType: Kind

  constructor(
    context: Context,
    script: MirScript,
    sourceType: Kind,
    firstType: OutputType = sourceType === Kind.RNG ? OutputType.Bytes : DEFAULT_SCRIPT_FIRST_TYPE
  ) {
    this.context = context
    this.operators = []
    this.firstType = firstType
    this.scriptId = context.cache.insert(this).id
    this.sourceType = sourceType
    // TODO: Refactor
    script.reduce((acc, item) => {
      let op = new Operator(context, this.scriptId, acc, item, this.onChildrenEvent())
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
    if (this.sourceType !== Kind.RNG) {
      const operator: MirOperator | null = type ? getDefaultMirOperatorByType(type) : null
      this.operators.push(
        new Operator(this.context, this.scriptId, lastOutputType, operator, this.onChildrenEvent())
      )
    }
  }

  public deleteOperator(operatorId: number) {
    const operatorIndex = this.findIdx(operatorId)
    this.operators.splice(operatorIndex, 1)
    this.validateScript(operatorIndex)
  }

  public findIdx(operatorId: number) {
    return this.operators.findIndex((x) => operatorId === x.id)
  }

  public getJs(): string {
    const operators = this.operators.map((operator) => operator.getJs()).join('\n')

    return operators
  }

  public getLastOperator(): Operator | null {
    return this.operators.length ? this.operators[this.operators.length - 1] : null
  }

  public getMarkup(): MarkupScript {
    return this.operators.map((operator) => {
      return operator.getMarkup()
    })
  }

  public getMir(): MirScript {
    return this.operators.map((operator) => operator.getMir())
  }

  public getOutputType(): OutputType {
    if (this.sourceType === Kind.RNG) {
      return OutputType.Bytes
    } else if (this.getLastOperator()) {
      return this.operators.reduce((acc, operator) => {
        let outputType = operator.operatorInfo.outputType
        return outputType === OutputType.Same ? acc : outputType
      }, this.firstType)
    } else {
      return this.firstType
    }
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

  public push(operator: MirOperator) {
    if (this.sourceType !== Kind.RNG) {
      this.operators.push(
        new Operator(
          this.context,
          this.scriptId,
          this.getOutputType(),
          operator,
          this.onChildrenEvent()
        )
      )
    }
  }

  public updateSourceType(sourceType: Kind) {
    this.sourceType = sourceType
    if (this.sourceType === Kind.RNG) {
      this.operators = []
    }
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
