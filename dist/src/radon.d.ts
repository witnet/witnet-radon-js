import { MirRequest, MirSource, ArgumentInfo, MarkupArgumentType, MarkupOption, MirOperator, OperatorCode, MirArgument, MirScript, MirAggregationTallyScript, OutputType, MarkupArgument, MarkupInput, MarkupSelect, Filter, OperatorInfo, MarkupRequest, MarkupSource, MarkupScript, MarkupOperator, OperatorName, MirAggregationTallyFilterOperator, AggregationTallyFilter, AggregationTallyReducer, MarkupAggregationTallyScript } from './types';
import { Cache } from './structures';
export declare const DEFAULT_OPERATOR = OperatorCode.ArrayCount;
export declare const DEFAULT_INPUT_TYPE = OutputType.Array;
export declare const DEFAULT_SCRIPT_FIRST_TYPE = OutputType.String;
declare type EventEmitter = {
    emit: Function;
};
declare enum EventName {
    Update = 0
}
declare type Event = {
    name: EventName;
    data: any;
};
export declare class Radon {
    cache: Cache;
    timelock: number;
    retrieve: Array<Source>;
    aggregate: AggregationTallyScript;
    tally: AggregationTallyScript;
    constructor(radRequest: MirRequest);
    getMir(): MirRequest;
    getMarkup(): MarkupRequest;
    updateSource(sourceIndex: number, args: any): void;
    deleteSource(sourceIndex: number): void;
    update(id: number, value: any): void;
    addOperator(scriptId: number): void;
    deleteOperator(scriptId: number, operatorId: number): void;
    addSource(): void;
}
export declare class Source {
    cache: Cache;
    kind: string;
    url: string;
    script: Script;
    id: number;
    constructor(cache: Cache, source: MirSource);
    update(args: {
        kind: string;
        url: string;
    }): void;
    getMir(): MirSource;
    getMarkup(): MarkupSource;
    getOutputType(): OutputType;
}
export declare class AggregationTallyScript {
    cache: Cache;
    filters: Array<AggregationTallyOperatorFilter>;
    mirScript: MirAggregationTallyScript;
    reducer: AggregationTallyOperatorReducer;
    scriptId: number;
    constructor(cache: Cache, script: MirAggregationTallyScript);
    addOperator(): void;
    getMir(): MirAggregationTallyScript;
    getMarkup(): MarkupAggregationTallyScript;
    push(filter: AggregationTallyFilter): void;
}
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
export declare class AggregationTallyOperatorReducer {
    cache: Cache;
    code: AggregationTallyReducer;
    id: number;
    scriptId: number;
    constructor(cache: Cache, operator: AggregationTallyReducer | undefined, scriptId: number);
    getMarkup(): MarkupSelect;
    getMir(): AggregationTallyReducer;
    update(value: AggregationTallyReducer | number): void;
}
export declare class AggregationTallyFilterArgument {
    cache: Cache;
    id: number;
    value: string | number | boolean;
    constructor(cache: Cache, argument: string | number | boolean);
    getMarkup(): MarkupInput;
    getMir(): MirArgument;
    update(value: string | number | boolean | Filter): void;
}
export declare class Script {
    cache: Cache;
    operators: Array<Operator>;
    firstType: OutputType;
    scriptId: number;
    constructor(cache: Cache, script: MirScript, firstType?: OutputType);
    addOperator(): void;
    findIdx(operatorId: number): number;
    deleteOperator(operatorId: number): void;
    getMir(): MirScript;
    onChildrenEvent(): {
        emit: (e: Event) => void;
    };
    getLastOperator(): Operator | null;
    getMarkup(): MarkupScript;
    getOutputType(): OutputType;
    push(operator: MirOperator): void;
    validateScript(index?: number): void;
}
export declare class Operator {
    arguments: Array<Argument>;
    cache: Cache;
    code: OperatorCode;
    default: Boolean;
    eventEmitter: EventEmitter;
    id: number;
    inputType: OutputType;
    mirArguments: MirArgument[] | [];
    operatorInfo: OperatorInfo;
    scriptId: number;
    constructor(cache: Cache, scriptId: number, inputType: OutputType | null, operator: MirOperator | null, eventEmitter: EventEmitter);
    getMarkup(): MarkupOperator;
    getMir(): MirOperator;
    update(value: OperatorName | OperatorCode): void;
}
export declare class Argument {
    argument: Argument | Script | null;
    argumentInfo: ArgumentInfo;
    argumentType: MarkupArgumentType;
    cache: Cache;
    id: number;
    value: MirArgument | undefined;
    subscript: boolean;
    constructor(cache: Cache, argumentInfo: ArgumentInfo, argument?: MirArgument, subscript?: boolean);
    getMarkup(): MarkupArgument;
    getMir(): MirArgument;
    update(value: string | number | boolean | Filter): void;
}
export declare function generateFilterArgumentOptions(): Array<MarkupOption>;
export declare function generateReducerArgumentOptions(): Array<MarkupOption>;
export {};
//# sourceMappingURL=radon.d.ts.map