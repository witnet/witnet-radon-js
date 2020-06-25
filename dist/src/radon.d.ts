import { MirRequest, MarkupRequest } from './types';
import { Cache } from './structures';
import { Source } from './source';
import { AggregationTallyScript } from './aggregationTallyScript';
export declare class Radon {
    cache: Cache;
    timelock: number;
    retrieve: Array<Source>;
    aggregate: AggregationTallyScript;
    tally: AggregationTallyScript;
    constructor(radRequest: MirRequest);
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