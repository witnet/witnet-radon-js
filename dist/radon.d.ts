import { MirRequest, MirSource, ArgumentInfo, MarkupArgumentType, MarkupOption, MirOperator, OperatorCode, MirArgument, MirScript, OutputType, MarkupArgument, Filter, OperatorInfo, MarkupRequest, MarkupSource, MarkupScript, MarkupOperator, OperatorName } from './types';
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
    aggregate: Script;
    tally: Script;
    constructor(radRequest: MirRequest);
    getMir(): MirRequest;
    getMarkup(): MarkupRequest;
    updateSource(sourceIndex: number, args: any): void;
    deleteSource(sourceIndex: number): void;
    update(id: number, value: any): void;
    addOperator(scriptId: number): void;
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
export declare class Script {
    cache: Cache;
    operators: Array<Operator>;
    firstType: OutputType;
    scriptId: number;
    constructor(cache: Cache, script: MirScript, firstType?: OutputType);
    getMir(): MirScript;
    validateScript(index?: number): void;
    onChildrenEvent(): {
        emit: (e: Event) => void;
    };
    getMarkup(): MarkupScript;
    getOutputType(): OutputType;
    getLastOperator(): Operator | null;
    push(operator: MirOperator): void;
    addOperator(): void;
}
export declare class Operator {
    cache: Cache;
    operatorInfo: OperatorInfo;
    code: OperatorCode;
    mirArguments: MirArgument[] | [];
    arguments: Array<Argument>;
    default: Boolean;
    scriptId: number;
    inputType: OutputType;
    id: number;
    eventEmitter: EventEmitter;
    constructor(cache: Cache, scriptId: number, inputType: OutputType | null, operator: MirOperator | null, eventEmitter: EventEmitter);
    update(args: {
        label?: OperatorName;
        code?: OperatorCode;
    }): void;
    getMir(): MirOperator;
    getMarkup(): MarkupOperator;
}
export declare class Argument {
    cache: Cache;
    argumentInfo: ArgumentInfo;
    value: MirArgument | undefined;
    argument: Argument | null;
    id: number;
    argumentType: MarkupArgumentType;
    constructor(cache: Cache, argumentInfo: ArgumentInfo, argument?: MirArgument);
    getMir(): MirArgument;
    update(args: {
        value: string | number | boolean | Filter;
    }): void;
    getMarkup(): MarkupArgument;
}
export declare function generateFilterArgumentOptions(): Array<MarkupOption>;
export declare function generateReducerArgumentOptions(): Array<MarkupOption>;
export {};
//# sourceMappingURL=radon.d.ts.map