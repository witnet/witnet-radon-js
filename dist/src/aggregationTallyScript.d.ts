import { AggregationTallyFilter, MarkupAggregationTallyScript, MirAggregationTallyScript } from './types';
import { Cache } from './structures';
import { AggregationTallyOperatorReducer } from './aggregationTallyOperatorReducer';
import { AggregationTallyOperatorFilter } from './aggregationTallyOperatorFilter';
export declare class AggregationTallyScript {
    cache: Cache;
    filters: Array<AggregationTallyOperatorFilter>;
    mirScript: MirAggregationTallyScript;
    reducer: AggregationTallyOperatorReducer;
    scriptId: number;
    constructor(cache: Cache, script: MirAggregationTallyScript);
    addOperator(): void;
    deleteOperator(operatorId: number): void;
    getJs(stage: 'aggregator' | 'tally'): string;
    getMir(): MirAggregationTallyScript;
    getMarkup(): MarkupAggregationTallyScript;
    findIdx(filterId: number): number;
    push(filter: AggregationTallyFilter): void;
}
//# sourceMappingURL=aggregationTallyScript.d.ts.map