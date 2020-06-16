import { Event, EventName, MarkupScript, MirOperator, MirScript, OutputType, Type } from './types'
import { Cache } from './structures'
import { Operator } from './operator'
import { DEFAULT_SCRIPT_FIRST_TYPE } from './constants'
import {
  fromOutputTypeToType,
  getDefaultMirOperatorByType,
  areValidConsecutiveOperators,
} from './utils'

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

  public deleteOperator(operatorId: number) {
    const operatorIndex = this.findIdx(operatorId)
    this.operators.splice(operatorIndex, 1)
    this.validateScript(operatorIndex)
  }

  public findIdx(operatorId: number) {
    return this.operators.findIndex((x) => operatorId === x.id)
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
    const lastOperator = this.getLastOperator()
    return lastOperator ? lastOperator.operatorInfo.outputType : this.firstType
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
