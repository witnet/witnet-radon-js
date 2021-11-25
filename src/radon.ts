import { MirRequest, OperatorCode, MarkupRequest, Context, Kind } from './types'
import { KIND_OPTIONS, DEFAULT_KIND_OPTION, CONTENT_TYPE_OPTIONS } from './constants'
import { Cache } from './structures'
import { Source } from './source'
import { AggregationTallyScript } from './aggregationTallyScript'
import { Script } from './script'
import { Operator } from './operator'
import { Argument } from './argument'
import { formatJs } from './utils'
import { I18n, Locale } from './i18n'

export class Radon {
  public timelock: number
  public retrieve: Array<Source>
  public aggregate: AggregationTallyScript
  public tally: AggregationTallyScript
  private _sourceType: Kind
  public get sourceType() {
    return this._sourceType;
  }
  public set sourceType(kind: Kind) {
    this._sourceType = kind;
  }
  public context: Context

  constructor(radRequest: MirRequest, locale?: Locale) {
    this.context = { cache: new Cache(), i18n: new I18n(locale) }
    this.timelock = radRequest.timelock
    this._sourceType =  radRequest.retrieve.find((source) => source.kind === Kind.RNG) ? Kind.RNG : Kind.HttpGet
    this.retrieve = radRequest.retrieve.map((source) => new Source(this.context, source, this.sourceType, this.onChildrenEvent()))
    this.aggregate = new AggregationTallyScript(this.context, radRequest.aggregate, this.sourceType)
    this.tally = new AggregationTallyScript(this.context, radRequest.tally, this.sourceType)
  }

  public setLocale(locale: Locale) {
    this.context.i18n.setLocale(locale)
  }

  public addOperator(scriptId: number) {
    ;(this.context.cache.get(scriptId) as Script).addOperator()
  }

  public onChildrenEvent() {
    return {
      emit: (e: { sourceType: Kind }) => {
        this.sourceType = e.sourceType
        this.retrieve.forEach(source => source.updateSourceType(this.sourceType))
        this.aggregate.updateSourceType(this.sourceType)
        this.tally.updateSourceType(this.sourceType)
        this.retrieve
      },
    }
  }

  public addSource() {
    this.retrieve.push(
      new Source(this.context, {
        url: '',
        script: [OperatorCode.StringAsFloat],
        kind: DEFAULT_KIND_OPTION,
        kindOptions: KIND_OPTIONS,
        contentTypeOptions: CONTENT_TYPE_OPTIONS,
        contentType: 'JSON API',
      }, this.sourceType, this.onChildrenEvent())
    )
  }

  public deleteOperator(scriptId: number, operatorId: number) {
    ;(this.context.cache.get(scriptId) as Script).deleteOperator(operatorId)
  }

  public deleteSource(sourceIndex: number) {
    this.retrieve.splice(sourceIndex, 1)
  }

  public getJs(): string {
    const sourcesDeclaration = this.retrieve
      .map((source, index) => `${source.getJs(index)}`)
      .join('\n')
    const aggregatorDeclaration = this.aggregate.getJs('aggregator')
    const tallyDeclaration = this.tally.getJs('tally')

    const addSources = this.retrieve
      .map((_, index) => '.addSource(source_' + index + ')\n')
      .join('')

    const js = `import * as Witnet from "witnet-requests"

                const request = new Witnet.Request()

                ${sourcesDeclaration}

                ${aggregatorDeclaration}

                ${tallyDeclaration}

                const request = new Witnet.Request()
                  ${addSources}
                  .setAggregator(aggregator) // Set the aggregator function
                  .setTally(tally) // Set the tally function
                  .setQuorum(4, 70) // Set witness count
                  .setFees(10, 1, 1, 1) // Set economic incentives
                  .schedule(0) // Make this request immediately solvable

                export { request as default }`

    return formatJs(js)
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
    ;(this.context.cache.get(id) as Operator | Argument).update(value)
  }

  public updateSource(sourceIndex: number, args: any) {
    this.retrieve[sourceIndex].update(args)
  }
}
