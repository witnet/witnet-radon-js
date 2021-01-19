import { MarkupSource, MirSource, OutputType, Context } from './types'
import { Cache } from './structures'
import { Script } from './script'
import { I18n } from './i18n'

export class Source {
  public kind: string
  public url: string
  public contentType: string
  public script: Script
  public id: number
  public context: Context

  constructor(context: { cache: Cache; i18n: I18n }, source: MirSource) {
    this.id = context.cache.insert(this).id
    this.kind = source.kind || 'HTTP-GET'
    this.url = source.url || ''
    this.contentType = source.contentType || 'JSON API'
    this.script = new Script(context, source.script, OutputType.String)
    this.context = context
  }

  public getJs(index: number): string {
    const script = this.script.getJs()
    return `const source_${index} = new Witnet.Source("${this.url}")
        ${script}`
  }

  public getMir(): MirSource {
    return {
      kind: this.kind,
      url: this.url,
      contentType: this.contentType,
      script: this.script.getMir(),
    } as MirSource
  }

  public getMarkup(): MarkupSource {
    return {
      kind: this.kind,
      url: this.url,
      contentType: this.contentType,
      script: this.script.getMarkup(),
      scriptId: this.script.scriptId,
    }
  }

  public getOutputType(): OutputType {
    return this.script.getOutputType()
  }

  public update(args: { kind: string; url: string; contentType: string }) {
    const { kind = this.kind, url = this.url, contentType = this.contentType } = args
    this.kind = kind
    this.url = url
    this.contentType = contentType
  }
}
