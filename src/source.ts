import {
  MarkupSource,
  MirSource,
  OutputType,
  Context,
  KindOptions,
  Kind,
  EventEmitter,
  ContentTypeOptions,
} from './types.js'
import { KIND_OPTIONS, CONTENT_TYPE_OPTIONS } from './constants.js'
import { Cache } from './structures.js'
import { Script } from './script.js'
import { I18n } from './i18n.js'
import { OutgoingHttpHeaders } from 'http'

export class Source {
  public kind: Kind
  public kindOptions: KindOptions
  public url: string
  public contentType: string
  public contentTypeOptions: ContentTypeOptions
  public headers: OutgoingHttpHeaders
  public body?: object
  public script: Script
  public id: number
  public context: Context
  public eventEmitter: EventEmitter

  constructor(
    context: { cache: Cache; i18n: I18n },
    source: MirSource,
    eventEmitter: EventEmitter
  ) {
    this.id = context.cache.insert(this).id
    this.kind = source.kind
    this.kindOptions = KIND_OPTIONS
    this.contentTypeOptions = CONTENT_TYPE_OPTIONS
    this.url = this.kind === Kind.RNG ? '' : source.url || ''
    this.contentType = CONTENT_TYPE_OPTIONS[this.kind]
    this.headers = source.headers
    this.body = source.body
    this.script = new Script(
      context,
      source.script,
      this.kind,
      this.kind === Kind.RNG ? OutputType.Bytes : OutputType.String
    )
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
      headers: this.headers,
      ...(this.body && { body: this.body }),
    }
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
      headers: this.headers,
      ...(this.body && { body: this.body }),
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

  public update(args: {
    kind: Kind
    url: string
    contentType: string
    headers?: OutgoingHttpHeaders
    body?: object
  }) {
    const {
      kind = this.kind,
      url = this.url,
      contentType = this.contentType,
      body = this.body,
      headers = this.headers,
    } = args
    this.kind = kind
    this.kindOptions = this.kindOptions
    this.url = url
    this.contentType = contentType
    this.body = body
    this.headers = headers
    this.eventEmitter.emit({ sourceType: this.kind })
  }
}
