import { Event, MarkupScript, MirOperator, MirScript, OutputType, Context } from './types';
import { Operator } from './operator';
export declare class Script {
    context: Context;
    operators: Array<Operator>;
    firstType: OutputType;
    scriptId: number;
    constructor(context: Context, script: MirScript, firstType?: OutputType);
    addOperator(): void;
    deleteOperator(operatorId: number): void;
    findIdx(operatorId: number): number;
    getJs(): string;
    getLastOperator(): Operator | null;
    getMarkup(): MarkupScript;
    getMir(): MirScript;
    getOutputType(): OutputType;
    onChildrenEvent(): {
        emit: (e: Event) => void;
    };
    push(operator: MirOperator): void;
    validateScript(index?: number): void;
}
//# sourceMappingURL=script.d.ts.map