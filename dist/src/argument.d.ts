import { ArgumentInfo, Filter, MarkupArgument, MarkupArgumentType, MarkupOption, MirArgument, Context } from './types';
import { Script } from './script';
export declare class Argument {
    argument: Argument | Script | null;
    argumentInfo: ArgumentInfo;
    argumentType: MarkupArgumentType;
    context: Context;
    id: number;
    value: MirArgument | undefined;
    constructor(context: Context, argumentInfo: ArgumentInfo, argument?: MirArgument);
    getJs(): string | number | boolean;
    getMarkup(): MarkupArgument;
    getMir(): MirArgument;
    update(value: string | number | boolean | Filter | Object): void;
}
export declare function generateFilterArgumentOptions(): Array<MarkupOption>;
export declare function generateBooleanArgumentOptions(): Array<MarkupOption>;
export declare function generateReducerArgumentOptions(): Array<MarkupOption>;
//# sourceMappingURL=argument.d.ts.map