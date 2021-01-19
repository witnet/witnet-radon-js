import { AggregationTallyFilter, MarkupSelect, MirAggregationTallyFilterOperator, Context } from './types';
import { AggregationTallyFilterArgument } from './aggregationTallyFilterArgument';
export declare class AggregationTallyOperatorFilter {
    context: Context;
    code: AggregationTallyFilter;
    id: number;
    default: boolean;
    argument: AggregationTallyFilterArgument | null;
    scriptId: number;
    operator: MirAggregationTallyFilterOperator;
    label: string;
    constructor(context: Context, operator: MirAggregationTallyFilterOperator, scriptId: number);
    getJs(): string;
    getMarkup(): MarkupSelect;
    getMir(): MirAggregationTallyFilterOperator;
    update(value: AggregationTallyFilter | number): void;
}
//# sourceMappingURL=aggregationTallyOperatorFilter.d.ts.map