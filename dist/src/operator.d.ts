import { EventEmitter, MarkupOperator, MirArgument, MirOperator, OperatorCode, OperatorInfo, OutputType } from './types';
import { Argument } from './argument';
import { Context } from './types';
export declare class Operator {
    arguments: Array<Argument>;
    context: Context;
    code: OperatorCode;
    default: Boolean;
    eventEmitter: EventEmitter;
    id: number;
    inputType: OutputType;
    mirArguments: MirArgument[];
    operatorInfo: OperatorInfo;
    scriptId: number;
    constructor(context: Context, scriptId: number, inputType: OutputType | null, operator: MirOperator | null, eventEmitter: EventEmitter);
    getJs(): string;
    getMarkup(): MarkupOperator;
    getMir(): MirOperator;
    update(value: keyof typeof OperatorCode | OperatorCode): void;
}
//# sourceMappingURL=operator.d.ts.map