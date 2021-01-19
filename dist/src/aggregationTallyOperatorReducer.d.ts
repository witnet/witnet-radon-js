import { AggregationTallyReducer, MarkupSelect, Context } from './types';
export declare class AggregationTallyOperatorReducer {
    context: Context;
    code: AggregationTallyReducer;
    id: number;
    scriptId: number;
    label: string;
    constructor(context: Context, operator: AggregationTallyReducer | undefined, scriptId: number);
    getJs(): string;
    getMarkup(): MarkupSelect;
    getMir(): AggregationTallyReducer;
    update(value: AggregationTallyReducer | number): void;
}
//# sourceMappingURL=aggregationTallyOperatorReducer.d.ts.map