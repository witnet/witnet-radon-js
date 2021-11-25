import { MarkupSource, MirSource, OutputType, Context, KindOptions, Kind, EventEmitter, ContentTypeOptions } from './types'
import { KIND_OPTIONS, CONTENT_TYPE_OPTIONS } from './constants'
import { Cache } from './structures'
import { Script } from './script'
import { I18n } from './i18n'

export class Source {
  public kind: Kind
  public kindOptions: KindOptions
  public url: string
  public contentType: string
  public contentTypeOptions: ContentTypeOptions
  public script: Script
  public id: number
  public context: Context
  public eventEmitter: EventEmitter

  constructor(context: { cache: Cache; i18n: I18n }, source: MirSource, sourceType: Kind, eventEmitter: EventEmitter) {
    this.id = context.cache.insert(this).id
    this.kind = sourceType
    this.kindOptions = KIND_OPTIONS
    this.contentTypeOptions = CONTENT_TYPE_OPTIONS
    this.url = sourceType === Kind.RNG ? '' : (source.url || '')
    this.contentType = CONTENT_TYPE_OPTIONS[sourceType]
    this.script = new Script(context, source.script, this.kind, this.kind === Kind.RNG ? OutputType.Bytes : OutputType.String)
    this.context = context
    this.eventEmitter = eventEmitter
  }

  public getJs(index: number): string {
    const script = this.script.getJs()
    return `const source_${index} = new Witnet.Source("${this.url}")
        ${script}`
  }

  public getMir(): MirSource {
    return {
      kind: this.kind,
      kindOptions: this.kindOptions,
      url: this.url,
      contentType: this.contentType,
      contentTypeOptions: this.contentTypeOptions,
      script: this.script.getMir(),
    } as MirSource
  }

  public getMarkup(): MarkupSource {
    return {
      kind: this.kind,
      kindOptions: this.kindOptions,
      contentTypeOptions: this.contentTypeOptions,
      url: this.url,
      contentType: this.contentType,
      script: this.script.getMarkup(),
      scriptId: this.script.scriptId,
    }
  }

  public getOutputType(): OutputType {
    return this.script.getOutputType()
  }

  public updateSourceType(sourceType: Kind) {
    this.kind = sourceType
    this.contentType = CONTENT_TYPE_OPTIONS[sourceType]
    this.script.updateSourceType(sourceType)
    if (this.kind === Kind.RNG) {
      this.url = ''
    }
  }

  public update(args: { kind: Kind; url: string; contentType: string }) {
    const { kind = this.kind, url = this.url, contentType = this.contentType } = args
    this.kind = kind
    this.kindOptions = this.kindOptions
    this.url = url
    this.contentType = contentType
    this.eventEmitter.emit({ sourceType: this.kind })
  }
}
