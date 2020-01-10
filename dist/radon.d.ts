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
    addOperator(): void;
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
    argument: Argument | null;
    argumentInfo: ArgumentInfo;
    argumentType: MarkupArgumentType;
    cache: Cache;
    id: number;
    value: MirArgument | undefined;
    constructor(cache: Cache, argumentInfo: ArgumentInfo, argument?: MirArgument);
    getMarkup(): MarkupArgument;
    getMir(): MirArgument;
    update(value: string | number | boolean | Filter): void;
}
export declare function generateFilterArgumentOptions(): Array<MarkupOption>;
export declare function generateReducerArgumentOptions(): Array<MarkupOption>;
export {};
//# sourceMappingURL=radon.d.ts.map