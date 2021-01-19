import { MirRequest, MarkupRequest, Context } from './types';
import { Source } from './source';
import { AggregationTallyScript } from './aggregationTallyScript';
import { Locale } from './i18n';
export declare class Radon {
    timelock: number;
    retrieve: Array<Source>;
    aggregate: AggregationTallyScript;
    tally: AggregationTallyScript;
    context: Context;
    constructor(radRequest: MirRequest, locale?: Locale);
    setLocale(locale: Locale): void;
    addOperator(scriptId: number): void;
    addSource(): void;
    deleteOperator(scriptId: number, operatorId: number): void;
    deleteSource(sourceIndex: number): void;
    getJs(): string;
    getMarkup(): MarkupRequest;
    getMir(): MirRequest;
    update(id: number, value: any): void;
    updateSource(sourceIndex: number, args: any): void;
}
//# sourceMappingURL=radon.d.ts.map