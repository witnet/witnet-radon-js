import { MarkupSource, MirSource, OutputType } from './types';
import { Cache } from './structures';
import { Script } from './script';
export declare class Source {
    cache: Cache;
    kind: string;
    url: string;
    contentType: string;
    script: Script;
    id: number;
    constructor(cache: Cache, source: MirSource);
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