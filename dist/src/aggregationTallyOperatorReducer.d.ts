import { AggregationTallyReducer, MarkupSelect } from './types';
import { Cache } from './structures';
export declare class AggregationTallyOperatorReducer {
    cache: Cache;
    code: AggregationTallyReducer;
    id: number;
    scriptId: number;
    label: string;
    constructor(cache: Cache, operator: AggregationTallyReducer | undefined, scriptId: number);
    getJs(): string;
    getMarkup(): MarkupSelect;
    getMir(): AggregationTallyReducer;
    update(value: AggregationTallyReducer | number): void;
}
//# sourceMappingURL=aggregationTallyOperatorReducer.d.ts.map