import { MarkupSource, MirSource, OutputType, Context } from './types';
import { Cache } from './structures';
import { Script } from './script';
import { I18n } from './i18n';
export declare class Source {
    kind: string;
    url: string;
    contentType: string;
    script: Script;
    id: number;
    context: Context;
    constructor(context: {
        cache: Cache;
        i18n: I18n;
    }, source: MirSource);
    getJs(index: number): string;
    getMir(): MirSource;
    getMarkup(): MarkupSource;
    getOutputType(): OutputType;
    update(args: {
        kind: string;
        url: string;
        contentType: string;
    }): void;
}
//# sourceMappingURL=source.d.ts.map