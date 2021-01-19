import { Filter, MarkupInput, MirArgument, Context } from './types';
export declare class AggregationTallyFilterArgument {
    context: Context;
    id: number;
    value: string | number | boolean;
    constructor(context: Context, argument: string | number | boolean);
    getMarkup(): MarkupInput;
    getJs(): string | number | boolean;
    getMir(): MirArgument;
    update(value: string | number | boolean | Filter): void;
}
//# sourceMappingURL=aggregationTallyFilterArgument.d.ts.map