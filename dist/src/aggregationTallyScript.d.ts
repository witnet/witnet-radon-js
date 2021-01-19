import { AggregationTallyFilter, MarkupAggregationTallyScript, MirAggregationTallyScript, Context } from './types';
import { AggregationTallyOperatorReducer } from './aggregationTallyOperatorReducer';
import { AggregationTallyOperatorFilter } from './aggregationTallyOperatorFilter';
export declare class AggregationTallyScript {
    context: Context;
    filters: Array<AggregationTallyOperatorFilter>;
    mirScript: MirAggregationTallyScript;
    reducer: AggregationTallyOperatorReducer;
    scriptId: number;
    constructor(context: Context, script: MirAggregationTallyScript);
    addOperator(): void;
    deleteOperator(operatorId: number): void;
    getJs(stage: 'aggregator' | 'tally'): string;
    getMir(): MirAggregationTallyScript;
    getMarkup(): MarkupAggregationTallyScript;
    findIdx(filterId: number): number;
    push(filter: AggregationTallyFilter): void;
}
//# sourceMappingURL=aggregationTallyScript.d.ts.map