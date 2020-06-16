import { MirRequest, OperatorCode, MarkupRequest } from './types'
import { Cache } from './structures'
import { Source } from './source'
import { AggregationTallyScript } from './aggregationTallyScript'
import { Script } from './script'
import { Operator } from './operator'
import { Argument } from './argument'

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

  public addOperator(scriptId: number) {
    ;(this.cache.get(scriptId) as Script).addOperator()
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

  public deleteOperator(scriptId: number, operatorId: number) {
    ;(this.cache.get(scriptId) as Script).deleteOperator(operatorId)
  }

  public deleteSource(sourceIndex: number) {
    this.retrieve.splice(sourceIndex, 1)
  }

  public getMarkup(): MarkupRequest {
    return {
      timelock: this.timelock,
      retrieve: this.retrieve.map((source) => source.getMarkup()),
      aggregate: this.aggregate.getMarkup(),
      tally: this.tally.getMarkup(),
    }
  }

  public getMir(): MirRequest {
    return {
      timelock: this.timelock,
      retrieve: this.retrieve.map((source) => source.getMir()),
      aggregate: this.aggregate.getMir(),
      tally: this.tally.getMir(),
    } as MirRequest
  }

  // TODO: Remove any
  public update(id: number, value: any) {
    ;(this.cache.get(id) as Operator | Argument).update(value)
  }

  public updateSource(sourceIndex: number, args: any) {
    this.retrieve[sourceIndex].update(args)
  }
}
