import { EventEmitter, MarkupOperator, MirArgument, MirOperator, OperatorCode, OperatorInfo, OperatorName, OutputType } from './types';
import { Cache } from './structures';
import { Argument } from './argument';
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
//# sourceMappingURL=operator.d.ts.map