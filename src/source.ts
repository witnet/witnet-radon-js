import { MarkupSource, MirSource, OutputType } from './types'
import { Cache } from './structures'
import { Script } from './script'

export class Source {
  public cache: Cache
  public kind: string
  public url: string
  public contentType: string
  public script: Script
  public id: number

  constructor(cache: Cache, source: MirSource) {
    this.id = cache.insert(this).id
    this.cache = cache
    this.kind = source.kind
    this.url = source.url
    this.contentType = source.contentType
    this.script = new Script(cache, source.script, OutputType.String)
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
