import { AggregationTallyFilter, MarkupSelect, MirAggregationTallyFilterOperator } from './types';
import { Cache } from './structures';
import { AggregationTallyFilterArgument } from './aggregationTallyFilterArgument';
export declare class AggregationTallyOperatorFilter {
    cache: Cache;
    code: AggregationTallyFilter;
    id: number;
    default: boolean;
    argument: AggregationTallyFilterArgument | null;
    scriptId: number;
    constructor(cache: Cache, operator: MirAggregationTallyFilterOperator, scriptId: number);
    getMarkup(): MarkupSelect;
    getMir(): MirAggregationTallyFilterOperator;
    update(value: AggregationTallyFilter | number): void;
}
//# sourceMappingURL=aggregationTallyOperatorFilter.d.ts.map