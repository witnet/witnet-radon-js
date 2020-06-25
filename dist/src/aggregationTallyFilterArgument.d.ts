import { Filter, MarkupInput, MirArgument } from './types';
import { Cache } from './structures';
export declare class AggregationTallyFilterArgument {
    cache: Cache;
    id: number;
    value: string | number | boolean;
    constructor(cache: Cache, argument: string | number | boolean);
    getMarkup(): MarkupInput;
    getJs(): string | number | boolean;
    getMir(): MirArgument;
    update(value: string | number | boolean | Filter): void;
}
//# sourceMappingURL=aggregationTallyFilterArgument.d.ts.map